"""
CoreStone Technologies API — application entrypoint.

Run locally with:
    uvicorn app.main:app --reload --port 8000

Swagger UI:  http://localhost:8000/docs
ReDoc:       http://localhost:8000/redoc
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.exceptions import register_exception_handlers
from app.core.logging import configure_logging, get_logger

settings = get_settings()
configure_logging()
logger = get_logger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "Lead management and business-enquiry API for CoreStone Technologies. "
        "Handles demo requests, customer leads, follow-ups and WhatsApp "
        "click-to-chat handoff, backed by Oracle Database."
    ),
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/", tags=["Root"], summary="API root")
def read_root() -> dict:
    return {
        "success": True,
        "message": f"{settings.PROJECT_NAME} is running.",
        "docs": "/docs",
        "health": f"{settings.API_V1_PREFIX}/health",
    }


@app.on_event("startup")
async def on_startup() -> None:
    logger.info("%s starting up in '%s' mode.", settings.PROJECT_NAME, settings.ENVIRONMENT)


@app.on_event("shutdown")
async def on_shutdown() -> None:
    logger.info("%s shutting down.", settings.PROJECT_NAME)
