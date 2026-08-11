"""
Lead ID generation.

Generates human-readable, sortable, collision-resistant lead IDs at the
application layer (e.g. CS-202607-4F9A2C), so a lead ID exists the instant
a row is created without a DB round-trip. Uniqueness is additionally
enforced by a UNIQUE constraint on CUSTOMER_LEADS.lead_id (see
oracle/tables.sql, Module 8) — the repository layer catches a collision
and retries, though at this ID space the odds are negligible.

This is deliberately application-side rather than an Oracle
sequence+trigger so lead IDs are generated identically whether the app
runs against Oracle, in tests, or in any future environment — the Oracle
trigger in Module 8 exists as a defense-in-depth backstop, not the
primary generation path.
"""
import secrets
from datetime import datetime, timezone

PREFIX = "CS"


def generate_lead_id() -> str:
    stamp = datetime.now(timezone.utc).strftime("%Y%m")
    token = secrets.token_hex(3).upper()  # 6 hex chars
    return f"{PREFIX}-{stamp}-{token}"
