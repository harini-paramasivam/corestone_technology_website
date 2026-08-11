"""ADMIN_USERS — Oracle APEX admin portal and JWT API authentication share this table."""
import enum

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base
from app.models.mixins import TimestampMixin


class AdminRole(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    SALES_MANAGER = "sales_manager"
    SUPPORT_AGENT = "support_agent"


class AdminUser(Base, TimestampMixin):
    __tablename__ = "ADMIN_USERS"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    full_name: Mapped[str] = mapped_column(String(160), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[AdminRole] = mapped_column(
        Enum(AdminRole, native_enum=False, length=20), default=AdminRole.SUPPORT_AGENT, nullable=False
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    refresh_tokens: Mapped[list["AdminRefreshToken"]] = relationship(
        back_populates="admin", cascade="all, delete-orphan"
    )


class AdminRefreshToken(Base, TimestampMixin):
    """
    Server-side record of issued refresh tokens, so a refresh token can be
    revoked (on logout, or if compromised) rather than remaining valid
    until it naturally expires — a bare stateless JWT can't be revoked.
    Only a hash of the token is stored, never the token itself.
    """

    __tablename__ = "ADMIN_REFRESH_TOKENS"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    admin_id: Mapped[int] = mapped_column(ForeignKey("ADMIN_USERS.id", ondelete="CASCADE"), nullable=False)
    token_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, index=True)
    expires_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False)
    revoked_at: Mapped[DateTime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    admin: Mapped["AdminUser"] = relationship(back_populates="refresh_tokens")
