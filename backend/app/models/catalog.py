"""
Catalog models — the read-mostly content behind the Solutions/Industries
pages (business categories == industries, services == solutions) plus the
feature list attached to each. Oracle table names are explicit via
__tablename__ (uppercase, matching the SRS table list) rather than
SQLAlchemy's default snake_case-of-class-name inference.
"""
from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from app.models.mixins import TimestampMixin


class BusinessCategory(Base, TimestampMixin):
    """An industry category (Retail, Pharmacies, Hospitals, ...)."""

    __tablename__ = "BUSINESS_CATEGORIES"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    services: Mapped[list["Service"]] = relationship(back_populates="category")


class Service(Base, TimestampMixin):
    """A solution/service offering (Billing Software, GST Billing, ...)."""

    __tablename__ = "SERVICES"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    category_id: Mapped[int | None] = mapped_column(
        ForeignKey("BUSINESS_CATEGORIES.id", ondelete="SET NULL"), nullable=True
    )
    slug: Mapped[str] = mapped_column(String(120), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    category: Mapped["BusinessCategory | None"] = relationship(back_populates="services")
    features: Mapped[list["SoftwareFeature"]] = relationship(back_populates="service")


class SoftwareFeature(Base, TimestampMixin):
    """An individual feature line item, optionally attached to a service."""

    __tablename__ = "SOFTWARE_FEATURES"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    service_id: Mapped[int | None] = mapped_column(
        ForeignKey("SERVICES.id", ondelete="SET NULL"), nullable=True
    )
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    service: Mapped["Service | None"] = relationship(back_populates="features")
