# CoreStone Technologies — RUN_PROJECT.md

A complete, assume-nothing guide to installing, running, testing, and
deploying this project. If you've never touched this codebase before,
start here.

---

## 1. Software Requirements

| Requirement | Version | Notes |
|---|---|---|
| Operating System | Linux, macOS, or Windows 10/11 (WSL2 recommended on Windows) | Everything below assumes a bash-compatible shell |
| Python | 3.12+ | Backend runtime |
| Node.js | 20 LTS or 22 LTS | Frontend build tooling |
| npm | 10+ (ships with Node 20/22) | |
| Oracle Database | 19c, 21c, or 23ai | XE (free), on-prem, or Autonomous Database (ATP/ADW) all supported. **No other database works** — see `oracle/README.md` |
| Oracle APEX | 22.2+ | Only needed for the admin portal (Module 9); the public site + API work without it |
| Git | 2.30+ | |
| Docker | 24+ (optional) | Only needed for the containerized deployment path (§7). Install from https://docs.docker.com/get-docker/ — Docker Desktop on macOS/Windows, Docker Engine + Compose plugin on Linux. Verify with `docker --version` and `docker compose version` |
| Browser | Current Chrome, Firefox, Safari, or Edge | Modern CSS (Tailwind v4 `@theme`) and ES2020+ JS |

---

## 2. Project Installation

### 2.1 Getting the code

```bash
git clone <your-repository-url> CoreStone-Technologies
cd CoreStone-Technologies
# or, if you received a ZIP:
unzip CoreStone-Technologies.zip && cd CoreStone-Technologies
```

### 2.2 Folder structure

```
CoreStone-Technologies/
├── frontend/           React 19 + Vite + Tailwind v4 — the public site
├── backend/             FastAPI + SQLAlchemy + Oracle — the API
├── oracle/               Oracle DDL, PL/SQL, sample data (Module 8)
├── apex/                 Oracle APEX admin-portal specification (Module 9)
├── docker/               Dockerfiles + nginx config
├── docs/                 Architecture/API/database/security documentation
├── scripts/              One-off operational scripts
├── .github/workflows/    CI (GitHub Actions)
├── docker-compose.yml    Frontend + backend orchestration (Oracle is external)
└── RUN_PROJECT.md        This file
```

### 2.3 Install frontend packages

```bash
cd frontend
npm install
```

### 2.4 Install backend packages

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2.5 Oracle client requirements

No Oracle Instant Client install is required — `python-oracledb` runs in
**thin mode** by default (pure Python, no separate Oracle Client binary).
You only need a *reachable* Oracle Database; see §4.

---

## 3. Environment Variables

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

**Never commit a real `.env` file** — both are already in their
respective `.gitignore`.

### 3.1 Frontend (`frontend/.env`)

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Base URL the frontend calls, e.g. `http://localhost:8000/api/v1` in dev |
| `VITE_WHATSAPP_NUMBER` | WhatsApp click-to-chat number (digits only, country code, no `+`) |
| `VITE_CONTACT_EMAIL` / `VITE_CONTACT_PHONE` | Shown on the Contact page |
| `VITE_GOOGLE_MAPS_EMBED_SRC` | Optional Google Maps embed URL — leave blank for the honest "not configured" placeholder |
| `VITE_GA_MEASUREMENT_ID` | Optional Google Analytics ID — leave blank to disable analytics |

### 3.2 Backend (`backend/.env`)

| Variable | Purpose |
|---|---|
| `PROJECT_NAME` | Shown in Swagger UI and API root response |
| `ENVIRONMENT` | `development` \| `staging` \| `production` |
| `DEBUG` | `true`/`false` — `false` in production |
| `BACKEND_CORS_ORIGINS_RAW` | Comma-separated allowed frontend origins |
| `SECRET_KEY` | Signs JWTs — must be a long random value in production: `python -c "import secrets; print(secrets.token_urlsafe(64))"` |
| `ALGORITHM` | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT lifetime, default 480 (8 hours) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Refresh-token lifetime, default 30 |
| `ORACLE_USER` / `ORACLE_PASSWORD` / `ORACLE_DSN` | The schema from `oracle/installation.sql` and its connect string |
| `ORACLE_POOL_MIN` / `ORACLE_POOL_MAX` | SQLAlchemy pool sizing |
| `WHATSAPP_BUSINESS_NUMBER` | Server-side copy of the WhatsApp number |
| `ADMIN_DEFAULT_EMAIL` | Informational only — does **not** create an account by itself, see §5 |
| `LOG_LEVEL` | `DEBUG` \| `INFO` \| `WARNING` \| `ERROR` |

