"""
Shared dependencies for admin-protected routes: resolves the current
AdminUser from a Bearer JWT, and provides a require_roles() factory for
per-endpoint RBAC. Every admin-portal route (leads management, follow-ups,
reports) depends on get_current_admin or require_roles(...), never rolls
its own auth check.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.security import JWTError, decode_access_token
from app.db.session import get_db
from app.models.admin import AdminRole, AdminUser
from app.repositories.admin_repository import AdminRepository

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)


def get_current_admin(
    token: str | None = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> AdminUser:
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if token is None:
        raise credentials_error

    try:
        payload = decode_access_token(token)
    except JWTError:
        raise credentials_error

    if payload.get("type") != "access":
        raise credentials_error

    email = payload.get("sub")
    if not email:
        raise credentials_error

    admin = AdminRepository(db).get_by_email(email)
    if admin is None or not admin.is_active:
        raise credentials_error

    return admin


def require_roles(*allowed_roles: AdminRole):
    """
    Usage: `admin: AdminUser = Depends(require_roles(AdminRole.SUPER_ADMIN))`
    Composes with get_current_admin rather than duplicating token
    decoding — RBAC is purely an additional role check on top of it.
    """

    def dependency(admin: AdminUser = Depends(get_current_admin)) -> AdminUser:
        if admin.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action.",
            )
        return admin

    return dependency
