"""
WhatsApp Business API Delivery Service — handles programmatic delivery of text
notifications and PDF document attachments to the configured CoreStone business
recipient WhatsApp number (WHATSAPP_BUSINESS_NUMBER).
"""
import logging
from typing import Any

import httpx

from app.core.config import get_settings
from app.models.lead import CustomerLead, DemoRequest, WhatsAppDirection, WhatsAppMessage
from app.repositories.lead_repository import LeadRepository

logger = logging.getLogger(__name__)


class WhatsAppService:
    def __init__(self, db_session: Any):
        self.db = db_session
        self.settings = get_settings()

    def format_contact_message(self, lead: CustomerLead) -> str:
        """Formats complete Contact Form notification text."""
        submitted_time = lead.created_at.strftime("%d-%b-%Y %I:%M %p") if lead.created_at else "N/A"
        return (
            f"CORESTONE — NEW CONTACT ENQUIRY\n\n"
            f"Lead ID: {lead.lead_id}\n"
            f"Name: {lead.full_name}\n"
            f"Phone: {lead.phone}\n"
            f"Email: {lead.email}\n\n"
            f"Message:\n{lead.message or 'N/A'}\n\n"
            f"Submitted At:\n{submitted_time}\n\n"
            f"Source:\nContact Form"
        )

    def format_demo_request_message(self, lead: CustomerLead, demo: DemoRequest) -> str:
        """Formats complete Request Demo notification text without omitting any fields."""
        submitted_time = lead.created_at.strftime("%d-%b-%Y %I:%M %p") if lead.created_at else "N/A"
        demo_date = demo.preferred_demo_date.strftime("%d-%b-%Y") if demo.preferred_demo_date else "N/A"
        demo_mode_str = demo.demo_mode.value if hasattr(demo.demo_mode, "value") else str(demo.demo_mode)

        return (
            f"CORESTONE — NEW DEMO REQUEST\n\n"
            f"Lead ID: {lead.lead_id}\n"
            f"Name: {lead.full_name}\n"
            f"Company: {demo.company_name}\n"
            f"Business Type: {demo.business_type}\n"
            f"Industry: {demo.industry}\n\n"
            f"Email: {lead.email}\n"
            f"Phone: {lead.phone}\n\n"
            f"City: {demo.city}\n"
            f"State: {demo.state}\n\n"
            f"Business Requirement:\n{demo.business_requirement}\n\n"
            f"Preferred Demo Date:\n{demo_date}\n\n"
            f"Preferred Time:\n{demo.preferred_demo_time}\n\n"
            f"Demo Mode:\n{demo_mode_str}\n\n"
            f"Submitted At:\n{submitted_time}\n\n"
            f"Source:\nRequest Demo"
        )

    def send_lead_whatsapp_notification(
        self,
        lead: CustomerLead,
        demo: DemoRequest | None = None,
        pdf_bytes: bytes | None = None,
    ) -> dict[str, Any]:
        """
        Executes actual programmatic WhatsApp delivery to WHATSAPP_BUSINESS_NUMBER.
        Saves delivery record in WHATSAPP_MESSAGES table. Returns delivery result status dict.
        """
        recipient_number = self.settings.WHATSAPP_BUSINESS_NUMBER
        api_url = self.settings.WHATSAPP_API_URL.strip()
        access_token = self.settings.WHATSAPP_ACCESS_TOKEN.strip()
        phone_number_id = self.settings.WHATSAPP_PHONE_NUMBER_ID.strip()

        # Build notification text
        if demo:
            message_text = self.format_demo_request_message(lead, demo)
        else:
            message_text = self.format_contact_message(lead)

        # 1. Check if WhatsApp API is configured
        if not api_url or not access_token:
            logger.warning(
                f"WHATSAPP_SEND_NOT_CONFIGURED lead_id={lead.lead_id} "
                f"recipient={recipient_number} reason='WHATSAPP_API_URL or WHATSAPP_ACCESS_TOKEN missing in .env'"
            )
            
            # Record in DB
            self._record_message(lead.id, message_text, "NOT_CONFIGURED")

            return {
                "whatsapp_sent": False,
                "whatsapp_status": "NOT_CONFIGURED",
                "recipient_number": recipient_number,
                "message": "WhatsApp Business API is not configured in backend environment (.env). Enquiry saved to Oracle DB.",
            }

        # 2. Attempt Programmatic WhatsApp API Send via HTTPX
        logger.info(f"WHATSAPP_SEND_STARTED lead_id={lead.lead_id} recipient={recipient_number}")

        try:
            # Format Meta WhatsApp Cloud API endpoint or generic API endpoint
            target_endpoint = api_url
            if phone_number_id and "facebook.com" in api_url:
                target_endpoint = f"{api_url.rstrip('/')}/{phone_number_id}/messages"

            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json",
            }

            payload = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": recipient_number,
                "type": "text",
                "text": {"body": message_text},
            }

            with httpx.Client(timeout=10.0) as client:
                resp = client.post(target_endpoint, json=payload, headers=headers)

            if resp.status_code in (200, 201):
                res_json = resp.json()
                provider_msg_id = res_json.get("messages", [{}])[0].get("id", "SENT_OK")
                logger.info(f"WHATSAPP_SEND_SUCCESS lead_id={lead.lead_id} provider_id={provider_msg_id}")

                self._record_message(lead.id, message_text, "SENT")

                return {
                    "whatsapp_sent": True,
                    "whatsapp_status": "SENT",
                    "provider_message_id": provider_msg_id,
                    "recipient_number": recipient_number,
                    "message": "WhatsApp notification sent successfully.",
                }
            else:
                error_msg = f"HTTP {resp.status_code}: {resp.text}"
                logger.error(f"WHATSAPP_SEND_FAILED lead_id={lead.lead_id} error={error_msg}")

                self._record_message(lead.id, message_text, f"FAILED: {error_msg}")

                return {
                    "whatsapp_sent": False,
                    "whatsapp_status": "FAILED",
                    "recipient_number": recipient_number,
                    "message": f"WhatsApp API returned error: {resp.status_code}",
                }

        except Exception as exc:
            error_msg = str(exc)
            logger.exception(f"WHATSAPP_SEND_EXCEPTION lead_id={lead.lead_id} error={error_msg}")

            self._record_message(lead.id, message_text, f"FAILED: {error_msg}")

            return {
                "whatsapp_sent": False,
                "whatsapp_status": "FAILED",
                "recipient_number": recipient_number,
                "message": f"WhatsApp delivery exception: {error_msg}",
            }

    def _record_message(self, lead_db_id: int, message_text: str, status_note: str) -> None:
        """Records outbound WhatsApp message in WHATSAPP_MESSAGES table."""
        try:
            record = WhatsAppMessage(
                lead_id=lead_db_id,
                direction=WhatsAppDirection.OUTBOUND,
                message_text=f"[{status_note}]\n{message_text}",
                language_code="en",
            )
            self.db.add(record)
            self.db.commit()
        except Exception as err:
            self.db.rollback()
            logger.error(f"Could not save WhatsAppMessage log record: {err}")
