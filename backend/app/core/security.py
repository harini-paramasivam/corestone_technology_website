"""JWT + password hashing utilities for admin authentication."""
import hashlib
import secrets
from datetime import datetime, timedelta, timezone

import bcrypt
from jose import JWTError, jwt

from app.core.config import get_settings

settings = get_settings()

# passlib's bcrypt backend detection is broken against bcrypt>=4.1 (it
# reads a removed `__about__.__version__` attribute) — using the `bcrypt`
# library directly avoids that dependency entirely rather than pinning to
# an older, unmaintained bcrypt release.
_BCRYPT_MAX_BYTES = 72  # bcrypt silently ignores bytes beyond this


def hash_password(plain_password: str) -> str:
    password_bytes = plain_password.encode("utf-8")[:_BCRYPT_MAX_BYTES]
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_bytes = plain_password.encode("utf-8")[:_BCRYPT_MAX_BYTES]
    try:
        return bcrypt.checkpw(password_bytes, hashed_password.encode("utf-8"))
    except ValueError:
        # Malformed/foreign hash format — treat as a failed verification,
        # not a server error.
        return False


def create_access_token(*, subject: str, role: str, expires_minutes: int | None = None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    payload = {"sub": subject, "role": role, "exp": expire, "type": "access"}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Raises jose.JWTError on an invalid/expired/tampered token — callers
    (get_current_admin) translate that into a 401 response."""
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])


def generate_refresh_token() -> str:
    """
    Refresh tokens are opaque random strings (not JWTs) — the client
    presents the raw token, the server looks up its SHA-256 hash in
    ADMIN_REFRESH_TOKENS. This makes server-side revocation trivial
    (delete/mark revoked the row) in a way a stateless JWT can't support.
    """
    return secrets.token_urlsafe(48)


def hash_refresh_token(raw_token: str) -> str:
    return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()


def refresh_token_expiry() -> datetime:
    return datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)


__all__ = [
    "JWTError",
    "create_access_token",
    "decode_access_token",
    "generate_refresh_token",
    "hash_password",
    "hash_refresh_token",
    "refresh_token_expiry",
    "verify_password",
]
