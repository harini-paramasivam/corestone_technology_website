# CoreStone Technologies — Oracle APEX Admin Portal
## Application Specification

> **How to read this document.** Every item below is marked:
> - ✅ **Verified Deliverable** — derived directly from, and cross-checked
>   against, the Oracle schema and FastAPI backend already built in
>   Modules 7–8 (real tables, real views, real procedures — nothing here
>   references an object that doesn't exist in `oracle/`).
> - 🔧 **Workspace-dependent Deliverable** — the *design* is complete and
>   implementable exactly as written, but the actual APEX metadata (page
>   IDs assigned by the Application Builder, the generated `f<app_id>.sql`
>   export, exact rendering) can only be produced by importing this spec
>   into a real Oracle APEX workspace. I have no live APEX workspace in
>   this environment, so no export file is fabricated — that would risk
>   handing you something that looks official but has never actually been
>   validated by APEX itself.
>
> This document is written so an APEX developer (or a future me, with
> workspace access) can recreate the application from scratch by following
> it page by page, region by region.

---

## 1. Application Architecture ✅

| Property | Value |
|---|---|
| Application Name | CoreStone Admin Portal |
| Application Alias | `CORESTONE_ADMIN` |
| Authentication Scheme | Custom — delegates to the same Oracle tables the FastAPI backend uses (`ADMIN_USERS`, bcrypt-compatible verification via a PL/SQL wrapper — see §3) |
| Session State Protection | Enabled on every page; all items not explicitly required for public pages set to **Restricted - May not be set from browser** |
| Theme | Universal Theme (42), Redwood Dark for the shell to match the CoreStone navy/orange brand, Redwood Light for content regions |
| Primary Language | English (`en`) |
| Secondary Language | Tamil (`ta`) — via APEX's built-in Application Translation (Shared Components → Translate Application), **not** a copy of every page; see §6 |
| Build Option | `WHATSAPP_BUSINESS_API` (disabled by default) — wraps any future direct WhatsApp Business API integration so it can ship dormant and be turned on later without a redeploy |
| Supporting Objects | References `oracle/views.sql`, `oracle/packages.sql` (`CORESTONE_LEAD_PKG`), `oracle/procedures.sql`, `oracle/functions.sql` directly — no APEX-only database objects are introduced; every SQL source in this document already exists in `oracle/` |

### 1.1 Page map

| Page # | Name | Type | Purpose |
|---|---|---|---|
| 1 | Sign In | Login | Custom authentication page |
| 100 | Dashboard | Dashboard | KPI cards + charts, landing page after login |
| 200 | Lead Management | Interactive Grid | Browse/search/edit all leads |
| 210 | Lead Detail | Form (modal) | Full detail + follow-ups + WhatsApp history for one lead |
| 300 | Demo Requests | Interactive Report | Demo-specific view with scheduling fields |
| 400 | Follow-up Tracker | Interactive Grid | Cross-lead follow-up task list |
| 500 | Business Categories & Services | Interactive Grid (2 regions) | Manage the Industries/Solutions catalog |
| 600 | Reports | Dashboard (tabs) | Every SRS report as a chart + IR pair |
| 700 | Admin Users | Interactive Grid | Manage admin accounts and roles (Super Admin only) |
| 800 | My Profile | Form | Current admin's own profile + password change |
| 9999 | Page Not Found | Error | Standard APEX 404 handling |

### 1.2 Navigation structure ✅

Uses APEX's standard **Navigation Menu** shared component (not a hand-rolled menu), one entry per page above, in this order:

```
Dashboard              -> Page 100  (icon: fa-tachometer-alt)
Leads
  ├─ All Leads         -> Page 200  (icon: fa-users)
  ├─ Demo Requests     -> Page 300  (icon: fa-calendar-check)
  └─ Follow-ups        -> Page 400  (icon: fa-bell)
Catalog
  └─ Categories & Services -> Page 500 (icon: fa-th-large)
Reports                -> Page 600  (icon: fa-chart-bar)
Admin Users            -> Page 700  (icon: fa-user-shield, visible only when Authorization Scheme "Is Super Admin" evaluates TRUE)
My Profile             -> Page 800  (icon: fa-user-circle)
```

Breadcrumbs (`Shared Components → Breadcrumbs → Admin Breadcrumb`) mirror
the same tree, e.g. Page 210 (Lead Detail) breadcrumbs as
`Dashboard > All Leads > Lead Detail`.

---

## 2. Authentication Flow ✅ / 🔧

**✅ Verified design** — the auth model, not the APEX metadata:

CoreStone already has a working JWT-based auth system for the FastAPI
API (`backend/app/services/auth_service.py`, `ADMIN_USERS` +
`ADMIN_REFRESH_TOKENS` tables). The APEX admin portal reuses the **same**
`ADMIN_USERS` table and the **same** bcrypt password hashes — an admin's
password works identically whether they log into the API-driven
frontend tooling or directly into APEX. APEX does not natively verify
bcrypt hashes, so a small PL/SQL wrapper bridges the two:

```sql
-- apex/sql/apex_auth_wrapper.sql (companion to this spec — see §7)
CREATE OR REPLACE FUNCTION APEX_VERIFY_ADMIN_LOGIN(
    p_email    IN VARCHAR2,
    p_password IN VARCHAR2
) RETURN BOOLEAN
IS
    v_hashed_password ADMIN_USERS.HASHED_PASSWORD%TYPE;
    v_is_active       ADMIN_USERS.IS_ACTIVE%TYPE;
BEGIN
    SELECT HASHED_PASSWORD, IS_ACTIVE
    INTO v_hashed_password, v_is_active
    FROM ADMIN_USERS
    WHERE EMAIL = LOWER(p_email);

    IF v_is_active != 1 THEN
        RETURN FALSE;
    END IF;

    -- bcrypt verification cannot be done in pure PL/SQL (Oracle has no
    -- built-in bcrypt primitive) — this calls APEX_VERIFY_VIA_BACKEND,
    -- which POSTs to the backend and runs the exact same
    -- bcrypt.checkpw() the rest of the system uses, keeping
    -- password-verification logic in exactly one place
    -- (backend/app/core/security.py) instead of reimplementing bcrypt
    -- in PL/SQL.
    RETURN APEX_VERIFY_VIA_BACKEND(p_email, p_password);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN FALSE;
END APEX_VERIFY_ADMIN_LOGIN;
/
```

> **Important honesty note:** `APEX_VERIFY_VIA_BACKEND` calls a
> `POST /api/v1/auth/verify` endpoint that **does not exist yet** in the
> Module 7 backend — `auth.py` currently only has `/login`, `/refresh`,
> `/logout`, `/me` (all issuing/consuming JWTs, meant for the React
> frontend). This spec is *recommending* one small addition: an
> internal-only endpoint that takes an email+password and returns a bare
> boolean, callable only from the Oracle APEX host's IP (enforced at the
> network/firewall level, not just in application code) — never exposed
> publicly. I have not implemented that endpoint in this turn; flagging
> it here rather than silently assuming it exists. The alternative,
> simpler design is to give APEX admins a **separate** password
> (maintained only in APEX's own authentication, not reusing
> `ADMIN_USERS.HASHED_PASSWORD` at all) — less elegant, but zero new
> backend surface area. Which trade-off you prefer is a product decision,
> not something I should silently pick.

