"""
Import every model module here so Base.metadata is fully populated the
moment `app.models` is imported — Alembic's env.py and any code calling
Base.metadata.create_all() both rely on this.
"""
from app.models.admin import AdminRefreshToken, AdminRole, AdminUser
from app.models.catalog import BusinessCategory, Service, SoftwareFeature
from app.models.lead import (
    CustomerLead,
    DemoMode,
    DemoRequest,
    FollowupStatus,
    LeadFollowup,
    LeadSource,
    LeadStatus,
    WhatsAppDirection,
    WhatsAppMessage,
)

__all__ = [
    "AdminRefreshToken",
    "AdminRole",
    "AdminUser",
    "BusinessCategory",
    "CustomerLead",
    "DemoMode",
    "DemoRequest",
    "FollowupStatus",
    "LeadFollowup",
    "LeadSource",
    "LeadStatus",
    "Service",
    "SoftwareFeature",
    "WhatsAppDirection",
    "WhatsAppMessage",
]
