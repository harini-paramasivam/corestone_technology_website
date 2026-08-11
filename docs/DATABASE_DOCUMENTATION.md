# CoreStone Technologies — Database Documentation

Oracle Database only — see `oracle/README.md` for why and for the
install order. This file is the schema reference: what each table is
for, how they relate, and where the SQLAlchemy/Pydantic/Oracle layers
correspond. Every table/column pairing below was cross-checked
programmatically against the live SQLAlchemy ORM metadata (see
`oracle/README.md`'s verification note) — this isn't a hand-maintained
description that can silently drift from the code.

---

## Entity-Relationship Overview

```
BUSINESS_CATEGORIES ──┐
                       │ (1:N, nullable FK)
                       ▼
                    SERVICES ──┐
                                │ (1:N, nullable FK)
                                ▼
                        SOFTWARE_FEATURES

CUSTOMER_LEADS ──┬── (1:1) ── DEMO_REQUESTS
                  ├── (1:N) ── LEAD_FOLLOWUPS ── (N:1, nullable) ── ADMIN_USERS
                  └── (1:N) ── WHATSAPP_MESSAGES

ADMIN_USERS ── (1:N) ── ADMIN_REFRESH_TOKENS
```

9 tables total. `BUSINESS_CATEGORIES`/`SERVICES`/`SOFTWARE_FEATURES` are
the content catalog (industries/solutions/features shown on the public
site); the other 6 are the lead-management + auth core.

---

## Table Reference

### `BUSINESS_CATEGORIES`

Industry catalog (Nurseries, Retail, Hospitals, ...). Matches
`frontend/src/data/site.js`'s `INDUSTRIES` array — same slugs, same
names, same order (seeded in `oracle/sample_data.sql`).

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK |
| `SLUG` | `VARCHAR2(120)` | Unique, e.g. `retail` |
| `NAME` | `VARCHAR2(160)` | Display name |
| `DESCRIPTION` | `CLOB` | Nullable |
| `IS_ACTIVE` | `NUMBER(1)` | 0/1, CHECK-constrained |
| `CREATED_AT` / `UPDATED_AT` | `TIMESTAMP WITH TIME ZONE` | Maintained by SQLAlchemy (`onupdate`) and a DB-level trigger (belt-and-suspenders) |

### `SERVICES`

Solutions catalog (Billing Software, GST Billing, ...). Matches
`SOLUTIONS` in `site.js`.

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK |
| `CATEGORY_ID` | `NUMBER` | FK → `BUSINESS_CATEGORIES.ID`, `ON DELETE SET NULL`, nullable |
| `SLUG` | `VARCHAR2(120)` | Unique |
| `NAME` | `VARCHAR2(160)` | |
| `DESCRIPTION` | `CLOB` | Nullable |
| `IS_ACTIVE` | `NUMBER(1)` | |

### `SOFTWARE_FEATURES`

Feature line items, optionally attached to a service.

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK |
| `SERVICE_ID` | `NUMBER` | FK → `SERVICES.ID`, `ON DELETE SET NULL`, nullable |
| `NAME` | `VARCHAR2(160)` | |
| `DESCRIPTION` | `CLOB` | Nullable |

### `CUSTOMER_LEADS`

The parent record for every enquiry — both a contact-form submission
and a demo request create one row here.

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK (internal, never shown to users) |
| `LEAD_ID` | `VARCHAR2(32)` | Unique, human-facing, e.g. `CS-202607-4F9A2C` — generated app-side (`backend/app/utils/lead_id.py`), with an Oracle trigger backstop (§ oracle/triggers.sql) |
| `FULL_NAME` | `VARCHAR2(160)` | |
| `EMAIL` | `VARCHAR2(255)` | CHECK-constrained to a basic email shape |
| `PHONE` | `VARCHAR2(20)` | |
| `MESSAGE` | `CLOB` | Nullable — only populated for contact-form leads |
| `SOURCE` | `VARCHAR2(32)` | CHECK: `contact_form` \| `demo_request` |
| `STATUS` | `VARCHAR2(32)` | CHECK: `new` \| `contacted` \| `qualified` \| `demo_scheduled` \| `converted` \| `lost`; default `new` |
| `PREFERRED_LANGUAGE` | `VARCHAR2(5)` | CHECK: `en` \| `ta`; default `en` — the language the customer used when submitting |

### `DEMO_REQUESTS`

One-to-one extension of `CUSTOMER_LEADS` for demo-specific fields.

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK |
| `LEAD_ID` | `NUMBER` | FK → `CUSTOMER_LEADS.ID`, unique (enforces 1:1), `ON DELETE CASCADE` |
| `COMPANY_NAME` | `VARCHAR2(200)` | |
| `BUSINESS_TYPE` | `VARCHAR2(60)` | |
| `INDUSTRY` | `VARCHAR2(80)` | An industry slug |
| `CITY` / `STATE` | `VARCHAR2(100)` each | |
| `BUSINESS_REQUIREMENT` | `CLOB` | |
| `PREFERRED_DEMO_DATE` | `DATE` | |
| `PREFERRED_DEMO_TIME` | `VARCHAR2(10)` | e.g. `10:00` |
| `DEMO_MODE` | `VARCHAR2(20)` | CHECK: `online` \| `in_person` \| `phone_call` |

### `LEAD_FOLLOWUPS`

Follow-up tasks/notes, managed from the Oracle APEX admin portal.

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK |
| `LEAD_ID` | `NUMBER` | FK → `CUSTOMER_LEADS.ID`, `ON DELETE CASCADE` |
| `NOTE` | `CLOB` | |
| `FOLLOW_UP_DATE` | `DATE` | |
| `STATUS` | `VARCHAR2(20)` | CHECK: `pending` \| `done` \| `cancelled`; default `pending` |
| `CREATED_BY_ADMIN_ID` | `NUMBER` | FK → `ADMIN_USERS.ID`, `ON DELETE SET NULL`, nullable |

### `WHATSAPP_MESSAGES`

Stored WhatsApp communication history per lead.

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK |
| `LEAD_ID` | `NUMBER` | FK → `CUSTOMER_LEADS.ID`, `ON DELETE CASCADE` |
| `DIRECTION` | `VARCHAR2(10)` | CHECK: `outbound` \| `inbound` |
| `MESSAGE_TEXT` | `CLOB` | |
| `LANGUAGE_CODE` | `VARCHAR2(5)` | CHECK: `en` \| `ta`; default `en` — which language the stored message was composed in |

### `ADMIN_USERS`

Shared by the FastAPI JWT auth and the Oracle APEX admin portal login.

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK |
| `FULL_NAME` | `VARCHAR2(160)` | |
| `EMAIL` | `VARCHAR2(255)` | Unique, CHECK-constrained to a basic email shape |
| `HASHED_PASSWORD` | `VARCHAR2(255)` | bcrypt hash (`backend/app/core/security.py`) — never plaintext, never logged |
| `ROLE` | `VARCHAR2(20)` | CHECK: `super_admin` \| `sales_manager` \| `support_agent`; default `support_agent` |
| `IS_ACTIVE` | `NUMBER(1)` | |

### `ADMIN_REFRESH_TOKENS`

Server-side record of issued refresh tokens, enabling revocation (a bare
JWT can't be revoked before it naturally expires).

| Column | Type | Notes |
|---|---|---|
| `ID` | `NUMBER` IDENTITY | PK |
| `ADMIN_ID` | `NUMBER` | FK → `ADMIN_USERS.ID`, `ON DELETE CASCADE` |
| `TOKEN_HASH` | `VARCHAR2(64)` | SHA-256 hash of the raw token — the raw token itself is never stored |
| `EXPIRES_AT` | `TIMESTAMP WITH TIME ZONE` | |
| `REVOKED_AT` | `TIMESTAMP WITH TIME ZONE` | Nullable — `NULL` means still valid |

---

## Views (reporting layer — `oracle/views.sql`)

| View | Purpose |
|---|---|
| `V_MONTHLY_LEADS` | Leads grouped by month, split by source and conversion |
| `V_LEADS_BY_INDUSTRY` | Demo requests grouped by industry, with conversion rate |
| `V_LEAD_SOURCES` | Leads grouped by source, with percentage of total |
| `V_DEMO_REQUESTS_DETAIL` | Full detail rows joining `CUSTOMER_LEADS` + `DEMO_REQUESTS` |
| `V_LEAD_CONVERSION` | Funnel counts by status |
| `V_BUSINESS_CATEGORY_ANALYTICS` | Demo request counts per industry category |
| `V_FOLLOWUP_STATUS` | Follow-up counts by status, including an overdue count |
| `V_LEAD_LANGUAGE_BREAKDOWN` | Lead/demo/conversion counts split by `PREFERRED_LANGUAGE` |
| `V_LEAD_DASHBOARD` | The primary admin-grid source — combines lead + demo + follow-up + WhatsApp-count per row |

## PL/SQL (business logic layer)

| Object | File | Purpose |
|---|---|---|
| `FN_GENERATE_FALLBACK_LEAD_ID` | `functions.sql` | Backstop lead-ID generator (app-layer generation is primary) |
| `FN_LEAD_CONVERSION_RATE` | `functions.sql` | Conversion % over a date range |
| `FN_GET_LEAD_AGE_DAYS` | `functions.sql` | Days since a lead was created |
| `FN_GET_LEAD_COUNT` | `functions.sql` | Flexible filtered lead counter |
| `PR_CREATE_LEAD` / `PR_CREATE_DEMO_REQUEST` | `procedures.sql` | DB-layer lead/demo creation for non-API callers (APEX processes) |
| `PR_UPDATE_LEAD_STATUS` / `PR_CREATE_FOLLOWUP` | `procedures.sql` | Named per the SRS exactly; thin wrappers over `PRC_UPDATE_LEAD_STATUS`/`PRC_ADD_FOLLOWUP` |
| `PR_LOG_WHATSAPP_MESSAGE` | `procedures.sql` | Records a WhatsApp message with its language |
| `PRC_CLOSE_STALE_LEADS` | `procedures.sql` | Automation: ages out untouched `new` leads to `lost` |
| `PRC_GET_DAILY_LEAD_REPORT` | `procedures.sql` | REF CURSOR for a given day's leads |
| `CORESTONE_LEAD_PKG` | `packages.sql` | Namespaced facade over the above, for APEX page processes |
| `TRG_CUSTOMER_LEADS_LEAD_ID` | `triggers.sql` | Lead-ID backstop on insert |
| `TRG_*_UPD` (×9) | `triggers.sql` | `UPDATED_AT` maintenance, one per table |

---

## SQLAlchemy ↔ Oracle Mapping

Every model in `backend/app/models/` maps 1:1 to the tables above:

| Python file | Model class | Oracle table |
|---|---|---|
| `catalog.py` | `BusinessCategory` | `BUSINESS_CATEGORIES` |
| `catalog.py` | `Service` | `SERVICES` |
| `catalog.py` | `SoftwareFeature` | `SOFTWARE_FEATURES` |
| `lead.py` | `CustomerLead` | `CUSTOMER_LEADS` |
| `lead.py` | `DemoRequest` | `DEMO_REQUESTS` |
| `lead.py` | `LeadFollowup` | `LEAD_FOLLOWUPS` |
| `lead.py` | `WhatsAppMessage` | `WHATSAPP_MESSAGES` |
| `admin.py` | `AdminUser` | `ADMIN_USERS` |
| `admin.py` | `AdminRefreshToken` | `ADMIN_REFRESH_TOKENS` |

Python enums (`LeadSource`, `LeadStatus`, `DemoMode`, `FollowupStatus`,
`WhatsAppDirection`, `AdminRole`) use `native_enum=False` — plain
`VARCHAR2` columns validated three independent times: Pydantic at the
API boundary, an Oracle `CHECK` constraint, and any PL/SQL procedure
that writes directly. No single point of failure can let an invalid
value in.

## Booleans

Oracle has no native `BOOLEAN` prior to 23c. This project targets 19c+
as its floor, so `IS_ACTIVE`-style flags are `NUMBER(1)` with a `CHECK
(col IN (0,1))` constraint, matched on the Python side by SQLAlchemy's
`Boolean` type (which the `oracledb` dialect already maps to `NUMBER(1)`
automatically).