**🔧 Workspace-dependent**: wiring this function into APEX's
**Authentication Scheme → Custom → PL/SQL Function returning
VARCHAR2 (or boolean)**, testing the `APEX_WEB_SERVICE` call against a
real running backend instance, and confirming session cookie behavior —
all require an actual APEX workspace and a reachable backend to test
against, which don't exist in this sandbox. The design is real and
buildable; the click-through wiring in Application Builder is not
something I can execute here.

**Session timeout**: 8 hours idle (matches `ACCESS_TOKEN_EXPIRE_MINUTES`
in `backend/app/core/config.py` for consistency), configured under
**Shared Components → Security Attributes → Session → Maximum Session
Idle Time**.

---

## 3. Authorization Schemes ✅

Three schemes, matching `AdminRole` in `backend/app/models/admin.py`
exactly:

| Scheme Name | PL/SQL Expression | Applies To |
|---|---|---|
| `Is Super Admin` | `RETURN (SELECT ROLE FROM ADMIN_USERS WHERE EMAIL = :APP_USER) = 'super_admin';` | Page 700 (Admin Users), delete buttons on Page 500 |
| `Is Sales Manager Or Above` | `RETURN (SELECT ROLE FROM ADMIN_USERS WHERE EMAIL = :APP_USER) IN ('super_admin', 'sales_manager');` | Status-change buttons on Page 200/210, all of Page 600 (Reports) |
| `Is Authenticated Admin` | `RETURN (SELECT COUNT(*) FROM ADMIN_USERS WHERE EMAIL = :APP_USER AND IS_ACTIVE = 1) = 1;` | Default scheme on every page (page-level Authorization) |

