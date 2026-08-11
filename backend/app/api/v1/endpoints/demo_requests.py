"""Demo request endpoints — matches the Request Demo page's exact payload."""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.lead import DemoRequestCreate, DemoRequestCreateResponse
from app.services.lead_service import LeadService

router = APIRouter(prefix="/demo-requests", tags=["Demo Requests"])


@router.post(
    "",
    response_model=DemoRequestCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a demo request",
)
def create_demo_request(payload: DemoRequestCreate, db: Session = Depends(get_db)) -> DemoRequestCreateResponse:
    """
    Saves demo request to Oracle DB and returns immediately.
    Email + PDF are sent asynchronously in a background thread.
    """
    service = LeadService(db)
    lead, _demo_request = service.create_demo_request(payload)
    return DemoRequestCreateResponse(
        success=True,
        database_saved=True,
        whatsapp_sent=False,
        whatsapp_status="PENDING",
        lead_id=lead.lead_id,
        message="Demo request received. Our team will confirm your slot within 24 hours.",
    )
