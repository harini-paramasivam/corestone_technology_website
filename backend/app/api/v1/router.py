"""
Aggregates every endpoint router under a single /api/v1 prefix.
"""
from fastapi import APIRouter

from app.api.v1.endpoints import auth, demo_requests, health, leads

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(leads.router)
api_router.include_router(demo_requests.router)
api_router.include_router(auth.router)
