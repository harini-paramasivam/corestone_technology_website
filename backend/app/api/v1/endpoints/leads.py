"""Leads endpoints — general contact-form submissions (CUSTOMER_LEADS)."""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.lead import DemoRequestCreateResponse, LeadCreate
from app.services.lead_service import LeadService

router = APIRouter(prefix="/leads", tags=["Leads"])


@router.post(
    "",
    response_model=DemoRequestCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact-form enquiry",
)
def create_lead(payload: LeadCreate, db: Session = Depends(get_db)) -> DemoRequestCreateResponse:
    """
    Saves contact enquiry to Oracle DB and returns immediately.
    Email + PDF are sent asynchronously in a background thread.
    """
    service = LeadService(db)
    lead = service.create_contact_lead(payload)
    return DemoRequestCreateResponse(
        success=True,
        database_saved=True,
        whatsapp_sent=False,
        whatsapp_status="PENDING",
        lead_id=lead.lead_id,
        message="Enquiry received. You will be contacted within 24 hours.",
    )