> **On JWT secret naming:** this project uses a single `SECRET_KEY` for
> signing, not separate `JWT_SECRET`/`JWT_REFRESH_SECRET` values — refresh
> tokens here are **opaque random strings, hashed and stored in
> `ADMIN_REFRESH_TOKENS`**, not JWTs (see `backend/app/core/security.py`),
> so there's nothing for a second secret to sign.

---

## 4. Oracle Database Setup

```bash
cd oracle

# 1. As a DBA-privileged user, create the schema/user
sqlplus system/<dba_password>@<connect_string> @installation.sql

# 2. As the newly created CORESTONE_APP user, build every object
sqlplus CORESTONE_APP/"<password>"@<connect_string> @schema.sql

# 3. (Optional, recommended for dev/staging) seed sample data
sqlplus CORESTONE_APP/"<password>"@<connect_string> @sample_data.sql
```

### Verifying the install

```sql
-- Tables (expect 9 rows)
SELECT table_name FROM user_tables ORDER BY table_name;

-- Views (expect 9 rows)
SELECT view_name FROM user_views ORDER BY view_name;

-- Procedures/Functions/Packages (expect PR_*, PRC_*, FN_*, CORESTONE_LEAD_PKG)
SELECT object_name, object_type, status FROM user_objects
WHERE object_type IN ('PROCEDURE', 'FUNCTION', 'PACKAGE', 'PACKAGE BODY')
ORDER BY object_type, object_name;

-- Triggers (expect 10 rows — 1 lead_id backstop + 9 updated_at triggers)
SELECT trigger_name, status FROM user_triggers ORDER BY trigger_name;

-- Sample data (if you ran sample_data.sql)
SELECT COUNT(*) FROM BUSINESS_CATEGORIES;  -- expect 16
SELECT COUNT(*) FROM SERVICES;             -- expect 9
SELECT COUNT(*) FROM CUSTOMER_LEADS;       -- expect 4
```

Any `INVALID` status in the objects query means a compilation error —
run `SHOW ERRORS PROCEDURE <name>;` (or `FUNCTION`/`PACKAGE BODY`) to see
exactly which line failed.

---

## 5. Backend Commands

```bash
cd backend
python3 -m venv venv
source venv/bin/activate                       # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env                            # then edit .env, see §3.2

# Run the dev server
uvicorn app.main:app --reload --port 8000

# Create the first admin login (interactive password prompt)
python -m app.scripts.create_admin --email you@corestonetech.com --name "Fernandes"
```

### Verifying the API

| What | How |
|---|---|
| Swagger UI | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |
| Health check | `curl http://localhost:8000/api/v1/health` → `{"success":true,"status":"ok",...}` |
| JWT login | `curl -X POST http://localhost:8000/api/v1/auth/login -H "Content-Type: application/json" -d '{"email":"you@corestonetech.com","password":"<your password>"}'` → returns `access_token` + `refresh_token` |
| Refresh token | `curl -X POST http://localhost:8000/api/v1/auth/refresh -H "Content-Type: application/json" -d '{"refresh_token":"<token from login>"}'` → returns a new token pair |
| Lead creation | `curl -X POST http://localhost:8000/api/v1/leads -H "Content-Type: application/json" -d '{"full_name":"Test User","email":"test@example.com","phone":"9876543210","message":"Testing the API","preferred_language":"en"}'` |
| Demo request | See `docs/API_DOCUMENTATION.md` for the full payload shape (12 required fields) |

---

## 6. Frontend Commands

```bash
cd frontend
npm install
cp .env.example .env                            # then edit .env, see §3.1

npm run dev          # http://localhost:5173, hot reload
npm run build         # production build -> dist/
npm run preview       # serve the production build locally, http://localhost:4173
npm run lint          # oxlint — 0 warnings/errors expected on a clean checkout
```

