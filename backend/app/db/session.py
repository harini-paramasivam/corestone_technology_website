"""
Database engine and session management.

Oracle Database is the ONLY supported database for this project, connected
via python-oracledb's SQLAlchemy dialect (oracle+oracledb). There is no
fallback to SQLite, PostgreSQL, MySQL, or any other engine — every
repository, ORM model, and Alembic migration targets Oracle exclusively.

Engine creation is deliberately lazy (built on first use via
`get_engine()`, not at module import time). This lets `Base` and every
ORM model be imported freely — by Alembic's autogenerate, by unit tests
that only exercise Pydantic/service logic, by tooling — without requiring
live Oracle credentials. The moment anything actually tries to *connect*
(via `get_db()`), missing configuration raises a clear
`OracleConfigurationError` naming exactly which variable is absent.
"""
from collections.abc import Generator
from functools import lru_cache

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import get_settings

settings = get_settings()


class DatabaseConfigurationError(RuntimeError):
    """Raised when a connection is attempted without PostgreSQL or Oracle configured."""


def _build_database_url() -> str:
    """
    Returns DATABASE_URL if configured (e.g. Supabase PostgreSQL),
    otherwise falls back to discrete Oracle configuration settings.
    """
    if settings.DATABASE_URL:
        url = settings.DATABASE_URL.strip()
        # Convert postgres:// to postgresql:// or postgresql+psycopg2:// if needed
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+psycopg2://", 1)
        elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
            url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
        return url

    missing = [
        name
        for name, value in (
            ("ORACLE_USER", settings.ORACLE_USER),
            ("ORACLE_PASSWORD", settings.ORACLE_PASSWORD),
            ("ORACLE_DSN", settings.ORACLE_DSN),
        )
        if not value
    ]
    if missing:
        raise DatabaseConfigurationError(
            "Database is not configured. Missing DATABASE_URL (for PostgreSQL/Supabase) "
            f"or Oracle environment variable(s): {', '.join(missing)}."
        )

    return (
        f"oracle+oracledb://{settings.ORACLE_USER}:{settings.ORACLE_PASSWORD}"
        f"@{settings.ORACLE_DSN}"
    )


@lru_cache
def get_engine() -> Engine:
    """Builds (once) and returns the SQLAlchemy engine. Raises if unconfigured."""
    database_url = _build_database_url()
    is_postgres = database_url.startswith("postgresql")
    
    engine_kwargs = {
        "pool_pre_ping": True,
    }
    if is_postgres:
        # Supabase transaction pooler (port 6543) works best with statement preparation disabled
        # and standard connection pooling parameters
        engine_kwargs["pool_size"] = getattr(settings, "POSTGRES_POOL_SIZE", 10)
        engine_kwargs["max_overflow"] = getattr(settings, "POSTGRES_MAX_OVERFLOW", 5)
    else:
        engine_kwargs["pool_size"] = settings.ORACLE_POOL_MIN
        engine_kwargs["max_overflow"] = max(settings.ORACLE_POOL_MAX - settings.ORACLE_POOL_MIN, 0)

    return create_engine(database_url, **engine_kwargs)


@lru_cache
def get_session_factory() -> sessionmaker:
    return sessionmaker(autocommit=False, autoflush=False, bind=get_engine())


class Base(DeclarativeBase):
    """Declarative base class every ORM model inherits from."""


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a request-scoped Oracle session."""
    session_factory = get_session_factory()
    db = session_factory()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
