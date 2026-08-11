# CoreStone Technologies — Oracle Database Setup

Oracle Database is the **only** supported database for this project. There
is no SQLite/PostgreSQL/MySQL/MongoDB fallback anywhere in the codebase —
see `backend/app/db/session.py`, which raises a clear configuration error
rather than connecting to anything else.

## Compatibility

Everything in this folder targets **Oracle Database 19c or later**
(Oracle XE 21c, on-prem 19c/21c/23ai, and Oracle Autonomous Database —
ATP/ADW — are all supported). Nothing here uses a feature newer than 19c
except native `BOOLEAN` avoidance, which is deliberate for the *widest*
compatibility (see `tables.sql`).

## File order (matches `schema.sql`)

| # | File | Purpose |
|---|------|---------|
| 1 | `tables.sql` | 9 tables, IDENTITY primary keys, column-for-column match with `backend/app/models/*.py` |
| 2 | `sequences.sql` | Backstop lead-ID sequence (app generates lead IDs; this is defense-in-depth only) |
| 3 | `constraints.sql` | FKs, UNIQUE, CHECK constraints (mirrors the Python enums exactly) |
| 4 | `indexes.sql` | FK indexes (Oracle doesn't auto-index these) + reporting indexes |
| 5 | `functions.sql` | `FN_GENERATE_FALLBACK_LEAD_ID`, `FN_LEAD_CONVERSION_RATE`, `FN_GET_LEAD_AGE_DAYS`, `FN_GET_LEAD_COUNT` |
| 6 | `procedures.sql` | `PR_CREATE_LEAD`, `PR_CREATE_DEMO_REQUEST`, `PR_UPDATE_LEAD_STATUS`, `PR_CREATE_FOLLOWUP`, `PR_LOG_WHATSAPP_MESSAGE`, plus daily-report and stale-lead automation |
| 7 | `packages.sql` | `CORESTONE_LEAD_PKG` — namespaced facade over the procedures above, for Oracle APEX page processes |
| 8 | `triggers.sql` | Lead-ID backstop trigger + `UPDATED_AT` maintenance (one per table) |
| 9 | `views.sql` | Every report in the SRS Reports section, plus the bilingual language breakdown |
| — | `sample_data.sql` | Seed data — 16 industries, 9 solutions, a few realistic sample leads (run separately, optional) |

## Installing

```bash
# 1. Create the dedicated schema/user (as a DBA-privileged user)
sqlplus system/<dba_password>@<connect_string> @installation.sql

# 2. Create every table/constraint/index/function/procedure/package/
#    trigger/view (as the CORESTONE_APP user just created)
sqlplus CORESTONE_APP/"<password>"@<connect_string> @schema.sql

# 3. (Optional, recommended for dev/staging) seed sample data
sqlplus CORESTONE_APP/"<password>"@<connect_string> @sample_data.sql

# 4. Point the backend at this schema
cd ../backend
cp .env.example .env
# edit .env: ORACLE_USER=CORESTONE_APP, ORACLE_PASSWORD=..., ORACLE_DSN=...

# 5. Create the first admin login
python -m app.scripts.create_admin --email you@corestonetech.com --name "Fernandes"
```

## Design notes worth knowing

- **Lead IDs are generated in the FastAPI app**, not the database (see
  `backend/app/utils/lead_id.py`), format `CS-YYYYMM-<6 hex chars>`. The
  `TRG_CUSTOMER_LEADS_LEAD_ID` trigger and `CORESTONE_LEAD_FALLBACK_SEQ`
  sequence exist only as a backstop for rows inserted directly at the DB
  layer (an APEX process, a manual fix) — in normal API operation they
  should never fire.
- **Booleans are `NUMBER(1)`**, not native `BOOLEAN` — Oracle only added
  a native boolean type in 23c, and this project targets 19c+ as the
  floor.
- **Enum-like columns are `VARCHAR2` with a `CHECK` constraint**, matching
  SQLAlchemy's `native_enum=False` choice in the models — the same enum
  values are validated in three independent places (Pydantic at the API
  boundary, the Oracle `CHECK` constraint, and PL/SQL procedures that
  write directly), so no path can write an invalid value.
- **`PREFERRED_LANGUAGE` / `LANGUAGE_CODE`** (`'en'` | `'ta'`) are
  threaded through `CUSTOMER_LEADS` and `WHATSAPP_MESSAGES` end-to-end —
  SQLAlchemy models, Pydantic schemas, Oracle tables, PL/SQL procedures,
  views, and sample data are all kept in sync (verified programmatically
  against the ORM metadata, not just by eye).

## What I could not verify here

I do not have a live Oracle instance or Oracle APEX workspace available
in this environment. Everything above has been checked as rigorously as
static analysis allows — every table's columns cross-checked
programmatically against the SQLAlchemy models, every `CREATE OR REPLACE`
PL/SQL block checked for a matching `END`/`/` terminator, every FK and
index target table confirmed to exist — but it has **not** been executed
against a real Oracle database. Run `schema.sql` in a disposable Oracle
XE container or an Autonomous DB free-tier instance before pointing
production traffic at it, the same way you would with SQL from any
source before trusting it in production.
