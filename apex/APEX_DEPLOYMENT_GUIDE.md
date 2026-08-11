# CoreStone Technologies — Oracle APEX: Installation & Deployment Guide

This is the step-by-step companion to `APPLICATION_SPECIFICATION.md` —
that document specifies *what* to build; this one covers *how to stand up
the workspace and deploy it*. Steps marked 🔧 require a real APEX
workspace to execute (I can tell you exactly what to click; I can't click
it for you from this environment).

## 1. Prerequisites

- Oracle Database 19c+ with APEX installed (APEX ships pre-installed on
  Oracle Autonomous Database; for on-prem/XE, APEX 22.2+ recommended)
- The schema created via `oracle/installation.sql` and populated via
  `oracle/schema.sql` (Module 8) — APEX builds **on top of** this schema,
  it does not create its own copy of the tables
- An APEX workspace with `CORESTONE_APP` as its **parsing schema**

## 2. Workspace Setup 🔧

1. Sign in to APEX Administration (`/apex/apex_admin` on-prem, or the
   Autonomous DB's APEX service console).
2. Create Workspace → name it `CORESTONE`, associate it with the
   `CORESTONE_APP` schema created in `oracle/installation.sql`.
3. Create a workspace administrator account (separate from any
   `ADMIN_USERS` row — this is APEX's own workspace-level login, distinct
   from the application's admin login described in
   `APPLICATION_SPECIFICATION.md` §2).

## 3. Application Creation 🔧

1. App Builder → Create → **New Application**.
2. Name: `CoreStone Admin Portal`. Alias: `CORESTONE_ADMIN`.
3. Theme: Universal Theme (42).
4. Create the 10 pages from `APPLICATION_SPECIFICATION.md` §1.1 — for
   each page, the spec document gives you the region sources, items,
   buttons, and processes directly; there is no ambiguity to resolve at
   build time, only clicking to translate the written spec into APEX
   metadata.
5. Build the Custom Authentication Scheme per §2 — **this is the one
   step that needs a product decision first** (the bcrypt-bridge vs.
   separate-APEX-password trade-off called out in the spec's honesty
   note). Decide that before wiring the scheme.
6. Build the three Authorization Schemes from §3, verbatim (the PL/SQL
   expressions are copy-paste ready).
7. Create the 6 static LOVs + 1 dynamic LOV from §5, verbatim.

## 4. Verifying the Build 🔧

Once pages are built, confirm each region actually renders using the SQL
from `APPLICATION_SPECIFICATION.md` §8 — every one of those queries was
cross-checked to reference real objects in `oracle/views.sql` and
`oracle/packages.sql` (I ran this check programmatically, see
`oracle/README.md`), so a region failing to render points to an APEX
build-time issue (wrong page item name, wrong binding), not a bad query.

## 5. Deploying to a New Environment (dev → staging → prod)

Oracle APEX applications move between environments via **export/import**,
not via files in this repository (APEX exports are workspace-specific
binary-ish SQL that only make sense once an app has actually been built —
see the honesty note in `APPLICATION_SPECIFICATION.md` §9 on why none is
included here).

1. In the source workspace: **App Builder → Application → Export**.
   Choose "Application and Page Access Control" export type for a full
   migration including authorization schemes.
2. In the target workspace: **App Builder → Import**, upload the export,
   then **Install** — choosing "Reuse Application ID" if replacing an
   existing install, or "Auto-Assign New ID" for a fresh one.
3. Re-point the Authentication Scheme's backend-call configuration (if
   using the bcrypt-bridge design) at the target environment's FastAPI
   base URL — this is an environment-specific value, not something an
   export carries correctly across environments automatically.
4. Re-run `oracle/sample_data.sql`'s **catalog rows only** (Business
   Categories/Services) in the target schema if it's a fresh database —
   never re-run the sample `CUSTOMER_LEADS` rows in a real environment.

## 6. Ongoing Maintenance

- Schema changes always go through `oracle/` first (Module 8's files are
  the source of truth), then are reflected in APEX regions/LOVs manually
  — there is no auto-sync between an Alembic migration and an APEX page,
  so a checklist item for every future schema change should be "does any
  APEX page reference the column/table I just changed?"
- `PRC_CLOSE_STALE_LEADS` (business automation, `oracle/procedures.sql`)
  is designed to run on a schedule. On-prem/XE: use `DBMS_SCHEDULER`
  directly. On Autonomous DB: APEX's own **Automation** feature (Shared
  Components → Automations) can call it on a cron-like schedule without
  needing `DBMS_SCHEDULER` privileges at all — prefer that route on ATP/ADW.
