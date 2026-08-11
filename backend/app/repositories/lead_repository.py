"""
Repository layer — the only place in the codebase that touches
SQLAlchemy Session/query objects for leads. Services call these methods;
they never build queries themselves. This keeps Oracle-specific query
shaping (and any future Oracle-only SQL tuning) isolated to one file.
"""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.lead import CustomerLead, DemoRequest, LeadSource


class LeadRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_lead_id(self, lead_id: str) -> CustomerLead | None:
        stmt = select(CustomerLead).where(CustomerLead.lead_id == lead_id)
        return self.db.execute(stmt).scalar_one_or_none()

    def exists_lead_id(self, lead_id: str) -> bool:
        return self.get_by_lead_id(lead_id) is not None

    def create(
        self,
        *,
        lead_id: str,
        full_name: str,
        email: str,
        phone: str,
        message: str | None,
        source: LeadSource,
        preferred_language: str = "en",
    ) -> CustomerLead:
        lead = CustomerLead(
            lead_id=lead_id,
            full_name=full_name,
            email=email,
            phone=phone,
            message=message,
            source=source,
            preferred_language=preferred_language,
        )
        self.db.add(lead)
        self.db.flush()  # populate lead.id without committing yet
        return lead


class DemoRequestRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, *, lead: CustomerLead, **demo_fields) -> DemoRequest:
        demo_request = DemoRequest(lead_id=lead.id, **demo_fields)
        self.db.add(demo_request)
        self.db.flush()
        return demo_request

    def get_by_lead_id(self, lead_id: int) -> DemoRequest | None:
        stmt = select(DemoRequest).where(DemoRequest.lead_id == lead_id)
        return self.db.execute(stmt).scalar_one_or_none()
