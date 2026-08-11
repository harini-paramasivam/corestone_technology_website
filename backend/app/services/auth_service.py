"""
Auth service — password verification, access + refresh token issuance,
refresh-token rotation (old token revoked, new one issued on every
refresh), and logout (revoke). Endpoints call this; nothing else touches
password hashes or token generation directly.
"""
from sqlalchemy.orm import Session

from app.core.exceptions import UnauthorizedError
from app.core.security import (
    create_access_token,
    generate_refresh_token,
    hash_refresh_token,
    refresh_token_expiry,
    verify_password,
)
from app.models.admin import AdminUser
from app.repositories.admin_repository import AdminRepository
from app.repositories.refresh_token_repository import RefreshTokenRepository
from app.schemas.auth import TokenPair


class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.admins = AdminRepository(db)
        self.refresh_tokens = RefreshTokenRepository(db)

    def _issue_token_pair(self, admin: AdminUser) -> TokenPair:
        access_token = create_access_token(subject=admin.email, role=admin.role.value)
        raw_refresh = generate_refresh_token()
        self.refresh_tokens.create(
            admin_id=admin.id,
            token_hash=hash_refresh_token(raw_refresh),
            expires_at=refresh_token_expiry(),
        )
        self.db.commit()
        return TokenPair(access_token=access_token, refresh_token=raw_refresh)

    def login(self, *, email: str, password: str) -> tuple[AdminUser, TokenPair]:
        admin = self.admins.get_by_email(email)
        if admin is None or not admin.is_active or not verify_password(password, admin.hashed_password):
            raise UnauthorizedError("Incorrect email or password.")
        return admin, self._issue_token_pair(admin)

    def refresh(self, *, raw_refresh_token: str) -> TokenPair:
        token_hash = hash_refresh_token(raw_refresh_token)
        record = self.refresh_tokens.get_valid_by_hash(token_hash)
        if record is None:
            raise UnauthorizedError("Refresh token is invalid or has expired.")

        admin = self.admins.get_by_id(record.admin_id)
        if admin is None or not admin.is_active:
            raise UnauthorizedError("Refresh token is invalid or has expired.")

        # Rotate: the presented refresh token is single-use.
        self.refresh_tokens.revoke(record)
        return self._issue_token_pair(admin)

    def logout(self, *, raw_refresh_token: str) -> None:
        token_hash = hash_refresh_token(raw_refresh_token)
        record = self.refresh_tokens.get_valid_by_hash(token_hash)
        if record is not None:
            self.refresh_tokens.revoke(record)
        self.db.commit()
