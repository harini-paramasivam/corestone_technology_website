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


class OracleConfigurationError(RuntimeError):
    """Raised when a connection is attempted without Oracle configured."""


def _build_database_url() -> str:
    """
    Builds the Oracle SQLAlchemy URL from discrete settings.

    Required env vars (see backend/.env.example):
        ORACLE_USER, ORACLE_PASSWORD, ORACLE_DSN

    ORACLE_DSN accepts either:
        host:port/service_name        e.g. "localhost:1521/XEPDB1"
        a full TNS alias / Easy Connect Plus string
        a wallet-based connect string (Oracle Autonomous DB)
    """
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
        raise OracleConfigurationError(
            "Oracle Database is not configured. Missing environment "
            f"variable(s): {', '.join(missing)}. This project targets Oracle "
            "Database exclusively — there is no fallback database. Set these "
            "in backend/.env (see backend/.env.example) or as platform "
            "environment variables before starting the API. See "
            "ORACLE_APEX_SETUP.md for provisioning a local Oracle XE instance "
            "or connecting to an Oracle Autonomous Database wallet."
        )

    return (
        f"oracle+oracledb://{settings.ORACLE_USER}:{settings.ORACLE_PASSWORD}"
        f"@{settings.ORACLE_DSN}"
    )


@lru_cache
def get_engine() -> Engine:
    """Builds (once) and returns the Oracle engine. Raises if unconfigured."""
    database_url = _build_database_url()
    return create_engine(
        database_url,
        pool_pre_ping=True,
        pool_size=settings.ORACLE_POOL_MIN,
        max_overflow=max(settings.ORACLE_POOL_MAX - settings.ORACLE_POOL_MIN, 0),
    )


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
