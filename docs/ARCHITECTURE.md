# CoreStone Technologies — Architecture

## System Overview

```
┌─────────────────────┐      HTTPS/JSON       ┌──────────────────────┐
│   React Frontend     │ ───────────────────▶  │   FastAPI Backend     │
│   (Vite, Tailwind,    │ ◀───────────────────  │   (Repository/Service │
│   Framer Motion,      │                        │   layers, JWT+RBAC)   │
│   Three.js)            │                        └──────────┬───────────┘
└─────────────────────┘                                    │ SQLAlchemy
                                                              │ (oracledb, thin mode)
                                                              ▼
                                                   ┌──────────────────────┐
                                                   │   Oracle Database     │
                                                   │   (9 tables, views,   │
                                                   │   PL/SQL, triggers)   │
                                                   └──────────┬───────────┘
                                                              │
                                                              ▼
                                                   ┌──────────────────────┐
                                                   │  Oracle APEX Admin    │
                                                   │  Portal (Module 9)    │
                                                   └──────────────────────┘
```

The public website never talks to Oracle or Oracle APEX directly — it
only ever calls the FastAPI backend over HTTPS. Oracle APEX is a
**separate, admin-only** consumer of the same Oracle schema; it is not
rebuilt as part of the public site and does not sit in the public
request path.

---

## Frontend Architecture

```
frontend/src/
├── components/
│   ├── layout/      Navbar, Footer, MegaMenu, MobileMenu, WhatsAppButton, LanguageToggle
│   ├── ui/           Button, Card, Input, Select, Textarea, Modal, Toast, Badge, Heading
│   ├── motion/       Reveal, RevealGroup, AnimatedCounter, Marquee
│   └── sections/     HeroSection, PageHero, DetailBody, SampleDashboardPreview, ...
├── pages/
│   ├── Home.jsx, Contact.jsx, RequestDemo.jsx, DemoSuccess.jsx, NotFound.jsx
│   ├── solutions/    SolutionsIndex.jsx, SolutionDetail.jsx (data-driven, 1 route = 9 pages)
│   └── industries/   IndustriesIndex.jsx, IndustryDetail.jsx (data-driven, 1 route = 16 pages)
├── data/             site.js, solutionsContent.js, industriesContent.js, homeContent.js, formOptions.js
├── i18n/             LanguageProvider.jsx, useLanguage.js, translations/{en,ta}.js
└── lib/              api.js (axios), validation/ (Zod schemas), demoRequestService.js
```

**Design decisions worth knowing:**

- **Solutions and Industries are data-driven, not 25 separate page
  files.** One `SolutionDetail.jsx` / `IndustryDetail.jsx` component
  renders all 9/16 pages from `solutionsContent.js`/`industriesContent.js`
  — same real URLs and content, zero duplicated template code.
- **i18n is a runtime context, not a build-time locale split.** Switching
  language re-renders in place via React context (`LanguageProvider`),
  persisted to `localStorage`, with automatic English fallback for any
  missing Tamil key (never a blank string in production).
- **Three.js is lazy-loaded** (`HeroAccent.jsx`, dynamic `import()`) so
  its ~230KB doesn't load on pages that don't use it.
- **Forms use React Hook Form + Zod schema factories** (not static
  schemas) specifically so validation error messages can be
  re-translated the instant the language changes, without re-mounting
  the form.

---

## Backend Architecture

```
backend/app/
├── main.py                  FastAPI app, middleware, exception handlers
├── core/                    config.py, security.py (JWT+bcrypt), logging.py, exceptions.py
├── api/
│   ├── deps.py                RBAC dependencies (get_current_admin, require_roles)
│   └── v1/endpoints/         health.py, leads.py, demo_requests.py, auth.py
├── models/                   SQLAlchemy ORM — admin.py, catalog.py, lead.py, mixins.py
├── schemas/                  Pydantic — auth.py, lead.py
├── repositories/             DB access only — lead_repository.py, admin_repository.py, refresh_token_repository.py
├── services/                 Business logic — lead_service.py, auth_service.py
├── db/session.py             Lazy Oracle engine/session (see below)
└── scripts/create_admin.py  CLI bootstrap for the first admin account
```