---

## 7. Docker Commands

```bash
# Build both images
docker compose build

# Start everything in the background
docker compose up -d

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Stop (containers remain, can restart quickly)
docker compose stop

# Restart
docker compose restart

# Stop AND remove containers
docker compose down

# Remove containers AND named volumes (only matters if you enabled the
# optional oracle-xe dev service in docker-compose.yml)
docker compose down -v

# Rebuild from scratch (no layer cache)
docker compose build --no-cache
docker compose up -d --force-recreate
```

Oracle Database itself is never a `docker compose` service in
production (see the comment block in `docker-compose.yml`) — point
`backend/.env`'s `ORACLE_DSN` at your real Oracle instance.

### Shutting everything down

**Manual (non-Docker) dev servers:** `Ctrl+C` in each terminal running
`uvicorn` (backend) or `npm run dev`/`npm run preview` (frontend) stops
that process immediately. Deactivate the Python virtual environment
with `deactivate` when done.

**Docker:** `docker compose stop` pauses containers (fast restart with
`docker compose start`); `docker compose down` stops **and removes**
them (a fresh `docker compose up -d` recreates from the images, no
rebuild needed unless source changed). Neither touches Oracle — it's
external and always keeps running independently.

---

## 8. Oracle APEX Setup
`apex/APEX_DEPLOYMENT_GUIDE.md` (workspace setup, import/export between
environments) for the complete walkthrough. Summary:

1. Workspace Setup → create a workspace pointed at the `CORESTONE_APP`
   schema from `oracle/installation.sql`.
2. Application Creation → build the 10 pages per
   `APPLICATION_SPECIFICATION.md` §1.1 and §8.
3. Authentication → Custom scheme per §2 (requires a product decision on
   the bcrypt-bridge vs. separate-password trade-off first).
4. Authorization → the 3 schemes in §3, copy-paste ready.
5. Interactive Reports/Grids, Dashboard → region sources given verbatim
   in §8 per page.
6. Navigation → the menu tree in §1.2.
7. Deployment → export/import steps in `APEX_DEPLOYMENT_GUIDE.md` §5.

---

## 9. Complete Testing Guide

| Area | How to test |
|---|---|
| Homepage | `npm run dev`, visit `/` — hero, stats, solutions/industries previews, testimonials, FAQ all render; scroll-triggered animations fire once each |
| Solutions | Visit `/solutions` (grid of 9) and `/solutions/<any-slug>` (e.g. `/solutions/gst-billing`) — 404 page renders for a bad slug |
| Industries | Same pattern at `/industries` and `/industries/<slug>` (16 total) |
| Contact | Submit the form with an invalid email/phone — inline validation errors appear before any network call; submit valid data — either a success toast (backend reachable) or an error toast (backend unreachable), never a silent failure |
| Demo Request | Same validation pattern, all 12 fields; on success, redirects to `/request-demo/success` with a Lead ID and a "Continue on WhatsApp" button |
| WhatsApp | The floating button (bottom-left, every page) opens `wa.me/<number>` with a pre-filled generic message; the post-demo-request WhatsApp link includes the actual Lead ID and demo details, in whichever language (`en`/`ta`) was active at submission |
| Authentication | `POST /api/v1/auth/login` with valid/invalid credentials (200 vs 401); `GET /api/v1/auth/me` with/without a Bearer token (200 vs 401) |
| Admin | Once APEX is built (§8): log in, browse Lead Management, open a lead's detail, add a follow-up, change a status, confirm RBAC (a `support_agent` role can't reach Reports or Admin Users) |
| Reports | `SELECT * FROM V_MONTHLY_LEADS;` etc. directly in SQL, or via the APEX Reports page once built |
| Tamil Mode | Click "தமிழ்" in the navbar — every translated string switches instantly, no page reload; refresh the page — it stays in Tamil (Local Storage) |
| English Mode | Click "English" — switches back instantly |
| Language Persistence | Switch to Tamil, close the tab, reopen the site — still Tamil. Open DevTools → Application → Local Storage → confirm a `corestone_lang` key with value `ta` |
| Oracle Database | Run the verification queries in §4 |
| APIs | Use the Swagger UI (`/docs`) to exercise every endpoint interactively |

