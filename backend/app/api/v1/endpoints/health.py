"""Health and readiness checks used by uptime monitors and deploy platforms."""
from fastapi import APIRouter

from app.core.config import get_settings

router = APIRouter(tags=["Health"])
settings = get_settings()


@router.get("/health", summary="Liveness check")
def health_check() -> dict:
    """Returns 200 as soon as the process is up. Does not touch the database."""
    return {
        "success": True,
        "status": "ok",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
    }
