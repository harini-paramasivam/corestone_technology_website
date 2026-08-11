"""
Application-wide exception types and their FastAPI handlers.

Domain services/repositories raise these instead of HTTPException directly,
keeping the service layer framework-agnostic. The handlers registered here
translate them into consistent JSON error responses.
"""
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.logging import get_logger

logger = get_logger(__name__)


class AppError(Exception):
    """Base class for all application (non-HTTP) errors."""

    status_code: int = status.HTTP_400_BAD_REQUEST
    default_message: str = "An unexpected error occurred."

    def __init__(self, message: str | None = None):
        self.message = message or self.default_message
        super().__init__(self.message)


class NotFoundError(AppError):
    status_code = status.HTTP_404_NOT_FOUND
    default_message = "The requested resource was not found."


class ConflictError(AppError):
    status_code = status.HTTP_409_CONFLICT
    default_message = "The request conflicts with the current state of the resource."


class ValidationAppError(AppError):
    status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
    default_message = "Validation failed."


class UnauthorizedError(AppError):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_message = "Authentication is required to access this resource."


class ForbiddenError(AppError):
    status_code = status.HTTP_403_FORBIDDEN
    default_message = "You do not have permission to perform this action."


class DatabaseError(AppError):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_message = "A database error occurred. Please try again shortly."


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
        logger.warning("AppError on %s %s: %s", request.method, request.url.path, exc.message)
        return JSONResponse(
            status_code=exc.status_code,
            content={"success": False, "error": exc.message, "path": request.url.path},
        )

    @app.exception_handler(RequestValidationError)
    async def validation_error_handler(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            content={
                "success": False,
                "error": "Validation failed.",
                "details": exc.errors(),
                "path": request.url.path,
            },
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        logger.exception("Unhandled exception on %s %s", request.method, request.url.path)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "error": "An internal server error occurred.",
                "path": request.url.path,
            },
        )
