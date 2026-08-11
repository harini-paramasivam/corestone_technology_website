"""Centralized logging configuration for the API."""
import logging
import sys

from app.core.config import get_settings

settings = get_settings()

LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"


def configure_logging() -> None:
    """Configure the root logger once, at application startup."""
    level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter(LOG_FORMAT))

    root_logger = logging.getLogger()
    root_logger.setLevel(level)

    # Avoid duplicate handlers on reload
    root_logger.handlers = [handler]

    # Quiet noisy third-party loggers in development
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
