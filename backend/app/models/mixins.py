"""Shared mixins for ORM models."""
from datetime import datetime, timezone

from sqlalchemy import DateTime
from sqlalchemy.orm import Mapped, mapped_column


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class TimestampMixin:
    """created_at / updated_at columns, present on every table that needs
    an audit trail. Uses application-side timestamps (utcnow) rather than
    Oracle's SYSTIMESTAMP so behavior is identical in tests and production.
    """

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False
    )