---

## 10. Deployment Guide

| Component | Recommended hosting | Notes |
|---|---|---|
| Frontend | Vercel, or the `docker/frontend.Dockerfile` image behind any static host / nginx | Set `VITE_API_BASE_URL` to the production API URL at build time |
| Backend | Render, an Oracle Cloud VM, or the `docker/backend.Dockerfile` image on any container host | Set every `backend/.env` variable as real platform environment variables, never a committed file |
| Oracle | Oracle Autonomous Database (ATP/ADW) for managed hosting, or an on-prem/Cloud VM instance | Run `oracle/installation.sql` then `oracle/schema.sql` once, `sample_data.sql` only in non-production |
| Domain mapping | Point your domain's A/CNAME record at the frontend host; a separate subdomain (e.g. `api.corestonetech.com`) at the backend host | Update `BACKEND_CORS_ORIGINS_RAW` to the real frontend domain, and `VITE_API_BASE_URL` to the real API domain |
| HTTPS | Both Vercel and Render provision TLS automatically; for a raw VM, use Let's Encrypt (`certbot`) in front of nginx | Never serve the admin portal or API over plain HTTP in production |
| Production environment | `ENVIRONMENT=production`, `DEBUG=false`, a real random `SECRET_KEY`, Oracle credentials pointed at the production schema | |

---

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `OracleConfigurationError` on any non-`/health` request | `ORACLE_USER`/`ORACLE_PASSWORD`/`ORACLE_DSN` missing or wrong in `backend/.env` | Fill in real values; this error message names exactly which variable is missing |
| `ModuleNotFoundError` on `uvicorn app.main:app` | Virtual env not activated, or `pip install -r requirements.txt` not run | `source venv/bin/activate` then reinstall |
| Port `8000` or `5173`/`4173` already in use | Another process bound to that port | `lsof -i :8000` (or the relevant port) to find and stop it, or run with `--port <other>` |
| CORS error in the browser console | Frontend origin not in `BACKEND_CORS_ORIGINS_RAW` | Add the exact origin (scheme + host + port) to that comma-separated list |
| `401 Unauthorized` on every admin request | Access token expired (8h default) or malformed `Authorization: Bearer <token>` header | Call `/api/v1/auth/refresh` with the refresh token, or log in again |
| `npm run build` fails | Stale `node_modules` after a dependency change | `rm -rf node_modules package-lock.json && npm install` |
| `ORA-00955: name is already used` when running `schema.sql` | Re-running the script against a schema that already has these objects | Either drop the objects first or skip re-running `tables.sql`/`constraints.sql` on an existing install |
| Docker build fails on `pip install` | No network access from the build environment, or a version pin conflict | Confirm the build host can reach PyPI; check `requirements.txt` for a version that's been yanked |
| Node version errors during `npm install` | Node < 20 | Upgrade to Node 20 or 22 LTS |
| Tamil text renders as boxes/tofu | System/browser missing a font with Tamil glyph coverage | Modern OSes and browsers ship Tamil-capable fonts by default; this only happens on a stripped-down Linux install missing `fonts-noto` or similar |

---

## 12. Verification Checklist

Before considering a deployment production-ready:

- [ ] `npm run build` succeeds with 0 errors
- [ ] `npm run lint` reports 0 warnings, 0 errors
- [ ] `ruff check app/` (backend) reports 0 issues
- [ ] Backend boots and `/api/v1/health` returns 200
- [ ] `oracle/schema.sql` ran with no `INVALID` objects (§4 verification queries)
- [ ] First admin created via `create_admin.py`, login flow tested end-to-end
- [ ] Contact form and Request Demo form both tested with real invalid AND valid input
- [ ] English ↔ Tamil switching tested on every page type (home, solutions, industries, contact, demo, 404)
- [ ] `SECRET_KEY` is a real random value, not the placeholder
- [ ] `DEBUG=false` in the production backend `.env`
- [ ] `BACKEND_CORS_ORIGINS_RAW` contains only real production origins
- [ ] HTTPS enforced on both frontend and backend
- [ ] Oracle credentials are for a real schema, not left blank


