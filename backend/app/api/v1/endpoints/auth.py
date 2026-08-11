"""Admin authentication endpoints — login, refresh, logout, and /me."""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.db.session import get_db
from app.models.admin import AdminUser
from app.schemas.auth import (
    AdminRead,
    LoginRequest,
    LoginResponse,
    RefreshRequest,
    TokenPair,
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=LoginResponse, summary="Admin login")
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> LoginResponse:
    service = AuthService(db)
    admin, tokens = service.login(email=payload.email, password=payload.password)
    return LoginResponse(
        access_token=tokens.access_token,
        refresh_token=tokens.refresh_token,
        admin=AdminRead.model_validate(admin),
    )


@router.post("/refresh", response_model=TokenPair, summary="Exchange a refresh token for a new token pair")
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)) -> TokenPair:
    service = AuthService(db)
    return service.refresh(raw_refresh_token=payload.refresh_token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT, summary="Revoke a refresh token")
def logout(payload: RefreshRequest, db: Session = Depends(get_db)) -> None:
    service = AuthService(db)
    service.logout(raw_refresh_token=payload.refresh_token)


@router.get("/me", response_model=AdminRead, summary="Current authenticated admin")
def me(admin: AdminUser = Depends(get_current_admin)) -> AdminRead:
    return AdminRead.model_validate(admin)
