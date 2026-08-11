# CoreStone Technologies — API Documentation

Base URL: `{VITE_API_BASE_URL}` — e.g. `http://localhost:8000/api/v1` in
development. Full interactive docs are always live at `/docs` (Swagger)
and `/redoc` (ReDoc) — this file is the static reference, generated from
and verified against the actual running OpenAPI schema (the endpoint
list, HTTP verbs, and summaries below were pulled directly from
`/openapi.json`, not hand-typed from memory).

---

## Authentication

All `/auth/*` endpoints except `/auth/login` and `/auth/refresh` require:

```
Authorization: Bearer <access_token>
```

Access tokens expire after `ACCESS_TOKEN_EXPIRE_MINUTES` (default 480 =
8 hours). Refresh tokens expire after `REFRESH_TOKEN_EXPIRE_DAYS`
(default 30) and are **single-use** — every `/auth/refresh` call rotates
to a new refresh token and revokes the one presented.

---

## Public Endpoints

### `GET /api/v1/health`

Liveness check. Does not touch the database — returns 200 even if
Oracle is unreachable, by design (`backend/app/api/v1/endpoints/health.py`).

```json
{ "success": true, "status": "ok", "service": "CoreStone Technologies API", "environment": "development" }
```

### `POST /api/v1/leads`

General contact-form enquiry. Matches
`frontend/src/lib/validation/contactSchema.js`'s `submitContactForm()`
payload exactly.

**Request**
```json
{
  "full_name": "Harini Paramasivam",
  "email": "harini@example.com",
  "phone": "9876543210",
  "message": "Interested in GST billing software for my retail shop.",
  "source": "contact_form",
  "preferred_language": "en"
}
```

| Field | Type | Constraints |
|---|---|---|
| `full_name` | string | 2–160 chars |
| `email` | string | valid email format |
| `phone` | string | 10-digit Indian mobile, leading `6`–`9`, optional `+91`/`91` prefix |
| `message` | string \| null | max 1500 chars |
| `source` | string | `contact_form` \| `demo_request` (default `contact_form`) |
| `preferred_language` | string | `en` \| `ta` (default `en`) |

**Response `201`**
```json
{ "success": true, "lead_id": "CS-202607-4F9A2C", "message": "Thanks for reaching out. We'll get back to you within 24 hours." }
```

`422` on validation failure · `409` on the near-impossible lead-ID
collision case (retried internally up to 5 times first).

### `POST /api/v1/demo-requests`

Full demo request. Matches `frontend/src/lib/demoRequestService.js`'s
`submitDemoRequest()` payload (via `toApiPayload()`) exactly, field for
field.

**Request**
```json
{
  "full_name": "Harini Paramasivam",
  "company_name": "Acme Retail",
  "business_type": "proprietorship",
  "industry": "retail",
  "email": "harini@example.com",
  "phone": "9876543210",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "business_requirement": "Need GST billing and inventory management for our retail shop.",
  "preferred_demo_date": "2026-08-01",
  "preferred_demo_time": "10:00",
  "demo_mode": "online",
  "preferred_language": "en"
}
```

| Field | Type | Constraints |
|---|---|---|
| `full_name` | string | 2–160 chars |
| `company_name` | string | 2–200 chars |
| `business_type` | string | 1–60 chars |
| `industry` | string | 1–80 chars (an industry slug, e.g. `retail`) |
| `email` | string | valid email format |
| `phone` | string | same rule as `/leads` |
| `city` | string | 2–100 chars |
| `state` | string | 1–100 chars |
| `business_requirement` | string | 20–2000 chars |
| `preferred_demo_date` | string (ISO date) | must not be in the past |
| `preferred_demo_time` | string | 1–10 chars, e.g. `10:00` |
| `demo_mode` | string | `online` \| `in_person` \| `phone_call` |
| `preferred_language` | string | `en` \| `ta` (default `en`) |

**Response `201`**
```json
{ "success": true, "lead_id": "CS-202607-D4E5F6", "message": "Demo request received. We'll confirm your slot within 24 hours." }
```

Internally: one `CUSTOMER_LEADS` row (`source='demo_request'`) + one
linked `DEMO_REQUESTS` row, in a single transaction
(`LeadService.create_demo_request`).

---

## Admin Endpoints (JWT required)

### `POST /api/v1/auth/login`

```json
{ "email": "you@corestonetech.com", "password": "..." }
```

**Response `200`**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "aBcD...",
  "token_type": "bearer",
  "admin": { "id": 1, "full_name": "Fernandes", "email": "you@corestonetech.com", "role": "super_admin", "is_active": true }
}
```

`401` on wrong credentials or an inactive account.

### `POST /api/v1/auth/refresh`

```json
{ "refresh_token": "aBcD..." }
```

Returns a brand-new token pair. The presented refresh token is revoked
immediately (single-use rotation) — reusing it returns `401`.

### `POST /api/v1/auth/logout`

```json
{ "refresh_token": "aBcD..." }
```

`204 No Content`. Revokes the given refresh token immediately.

### `GET /api/v1/auth/me`

Requires `Authorization: Bearer <access_token>`.

```json
{ "id": 1, "full_name": "Fernandes", "email": "you@corestonetech.com", "role": "super_admin", "is_active": true }
```

`401` on missing/malformed/expired/tampered token.

---

## Role-Based Access Control

`backend/app/api/deps.py`'s `get_current_admin` / `require_roles(...)`
gate every admin-protected endpoint. Roles (`AdminRole`,
`backend/app/models/admin.py`):

| Role | Value |
|---|---|
| Super Admin | `super_admin` |
| Sales Manager | `sales_manager` |
| Support Agent | `support_agent` |

`403 Forbidden` (distinct from `401`) means the token is valid but the
role lacks permission for that action — see
`apex/APPLICATION_SPECIFICATION.md` §3 for the full role-to-page matrix.

---

## Error Response Shape

Every error (except FastAPI's own `422` validation errors, which use
FastAPI's standard shape) follows one envelope
(`backend/app/core/exceptions.py`):

```json
{ "success": false, "error": "Incorrect email or password.", "path": "/api/v1/auth/login" }
```

| HTTP Status | Meaning |
|---|---|
| `400` | Generic bad request |
| `401` | Not authenticated / invalid credentials or token |
| `403` | Authenticated but not authorized (RBAC) |
| `404` | Resource not found |
| `409` | Conflict |
| `422` | Request validation failed |
| `503` | Database error (e.g. Oracle unreachable) |
| `500` | Unhandled server error — logged server-side, generic message to the client |

---

## Rate Limiting

Not implemented at the application layer. Add it at the reverse proxy
(`docker/nginx/nginx.conf`) or hosting-platform level if deploying
publicly, rather than in FastAPI code.
