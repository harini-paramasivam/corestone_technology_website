"""
Lead management models — CUSTOMER_LEADS is the parent record for every
enquiry (contact form or demo request); DEMO_REQUESTS, LEAD_FOLLOWUPS and
WHATSAPP_MESSAGES each hang off a lead via lead_id (FK to the surrogate PK,
not the human-readable LEAD_ID string).
"""
import enum

from sqlalchemy import Date, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from app.models.mixins import TimestampMixin


class LeadSource(str, enum.Enum):
    CONTACT_FORM = "contact_form"
    DEMO_REQUEST = "demo_request"


class LeadStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    DEMO_SCHEDULED = "demo_scheduled"
    CONVERTED = "converted"
    LOST = "lost"


class DemoMode(str, enum.Enum):
    ONLINE = "online"
    IN_PERSON = "in_person"
    PHONE_CALL = "phone_call"


class FollowupStatus(str, enum.Enum):
    PENDING = "pending"
    DONE = "done"
    CANCELLED = "cancelled"


class WhatsAppDirection(str, enum.Enum):
    OUTBOUND = "outbound"
    INBOUND = "inbound"


class CustomerLead(Base, TimestampMixin):
    """
    Parent record for every enquiry. A contact-form submission and a demo
    request both create a CustomerLead; a demo request additionally creates
    a linked DemoRequest row with the extra scheduling fields.
    """

    __tablename__ = "CUSTOMER_LEADS"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    lead_id: Mapped[str] = mapped_column(String(32), unique=True, nullable=False, index=True)

    full_name: Mapped[str] = mapped_column(String(160), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)

    source: Mapped[LeadSource] = mapped_column(
        Enum(LeadSource, native_enum=False, length=32, values_callable=lambda obj: [e.value for e in obj]), nullable=False
    )
    status: Mapped[LeadStatus] = mapped_column(
        Enum(LeadStatus, native_enum=False, length=32, values_callable=lambda obj: [e.value for e in obj]), default=LeadStatus.NEW, nullable=False
    )
    preferred_language: Mapped[str] = mapped_column(String(5), default="en", nullable=False)

    demo_request: Mapped["DemoRequest | None"] = relationship(
        back_populates="lead", uselist=False, cascade="all, delete-orphan"
    )
    followups: Mapped[list["LeadFollowup"]] = relationship(
        back_populates="lead", cascade="all, delete-orphan"
    )
    whatsapp_messages: Mapped[list["WhatsAppMessage"]] = relationship(
        back_populates="lead", cascade="all, delete-orphan"
    )


class DemoRequest(Base, TimestampMixin):
    """Demo-specific fields, one-to-one with a CustomerLead."""

    __tablename__ = "DEMO_REQUESTS"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    lead_id: Mapped[int] = mapped_column(
        ForeignKey("CUSTOMER_LEADS.id", ondelete="CASCADE"), unique=True, nullable=False
    )

    company_name: Mapped[str] = mapped_column(String(200), nullable=False)
    gst_number: Mapped[str | None] = mapped_column(String(15), nullable=True)
    business_type: Mapped[str] = mapped_column(String(60), nullable=False)
    industry: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    business_requirement: Mapped[str] = mapped_column(Text, nullable=False)
    preferred_demo_date: Mapped[Date] = mapped_column(Date, nullable=False)
    preferred_demo_time: Mapped[str] = mapped_column(String(10), nullable=False)
    demo_mode: Mapped[DemoMode] = mapped_column(
        Enum(DemoMode, native_enum=False, length=20, values_callable=lambda obj: [e.value for e in obj]), nullable=False
    )

    lead: Mapped["CustomerLead"] = relationship(back_populates="demo_request")


class LeadFollowup(Base, TimestampMixin):
    """A follow-up task/note against a lead, managed from the APEX admin portal."""

    __tablename__ = "LEAD_FOLLOWUPS"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("CUSTOMER_LEADS.id", ondelete="CASCADE"), nullable=False)

    note: Mapped[str] = mapped_column(Text, nullable=False)
    follow_up_date: Mapped[Date] = mapped_column(Date, nullable=False)
    status: Mapped[FollowupStatus] = mapped_column(
        Enum(FollowupStatus, native_enum=False, length=20, values_callable=lambda obj: [e.value for e in obj]), default=FollowupStatus.PENDING, nullable=False
    )
    created_by_admin_id: Mapped[int | None] = mapped_column(
        ForeignKey("ADMIN_USERS.id", ondelete="SET NULL"), nullable=True
    )

    lead: Mapped["CustomerLead"] = relationship(back_populates="followups")


class WhatsAppMessage(Base, TimestampMixin):
    """
    Stored WhatsApp communication history for a lead. Populated today by
    the click-to-chat handoff (the outbound message we construct); the
    schema already supports inbound messages so swapping in the WhatsApp
    Business API later (per the SRS) only adds a webhook, not a new table.
    """

    __tablename__ = "WHATSAPP_MESSAGES"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("CUSTOMER_LEADS.id", ondelete="CASCADE"), nullable=False)

    direction: Mapped[WhatsAppDirection] = mapped_column(
        Enum(WhatsAppDirection, native_enum=False, length=10, values_callable=lambda obj: [e.value for e in obj]), nullable=False
    )
    message_text: Mapped[str] = mapped_column(Text, nullable=False)
    language_code: Mapped[str] = mapped_column(String(5), default="en", nullable=False)

    lead: Mapped["CustomerLead"] = relationship(back_populates="whatsapp_messages")