**Layering rule, strictly enforced:** endpoints call services; services
call repositories; repositories are the only code that builds SQLAlchemy
queries. No endpoint ever imports a repository directly, and no
repository ever contains business rules (retry logic, validation beyond
"does this row exist") — that lives in the service layer.

**Why `db/session.py`'s engine creation is lazy:** `Base` (the
declarative base every model inherits from) is importable with zero
Oracle configuration — this lets Alembic, unit tests, and CI's import
sanity check all work without live Oracle credentials. The moment
anything calls `get_engine()` (which `get_db()` does, on the first
actual request that touches the database), missing configuration raises
a clear `OracleConfigurationError` instead of silently falling back to
another database. There is no fallback database — this is deliberate,
not an oversight (see `oracle/README.md`).

---

## Authentication & Authorization Flow

```
1. POST /auth/login (email, password)
       │
       ▼
2. AuthService verifies bcrypt hash, issues:
     - access_token   (JWT, short-lived, signed with SECRET_KEY)
     - refresh_token   (opaque random string, hashed + stored in
                         ADMIN_REFRESH_TOKENS, NOT a JWT)
       │
       ▼
3. Client stores both, sends access_token as
   "Authorization: Bearer <token>" on every subsequent request
       │
       ▼
4. get_current_admin (api/deps.py) decodes the JWT, loads the
   AdminUser row, checks is_active
       │
       ▼
5. require_roles(...) additionally checks admin.role against the
   endpoint's allowed roles (RBAC) — 403 if the role doesn't match
       │
       ▼
6. When access_token expires: POST /auth/refresh with the refresh_token
   -> old refresh_token revoked, new pair issued (rotation)
```

This same `ADMIN_USERS` table and bcrypt hash are the intended login for
the Oracle APEX admin portal (Module 9) — see
`apex/APPLICATION_SPECIFICATION.md` §2 for how that bridges into APEX's
own authentication scheme (flagged there as a design that needs one new
backend endpoint, not yet built).

---

## Internationalization Architecture

```
LanguageProvider (React Context)
  ├─ state: language ('en' | 'ta'), persisted to localStorage
  ├─ t(key, params) -> looks up translations/{en,ta}.js by dot-path,
  │                     interpolates {{placeholders}}, falls back to
  │                     English on any missing Tamil key
  └─ toggleLanguage() / setLanguage(code)

Every component: const { t, language } = useLanguage()
Every form schema: createXSchema(t) factory, rebuilt via useMemo
                    whenever `language` changes

On submission: preferred_language sent to the backend -> stored on
CUSTOMER_LEADS.PREFERRED_LANGUAGE -> the WhatsApp handoff message is
generated in that same language client-side before redirect
```

---

## Deployment Architecture

```
                    ┌─────────────┐
                    │   Internet   │
                    └──────┬──────┘
                           │ HTTPS
              ┌────────────┴────────────┐
              ▼                          ▼
     ┌────────────────┐        ┌──────────────────┐
     │  nginx (frontend │       │  uvicorn (backend  │
     │  container, or    │       │  container, 2       │
     │  Vercel)          │       │  workers)            │
     └────────────────┘        └─────────┬─────────┘
                                            │ oracledb (thin mode,
                                            │ no Oracle Client needed)
                                            ▼
                                 ┌────────────────────┐
                                 │  Oracle Database     │
                                 │  (external — never    │
                                 │  containerized)        │
                                 └──────────┬─────────┘
                                            │
                                            ▼
                                 ┌────────────────────┐
                                 │  Oracle APEX          │
                                 │  Admin Portal          │
                                 └────────────────────┘
```

Docker Compose (`docker-compose.yml`) only ever runs **frontend** and
**backend** — Oracle and Oracle APEX are always external, whether that's
an on-prem instance, Oracle Cloud VM, or Autonomous Database. This is a
deliberate constraint (the client already owns Oracle), not a technical
limitation.
