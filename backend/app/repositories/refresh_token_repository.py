from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.admin import AdminRefreshToken


class RefreshTokenRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, *, admin_id: int, token_hash: str, expires_at) -> AdminRefreshToken:
        record = AdminRefreshToken(admin_id=admin_id, token_hash=token_hash, expires_at=expires_at)
        self.db.add(record)
        self.db.flush()
        return record

    def get_valid_by_hash(self, token_hash: str) -> AdminRefreshToken | None:
        stmt = select(AdminRefreshToken).where(AdminRefreshToken.token_hash == token_hash)
        record = self.db.execute(stmt).scalar_one_or_none()
        if record is None:
            return None
        if record.revoked_at is not None:
            return None

        expires_at = record.expires_at
        if expires_at.tzinfo is None:
            # Some drivers round-trip DateTime(timezone=True) as naive
            # (values were always written in UTC — see mixins.utcnow /
            # refresh_token_expiry). Normalize defensively rather than
            # assume every driver preserves tzinfo.
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if expires_at < datetime.now(timezone.utc):
            return None
        return record

    def revoke(self, record: AdminRefreshToken) -> None:
        record.revoked_at = datetime.now(timezone.utc)
        self.db.add(record)
        self.db.flush()

    def revoke_all_for_admin(self, admin_id: int) -> None:
        stmt = select(AdminRefreshToken).where(
            AdminRefreshToken.admin_id == admin_id, AdminRefreshToken.revoked_at.is_(None)
        )
        for record in self.db.execute(stmt).scalars():
            record.revoked_at = datetime.now(timezone.utc)
            self.db.add(record)
        self.db.flush()
