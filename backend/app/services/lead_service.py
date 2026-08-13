"""
Service layer — orchestrates repositories, generates Lead IDs, and
dispatches email notifications in a background thread so that the HTTP
response is returned to the user immediately after Oracle DB save,
without blocking on SMTP delivery.
"""
import logging
import threading

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import ConflictError
from app.db.session import get_session_factory
from app.models.lead import CustomerLead, DemoRequest, LeadSource
from app.repositories.lead_repository import DemoRequestRepository, LeadRepository
from app.schemas.lead import DemoRequestCreate, LeadCreate
from app.services.email_service import EmailService
from app.services.pdf_service import PDFService
from app.services.whatsapp_service import WhatsAppService
from app.utils.lead_id import generate_lead_id

logger = logging.getLogger(__name__)
MAX_LEAD_ID_ATTEMPTS = 5


def _send_notifications_background(
    lead_db_id: int,
    pdf_bytes: bytes,
) -> None:
    """
    Runs in a dedicated background thread with its own fresh DB session
    to prevent DetachedInstanceError when the HTTP request session closes.
    """
    SessionLocal = get_session_factory()
    db = SessionLocal()
    try:
        lead = db.query(CustomerLead).filter(CustomerLead.id == lead_db_id).first()
        if not lead:
            logger.error(f"BG_NOTIFICATION_FAILED lead_id_db={lead_db_id} not found in DB")
            return

        demo = lead.demo_request
        lead_id_str = lead.lead_id

        # 1. Send Email Notification via SMTP
        email_svc = EmailService()
        email_result = email_svc.send_notification(lead=lead, demo=demo, pdf_bytes=pdf_bytes)
        logger.info(
            f"BG_EMAIL lead_id={lead_id_str} "
            f"status={email_result.get('email_status')} "
            f"sent={email_result.get('email_sent')}"
        )

        # 2. Programmatic WhatsApp Delivery
        wa_svc = WhatsAppService(db)
        wa_result = wa_svc.send_lead_whatsapp_notification(lead=lead, demo=demo, pdf_bytes=pdf_bytes)
        logger.info(
            f"BG_WHATSAPP lead_id={lead_id_str} "
            f"status={wa_result.get('whatsapp_status')}"
        )
    except Exception as exc:  # noqa: BLE001
        logger.error(f"BG_NOTIFICATION_EXCEPTION lead_id_db={lead_db_id} error={exc}")
    finally:
        db.close()


class LeadService:
    def __init__(self, db: Session):
        self.db = db
        self.leads = LeadRepository(db)
        self.demo_requests = DemoRequestRepository(db)

    def _generate_unique_lead_id(self) -> str:
        for _ in range(MAX_LEAD_ID_ATTEMPTS):
            candidate = generate_lead_id()
            if not self.leads.exists_lead_id(candidate):
                return candidate
        raise ConflictError("Could not generate a unique lead ID. Please try again.")

    def create_contact_lead(self, payload: LeadCreate) -> CustomerLead:
        """
        Saves lead to Oracle DB and immediately returns.
        Email + PDF are dispatched in a background thread (non-blocking).
        """
        logger.info(f"CONTACT_SUBMISSION_RECEIVED email={payload.email} phone={payload.phone}")
        lead_id = self._generate_unique_lead_id()
        try:
            lead = self.leads.create(
                lead_id=lead_id,
                full_name=payload.full_name,
                email=payload.email,
                phone=payload.phone,
                message=payload.message,
                source=payload.source,
                preferred_language=payload.preferred_language,
            )
            self.db.commit()
            self.db.refresh(lead)
            logger.info(f"DB_SAVE_SUCCESS lead_id={lead.lead_id} id={lead.id}")
        except IntegrityError as err:
            self.db.rollback()
            logger.error(f"DB_SAVE_FAILED lead_id={lead_id} error={err}")
            raise ConflictError("A lead with this information could not be saved. Please try again.")

        # Generate PDF synchronously (fast — ~10ms)
        pdf_bytes = PDFService.generate_contact_pdf(lead)

        # Dispatch email + WhatsApp in a background thread with fresh session
        t = threading.Thread(
            target=_send_notifications_background,
            args=(lead.id, pdf_bytes),
            daemon=True,
        )
        t.start()
        logger.info(f"BG_NOTIFICATION_THREAD_STARTED lead_id={lead.lead_id}")

        return lead

    def create_demo_request(self, payload: DemoRequestCreate) -> tuple[CustomerLead, DemoRequest]:
        """
        Saves lead + demo request to Oracle DB and immediately returns.
        Email + PDF are dispatched in a background thread (non-blocking).
        """
        logger.info(f"DEMO_SUBMISSION_RECEIVED email={payload.email} company={payload.company_name}")
        lead_id = self._generate_unique_lead_id()
        try:
            lead = self.leads.create(
                lead_id=lead_id,
                full_name=payload.full_name,
                email=payload.email,
                phone=payload.phone,
                message=None,
                source=LeadSource.DEMO_REQUEST,
                preferred_language=payload.preferred_language,
            )
            demo_request = self.demo_requests.create(
                lead=lead,
                company_name=payload.company_name,
                gst_number=payload.gst_number,
                business_type=payload.business_type,
                industry=payload.industry,
                city=payload.city,
                state=payload.state,
                business_requirement=payload.business_requirement,
                preferred_demo_date=payload.preferred_demo_date,
                preferred_demo_time=payload.preferred_demo_time,
                demo_mode=payload.demo_mode,
            )
            self.db.commit()
            self.db.refresh(lead)
            self.db.refresh(demo_request)
            logger.info(f"DB_SAVE_SUCCESS lead_id={lead.lead_id} demo_id={demo_request.id}")
        except IntegrityError as err:
            self.db.rollback()
            logger.error(f"DB_SAVE_FAILED lead_id={lead_id} error={err}")
            raise ConflictError("This demo request could not be saved. Please try again.")

        # Generate PDF synchronously (fast — ~10ms)
        pdf_bytes = PDFService.generate_demo_request_pdf(lead, demo_request)

        # Dispatch email + WhatsApp in a background thread with fresh session
        t = threading.Thread(
            target=_send_notifications_background,
            args=(lead.id, pdf_bytes),
            daemon=True,
        )
        t.start()
        logger.info(f"BG_NOTIFICATION_THREAD_STARTED lead_id={lead.lead_id}")

        return lead, demo_request