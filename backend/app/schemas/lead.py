"""
Request/response schemas for leads and demo requests. Field names are
snake_case to match exactly what the frontend's toApiPayload() sends
(see frontend/src/lib/validation/demoRequestSchema.js) — no translation
layer needed between the two.
"""
from datetime import date, datetime, timezone

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.models.lead import DemoMode, LeadSource, LeadStatus


class LeadCreate(BaseModel):
    """Matches the Contact page's submitContactForm() payload."""

    full_name: str = Field(min_length=2, max_length=160)
    email: EmailStr
    phone: str = Field(min_length=10, max_length=20)
    message: str | None = Field(default=None, max_length=1500)
    source: LeadSource = LeadSource.CONTACT_FORM
    preferred_language: str = Field(default="en", pattern="^(en|ta)$")

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        digits = v.replace(" ", "").replace("-", "")
        normalized = digits[-10:] if len(digits) >= 10 else digits
        if len(normalized) != 10 or normalized[0] not in "6789":
            raise ValueError("Enter a valid 10-digit Indian mobile number.")
        return digits


class LeadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    lead_id: str
    full_name: str
    email: EmailStr
    phone: str
    status: LeadStatus
    created_at: datetime


class DemoRequestCreate(BaseModel):
    """Matches the Request Demo page's toApiPayload() output exactly."""

    full_name: str = Field(min_length=2, max_length=160)
    company_name: str = Field(min_length=2, max_length=200)
    gst_number: str | None = Field(default=None, max_length=15)
    business_type: str = Field(min_length=1, max_length=60)
    industry: str = Field(min_length=1, max_length=80)
    email: EmailStr
    phone: str = Field(min_length=10, max_length=20)
    city: str = Field(min_length=2, max_length=100)
    state: str = Field(min_length=1, max_length=100)
    business_requirement: str = Field(min_length=20, max_length=2000)
    preferred_demo_date: date
    preferred_demo_time: str = Field(min_length=1, max_length=10)
    demo_mode: DemoMode
    preferred_language: str = Field(default="en", pattern="^(en|ta)$")

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        digits = v.replace(" ", "").replace("-", "")
        normalized = digits[-10:] if len(digits) >= 10 else digits
        if len(normalized) != 10 or normalized[0] not in "6789":
            raise ValueError("Enter a valid 10-digit Indian mobile number.")
        return digits

    @field_validator("preferred_demo_date")
    @classmethod
    def validate_not_past(cls, v: date) -> date:
        if v < datetime.now(timezone.utc).date():
            raise ValueError("Preferred demo date cannot be in the past.")
        return v


class DemoRequestRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    lead_id: str
    company_name: str
    industry: str
    preferred_demo_date: date
    preferred_demo_time: str
    demo_mode: DemoMode
    status: LeadStatus
    created_at: datetime


class DemoRequestCreateResponse(BaseModel):
    """What the frontend actually consumes after a submit."""

    success: bool = True
    database_saved: bool = True
    whatsapp_sent: bool = False
    whatsapp_status: str = "NOT_CONFIGURED"  # "SENT" | "FAILED" | "NOT_CONFIGURED"
    lead_id: str
    message: str = "Request received."