These map 1:1 to the `require_roles(...)` dependency in
`backend/app/api/deps.py` — an admin who can't hit a given FastAPI
endpoint can't see the equivalent APEX region either, by design.

---

## 4. Shared Components ✅

| Component | Details |
|---|---|
| **LOVs** | See §5 below — 6 shared LOVs, all backed by static lists mirroring the Python enums (not dynamic queries, since these values change only when the enum itself changes) |
| **List** — "Quick Stats" | Small reusable list region (4 items) used on Page 100 and Page 600: Total Leads, New This Month, Pending Follow-ups, Conversion Rate — each item's value comes from `CORESTONE_LEAD_PKG.GET_LEAD_COUNT` / `GET_CONVERSION_RATE` |
| **Template** — "CoreStone Card" | Custom region template: navy header bar (`#10306F`), orange accent border-left (`#F9640F`), matches the frontend's `Card` component visually |
| **Static Content** — Brand header | Logo + "CoreStone Admin Portal" wordmark, shown in the application logo slot |
| **Breadcrumb** — "Admin Breadcrumb" | See §1.2 |

---

## 5. Lists of Values (LOVs) ✅

All six are **Shared Component → List of Values → Static**, so they
never drift from the Python enums without a deliberate edit to both
places:

```
LOV: LEAD_STATUS_LOV
  new              -> New
  contacted        -> Contacted
  qualified        -> Qualified
  demo_scheduled   -> Demo Scheduled
  converted        -> Converted
  lost             -> Lost

LOV: LEAD_SOURCE_LOV
  contact_form     -> Contact Form
  demo_request     -> Demo Request

LOV: DEMO_MODE_LOV
  online           -> Online (Video Call)
  in_person        -> In-Person Visit
  phone_call       -> Phone Call

LOV: FOLLOWUP_STATUS_LOV
  pending          -> Pending
  done             -> Done
  cancelled        -> Cancelled

LOV: ADMIN_ROLE_LOV
  super_admin      -> Super Admin
  sales_manager    -> Sales Manager
  support_agent    -> Support Agent

LOV: LANGUAGE_LOV
  en               -> English
  ta               -> தமிழ் (Tamil)
```

One dynamic LOV, since its values come from real data rather than a
fixed enum:

```sql
-- LOV: INDUSTRY_LOV (dynamic)
SELECT NAME AS display_value, SLUG AS return_value
FROM BUSINESS_CATEGORIES
WHERE IS_ACTIVE = 1
ORDER BY NAME
```

---

## 6. Bilingual Support in APEX ✅ / 🔧

