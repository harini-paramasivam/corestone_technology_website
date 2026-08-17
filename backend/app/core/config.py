"""
Application configuration.

All runtime configuration is sourced from environment variables (see
.env.example). Nothing here should be hardcoded for a specific environment —
local, staging and production all use the same code path with different
.env files / platform environment variables.
"""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # --- Project ---
    PROJECT_NAME: str = "CoreStone Technologies API"
    API_V1_PREFIX: str = "/api/v1"
    ENVIRONMENT: str = "development"  # development | staging | production
    DEBUG: bool = True

    # --- Security ---
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 8  # 8 hours
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # --- CORS ---
    # Stored as a raw comma-separated string because pydantic-settings
    # attempts a JSON decode of list-typed fields before validators run,
    # which breaks on a plain "http://a,http://b" .env value. Exposed as a
    # list via the `BACKEND_CORS_ORIGINS` property below.
    BACKEND_CORS_ORIGINS_RAW: str = "http://localhost:5173,http://127.0.0.1:5173"

    @property
    def BACKEND_CORS_ORIGINS(self) -> list[str]:
        return [origin.strip() for origin in self.BACKEND_CORS_ORIGINS_RAW.split(",") if origin.strip()]

    # --- Database (PostgreSQL / Supabase or Oracle) ---
    DATABASE_URL: str = ""  # e.g. "postgresql+psycopg2://postgres:pass@db.xxx.supabase.co:5432/postgres"
    ORACLE_USER: str = ""
    ORACLE_PASSWORD: str = ""
    ORACLE_DSN: str = ""  # e.g. "host:1521/servicename" or a full TNS alias
    ORACLE_POOL_MIN: int = 2
    ORACLE_POOL_MAX: int = 10

    # --- WhatsApp Business API ---
    WHATSAPP_BUSINESS_NUMBER: str = "917708196424"
    WHATSAPP_API_URL: str = ""
    WHATSAPP_ACCESS_TOKEN: str = ""
    WHATSAPP_PHONE_NUMBER_ID: str = ""

    # --- Email Notification (Resend HTTP API) ---
    # Render blocks outbound SMTP ports (25/465/587) on free-tier web services,
    # so email is sent via Resend's HTTPS API instead of smtplib/SMTP.
    RESEND_API_KEY: str = ""                     # From https://resend.com/api-keys
    RESEND_FROM_EMAIL: str = "CoreStone Technologies <onboarding@resend.dev>"
    NOTIFICATION_EMAIL: str = "corestonetech2026@gmail.com"  # Inbox that receives leads

    # --- Legacy Gmail SMTP settings (unused now, kept only so old .env files
    # with these keys don't fail to load; safe to delete once confirmed unused) ---
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""

    # --- Oracle APEX Admin Portal ---
    APEX_ADMIN_URL: str = "https://oracleapex.com/ords/r/ferna_workspace/lead13309/home"

    # --- Admin bootstrap (seed data only, never used for auth directly) ---
    ADMIN_DEFAULT_EMAIL: str = "corestonetech2026@gmail.com"

    LOG_LEVEL: str = "INFO"


@lru_cache
def get_settings() -> "Settings":
    """Cached settings accessor — import this, not Settings() directly."""
    return Settings()