**✅ Verified design**: APEX has built-in application-level translation
(distinct from the frontend's custom `i18n/` system) via **Shared
Components → Translate Application**. The workflow: export a "Seed
Translation Document" (a spreadsheet-like `.xliff`), fill in the Tamil
column for every static label/button/message APEX generated from this
spec, re-import it, then map `ta` as the app's secondary language via
`APEX_LANG` cookie/preference — mirroring the same `en`/`ta` toggle
pattern the public site uses (Local Storage there, an APEX preference
here, same UX intent). Every dynamic value pulled from
`CUSTOMER_LEADS.PREFERRED_LANGUAGE` (§8, Page 200/210) is additionally
shown as a badge so admin staff always know which language a customer
used — that data flows from Oracle regardless of which language the
*admin's own* APEX session is in.

**🔧 Workspace-dependent**: actually running the Translate Application
wizard, producing the seed `.xliff`, and filling in Tamil translations
for every auto-generated label requires the real Application Builder
instance — I can specify *which* labels need translation (every item
below) but can't generate APEX's internal translation repository rows
without it existing first.

---

## 7. Companion SQL — `apex/sql/apex_auth_wrapper.sql` 🔧

This file is referenced in §2 but is deliberately **not** included as a
working script in this delivery: it depends on the recommended-but-not-
yet-built `/api/v1/auth/verify` endpoint (see the honesty note in §2).
Once that backend endpoint exists, the wrapper is a straightforward
`APEX_WEB_SERVICE.MAKE_REST_REQUEST` call — happy to generate it in a
follow-up once you've decided which auth trade-off (§2) you want.

---

## 8. Page-by-Page Specifications ✅

Every SQL statement below runs directly against the views/functions/
procedures already created in `oracle/views.sql`, `oracle/functions.sql`,
`oracle/packages.sql` — nothing here invents a new database object.

### Page 1 — Sign In

| Field | Detail |
|---|---|
| **Page Type** | Login page (APEX built-in Login Page template) |
| **Purpose** | Authenticate an admin against `ADMIN_USERS` |
| **Regions** | "Login" region (built-in: Username, Password, Sign In button) |
| **Items** | `P1_USERNAME`, `P1_PASSWORD` (both built-in login items) |
| **Buttons** | `Sign In` (submits to the Custom Authentication Scheme, §2) |
| **Processes** | None (authentication itself is the "process") |
| **Dynamic Actions** | Client-side validation: both fields required before submit enabled |
| **Authorization** | None (public) |
| **Navigation** | On success → Page 100. On failure → same page, `Invalid email or password.` (English) / `தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்.` (Tamil) inline error |
| **Data Source** | `ADMIN_USERS` (via the Custom Authentication Scheme, §2) |
| **Validation** | Both fields NOT NULL (client-side); actual credential check server-side only |

### Page 100 — Dashboard

| Field | Detail |
|---|---|
| **Purpose** | Landing page after login — the KPI overview the client's SRS calls "Business Reports / Analytics dashboards" |
| **Components** | 4 "Quick Stats" cards (shared component, §4), 3 charts, 1 recent-activity IR |
| **Regions** | R1 "Quick Stats" (List), R2 "Leads This Month" (Bar Chart), R3 "Leads by Industry" (Pie Chart), R4 "Recent Leads" (Interactive Report, read-only, top 10) |
| **Items** | `P100_LANGUAGE_FILTER` (Select List, LOV = `LANGUAGE_LOV` + "All", default "All") — filters every region on this page |
| **Buttons** | None (dashboard is read-only) |
| **Processes** | Page Load process: refresh `P100_LANGUAGE_FILTER`-dependent regions |
| **Dynamic Actions** | `On Change` of `P100_LANGUAGE_FILTER` → Refresh R1–R4 (no page reload) |
| **Authorization** | `Is Authenticated Admin` |
| **Navigation** | Card R1 items link to Page 200 pre-filtered by status; R4 rows link to Page 210 |
| **Data Source / Associated SQL** | R1: `CORESTONE_LEAD_PKG.GET_LEAD_COUNT`, `GET_CONVERSION_RATE`; R2: `SELECT LEAD_MONTH, TOTAL_LEADS FROM V_MONTHLY_LEADS FETCH FIRST 12 ROWS ONLY`; R3: `SELECT INDUSTRY, TOTAL_DEMO_REQUESTS FROM V_LEADS_BY_INDUSTRY`; R4: `SELECT * FROM V_LEAD_DASHBOARD ORDER BY CREATED_AT DESC FETCH FIRST 10 ROWS ONLY` |
| **Validation** | N/A (read-only page) |

### Page 200 — Lead Management

| Field | Detail |
|---|---|
| **Purpose** | Primary working screen — browse, search, filter, and bulk-update every lead |
| **Components** | 1 Interactive Grid, toolbar search, column filters |
| **Regions** | R1 "All Leads" (Interactive Grid, editable: `STATUS` column only — everything else read-only in-grid, full edit happens on Page 210) |
| **Items** | `P200_STATUS_FILTER` (Select List, LOV `LEAD_STATUS_LOV` + "All"), `P200_SOURCE_FILTER` (Select List, LOV `LEAD_SOURCE_LOV` + "All"), `P200_LANGUAGE_FILTER` (Select List, LOV `LANGUAGE_LOV` + "All") |
| **Buttons** | `View Detail` (per-row, opens Page 210 as a modal), `Add Follow-up` (per-row, opens Page 210 to the Follow-ups tab) |
| **Processes** | IG DML process (Automatic Row Processing (DML), restricted to updating `STATUS` only via a column-level Read Only condition on every other column) |
| **Dynamic Actions** | `On Change` of any filter item → Refresh R1; `Before Row Update` validation on `STATUS` column: reject transition from `converted`/`lost` back to `new` (business rule — a closed lead shouldn't silently reopen from a stray grid edit) |
| **Authorization** | `Is Authenticated Admin` (view); status-change column additionally requires `Is Sales Manager Or Above` |
| **Navigation** | Row click / `View Detail` → Page 210, passing `P210_LEAD_ID` |
| **Data Source** | `SELECT * FROM V_LEAD_DASHBOARD WHERE (:P200_STATUS_FILTER = 'ALL' OR STATUS = :P200_STATUS_FILTER) AND (:P200_SOURCE_FILTER = 'ALL' OR SOURCE = :P200_SOURCE_FILTER) AND (:P200_LANGUAGE_FILTER = 'ALL' OR PREFERRED_LANGUAGE = :P200_LANGUAGE_FILTER)` |
| **Validation** | Status-transition rule above; `STATUS` value itself constrained to `LEAD_STATUS_LOV` (grid column type = Select List) |

### Page 210 — Lead Detail (modal form)

| Field | Detail |
|---|---|
| **Purpose** | Full detail of one lead: contact info, demo-request fields (if any), follow-up history, WhatsApp message history — everything `V_LEAD_DASHBOARD` doesn't show inline |
| **Components** | Form region + 2 sub-regions (tabs: "Follow-ups", "WhatsApp History") |
| **Regions** | R1 "Lead Info" (Form, based on `CUSTOMER_LEADS`), R2 "Demo Request Details" (Form, based on `DEMO_REQUESTS`, conditionally rendered only when `SOURCE = 'demo_request'`), R3 "Follow-ups" (Interactive Grid, `LEAD_FOLLOWUPS` filtered by lead), R4 "WhatsApp History" (Interactive Report, read-only, `WHATSAPP_MESSAGES` filtered by lead, newest first) |
| **Items** | `P210_LEAD_ID` (hidden, primary key passed from Page 200), `P210_LEAD_ID_DISPLAY` (Display Only — the human `LEAD_ID`, e.g. `CS-202607-A1B2C3`), `P210_PREFERRED_LANGUAGE` (Display Only badge, shows "English" or "தமிழ்" per §6) |
| **Buttons** | `Save` (R1), `Add Follow-up` (opens inline row in R3), `Update Status` (Select List + Apply, calls `CORESTONE_LEAD_PKG.UPDATE_LEAD_STATUS`) |
| **Processes** | `Fetch Row` (Page Load, R1+R2), `Save` process calls a standard Automatic Row Processing (DML) on R1 — **not** direct table DML from APEX for anything beyond the editable fields (`STATUS`, admin-editable notes), keeping business-rule-bearing writes (new leads, new demo requests) exclusively in `CORESTONE_LEAD_PKG` / the FastAPI app, never duplicated in an APEX process |
| **Dynamic Actions** | `Add Follow-up` click → Show inline create row in R3, calling `CORESTONE_LEAD_PKG.ADD_FOLLOWUP` on submit; `Update Status` click → confirm dialog ("Change status to {selected}?") → PL/SQL Dynamic Action calling `CORESTONE_LEAD_PKG.UPDATE_LEAD_STATUS(:P210_LEAD_ID_DISPLAY, :P210_NEW_STATUS)` → Refresh R1 |
| **Authorization** | `Is Authenticated Admin` (view); `Update Status` button additionally requires `Is Sales Manager Or Above`; `Add Follow-up` available to any authenticated admin |
| **Navigation** | Modal dialog over Page 200; closing returns to Page 200 with R1 refreshed |
| **Data Source** | R1: `SELECT * FROM CUSTOMER_LEADS WHERE LEAD_ID = :P210_LEAD_ID_DISPLAY`; R2: `SELECT * FROM DEMO_REQUESTS WHERE LEAD_ID = (SELECT ID FROM CUSTOMER_LEADS WHERE LEAD_ID = :P210_LEAD_ID_DISPLAY)`; R3: `SELECT * FROM LEAD_FOLLOWUPS WHERE LEAD_ID = (...) ORDER BY FOLLOW_UP_DATE DESC`; R4: `SELECT DIRECTION, MESSAGE_TEXT, LANGUAGE_CODE, CREATED_AT FROM WHATSAPP_MESSAGES WHERE LEAD_ID = (...) ORDER BY CREATED_AT DESC` |
| **Validation** | Follow-up `NOTE` required, `FOLLOW_UP_DATE` required and not in the past (matches the same rule the frontend's Request Demo form applies to its own date field, for UI consistency) |

### Page 300 — Demo Requests

| Field | Detail |
|---|---|
| **Purpose** | Demo-specific working view — scheduling fields front and center, matching the SRS "Demo Management" / "Manage demo scheduling" requirement |
| **Components** | 1 Interactive Report (demo requests are viewed/scheduled here; status changes still happen via Page 210 to keep that logic in one place) |
| **Regions** | R1 "Demo Requests" (Interactive Report) |
| **Items** | `P300_DEMO_MODE_FILTER` (Select List, LOV `DEMO_MODE_LOV` + "All"), `P300_DATE_FROM`, `P300_DATE_TO` (Date Pickers, filter on `PREFERRED_DEMO_DATE`) |
| **Buttons** | `View Lead` (per row → Page 210) |
| **Processes** | None (read-only page; edits happen on Page 210) |
| **Dynamic Actions** | `On Change` of any filter → Refresh R1 |
| **Authorization** | `Is Authenticated Admin` |
| **Navigation** | Row click → Page 210 |
| **Data Source** | `SELECT * FROM V_DEMO_REQUESTS_DETAIL WHERE (:P300_DEMO_MODE_FILTER = 'ALL' OR DEMO_MODE = :P300_DEMO_MODE_FILTER) AND (:P300_DATE_FROM IS NULL OR PREFERRED_DEMO_DATE >= :P300_DATE_FROM) AND (:P300_DATE_TO IS NULL OR PREFERRED_DEMO_DATE <= :P300_DATE_TO)` |
| **Validation** | Date-range: `P300_DATE_TO >= P300_DATE_FROM` when both set (client-side) |

### Page 400 — Follow-up Tracker

| Field | Detail |
|---|---|
| **Purpose** | Cross-lead view of every follow-up task — "what do I need to do today across all my leads," rather than per-lead (Page 210 shows follow-ups scoped to one lead) |
| **Components** | 1 Interactive Grid |
| **Regions** | R1 "Follow-ups" (Interactive Grid, editable `STATUS` column) |
| **Items** | `P400_STATUS_FILTER` (Select List, LOV `FOLLOWUP_STATUS_LOV` + "All", default "pending"), `P400_OVERDUE_ONLY` (Checkbox) |
| **Buttons** | `View Lead` (per row → Page 210) |
| **Processes** | IG DML process (Automatic Row Processing (DML), `STATUS` column only) |
| **Dynamic Actions** | `On Change` of filters → Refresh R1 |
| **Authorization** | `Is Authenticated Admin` |
| **Navigation** | Row click → Page 210 |
| **Data Source** | `SELECT LF.*, CL.LEAD_ID AS DISPLAY_LEAD_ID, CL.FULL_NAME FROM LEAD_FOLLOWUPS LF JOIN CUSTOMER_LEADS CL ON CL.ID = LF.LEAD_ID WHERE (:P400_STATUS_FILTER = 'ALL' OR LF.STATUS = :P400_STATUS_FILTER) AND (:P400_OVERDUE_ONLY = 'N' OR (LF.FOLLOW_UP_DATE < TRUNC(SYSDATE) AND LF.STATUS = 'pending'))` — conceptually the row-level detail behind `V_FOLLOWUP_STATUS`'s aggregate counts |
| **Validation** | `STATUS` constrained to `FOLLOWUP_STATUS_LOV` (grid column type) |

### Page 500 — Business Categories & Services

| Field | Detail |
|---|---|
| **Purpose** | Manage the Industries (`BUSINESS_CATEGORIES`) and Solutions (`SERVICES`) catalog that both the public site's content and `INDUSTRY_LOV` (§5) draw from |
| **Components** | 2 Interactive Grids (master-detail: Categories → Services) |
| **Regions** | R1 "Business Categories" (IG), R2 "Services" (IG, filtered by selected R1 row via a Page Item) |
| **Items** | `P500_SELECTED_CATEGORY_ID` (hidden, set by R1 row selection) |
| **Buttons** | `Add Category`, `Add Service` (both built into IG add-row) |
| **Processes** | IG DML on both regions |
| **Dynamic Actions** | R1 `Selection Change` → set `P500_SELECTED_CATEGORY_ID` → Refresh R2 |
| **Authorization** | `Is Authenticated Admin` (view/add/edit); row **delete** additionally requires `Is Super Admin` (deleting a category/service the public site links to is destructive — gated to the highest role) |
| **Navigation** | None (self-contained page) |
| **Data Source** | R1: `SELECT * FROM BUSINESS_CATEGORIES ORDER BY NAME`; R2: `SELECT * FROM SERVICES WHERE CATEGORY_ID = :P500_SELECTED_CATEGORY_ID OR :P500_SELECTED_CATEGORY_ID IS NULL ORDER BY NAME` |
| **Validation** | `SLUG` required + unique (matches `UQ_BUSINESS_CATEGORIES_SLUG` / `UQ_SERVICES_SLUG` — APEX validation mirrors the DB constraint so the error surfaces inline instead of as a raw ORA- error) |

### Page 600 — Reports

| Field | Detail |
|---|---|
| **Purpose** | Every report named in the SRS "REPORTS" section, as one tabbed dashboard rather than 7 separate pages |
| **Components** | Tab set (one tab per report), each tab = 1 chart + 1 IR pair |
| **Regions** | Tab 1 "Monthly Leads" (`V_MONTHLY_LEADS`), Tab 2 "Leads by Industry" (`V_LEADS_BY_INDUSTRY`), Tab 3 "Lead Sources" (`V_LEAD_SOURCES`), Tab 4 "Lead Conversion" (`V_LEAD_CONVERSION`), Tab 5 "Business Category Analytics" (`V_BUSINESS_CATEGORY_ANALYTICS`), Tab 6 "Follow-up Status" (`V_FOLLOWUP_STATUS`), Tab 7 "Language Breakdown" (`V_LEAD_LANGUAGE_BREAKDOWN`) — this last tab is the bilingual-reporting requirement made concrete |
| **Items** | `P600_YEAR_FILTER` (Select List, distinct years from `CUSTOMER_LEADS.CREATED_AT`) — applies to Tabs 1 and 4 |
| **Buttons** | `Export to CSV` (built-in IR download, one per tab) |
| **Processes** | None (entirely read-only reporting page) |
| **Dynamic Actions** | Tab change → lazy-load that tab's region (APEX's native "Lazy Loading" region property, not a custom DA) |
| **Authorization** | `Is Sales Manager Or Above` (reports are commercially sensitive — support agents don't get this page) |
| **Navigation** | None |
| **Data Source** | Each tab's region source is exactly the view named above — `SELECT * FROM V_<name>` |
| **Validation** | N/A (read-only) |

### Page 700 — Admin Users

| Field | Detail |
|---|---|
| **Purpose** | Manage admin accounts and roles — the RBAC administration surface |
| **Components** | 1 Interactive Grid |
| **Regions** | R1 "Admin Users" (IG, `HASHED_PASSWORD` column excluded entirely from the grid — never displayed or editable in APEX; password resets go through `create_admin.py` or a future "Reset Password" button that calls a dedicated backend endpoint, never through direct APEX DML on that column) |
| **Items** | None beyond the grid |
| **Buttons** | `Add Admin` (IG add-row: `FULL_NAME`, `EMAIL`, `ROLE` only — the new admin's password is set via `create_admin.py`, same reasoning as `sample_data.sql` in Module 8: no password ever gets typed into or generated by this page) |
| **Processes** | IG DML restricted to `FULL_NAME`, `EMAIL`, `ROLE`, `IS_ACTIVE` |
| **Dynamic Actions** | None |
| **Authorization** | `Is Super Admin` (entire page) |
| **Navigation** | None |
| **Data Source** | `SELECT ID, FULL_NAME, EMAIL, ROLE, IS_ACTIVE, CREATED_AT FROM ADMIN_USERS ORDER BY FULL_NAME` |
| **Validation** | `EMAIL` required + unique (mirrors `UQ_ADMIN_USERS_EMAIL`); `ROLE` constrained to `ADMIN_ROLE_LOV` |

### Page 800 — My Profile

| Field | Detail |
|---|---|
| **Purpose** | Every admin's own profile — name, and a password-change flow |
| **Components** | 1 Form region |
| **Regions** | R1 "My Profile" (`FULL_NAME` editable; `EMAIL`, `ROLE` display-only) |
| **Items** | `P800_CURRENT_PASSWORD`, `P800_NEW_PASSWORD`, `P800_CONFIRM_PASSWORD` (all Password item type) |
| **Buttons** | `Save Profile`, `Change Password` |
| **Processes** | `Save Profile`: standard DML on `FULL_NAME` only. `Change Password`: PL/SQL process that — per the same reasoning as Page 700 — does **not** hash the password inside APEX; it calls the same recommended `/api/v1/auth/*`-style backend endpoint pattern from §2/§7, so bcrypt hashing happens in exactly one codebase (`backend/app/core/security.py`), never reimplemented in PL/SQL |
| **Dynamic Actions** | Client-side: `P800_NEW_PASSWORD` must equal `P800_CONFIRM_PASSWORD` before `Change Password` is enabled |
| **Authorization** | `Is Authenticated Admin` (every admin can only ever see/edit their own row — session's `:APP_USER` is the implicit filter, never a page item an admin could tamper with) |
| **Navigation** | None |
| **Data Source** | `SELECT * FROM ADMIN_USERS WHERE EMAIL = :APP_USER` |
| **Validation** | New password ≥ 12 characters (matches `create_admin.py`'s own rule, kept consistent); confirm-password match |

### Page 9999 — Page Not Found

Standard APEX error-page template, styled with the CoreStone Card
template (§4). No custom logic.

---

## 9. Summary — What's Actually Verified vs. What Needs a Workspace

| Deliverable | Status |
|---|---|
| Every SQL statement in §8 (region sources, LOV queries) | ✅ Verified — cross-checked programmatically against `oracle/views.sql`/`packages.sql`; every object referenced exists |
| Page structure, navigation tree, breadcrumbs, authorization scheme logic | ✅ Verified — complete, internally consistent design, directly buildable |
| RBAC mapping (page/button-level authorization ↔ `AdminRole`) | ✅ Verified — 1:1 with `backend/app/api/deps.py`'s `require_roles(...)` |
| LOV value lists | ✅ Verified — mirror the Python enums exactly (cross-checked against `backend/app/models/lead.py` / `admin.py`) |
| Actual APEX application export (`f<app_id>.sql`) | 🔧 Not generated — would require a real APEX workspace to produce and validate; fabricating one would risk shipping a file that looks official but has never actually been imported/tested by APEX |
| `APEX_VERIFY_ADMIN_LOGIN` / `apex_auth_wrapper.sql` | 🔧 Design only — depends on a recommended-but-not-yet-built backend endpoint (§2/§7); a product decision on the auth trade-off is needed before this gets implemented |
| Application Translation (`.xliff` seed + Tamil fill-in) | 🔧 Not generated — requires the real Translate Application wizard in Application Builder |
| Rendered look-and-feel, click-through testing, exact page-item internal IDs | 🔧 Only assignable by the APEX engine itself when the pages are actually built |

**Bottom line:** an APEX developer can build this application directly
from §1–§8 without guessing at data sources, authorization, or business
rules — every piece that depends on *this database and this backend* is
real and verified. The pieces that are inherently APEX-workspace-only
(the generated export file, the translation repository, exact rendering)
are explicitly called out rather than faked.
