# CoreStone Technologies — Security Documentation

## Password Storage

Admin passwords are hashed with **bcrypt** (via the `bcrypt` package
directly, not `passlib` — see the note below) before ever touching the
database. Plaintext passwords are never logged, never stored, and never
transmitted after the initial login request (which itself must happen
over HTTPS in any real deployment).

> **Dependency note:** an earlier build used `passlib`'s bcrypt wrapper,
> which was found — during actual end-to-end testing, not by
> inspection — to be broken against the installed `bcrypt` 5.x (a real
> upstream incompatibility: passlib reads a `__about__.__version__`
> attribute bcrypt 4.1+ removed). Switched to calling `bcrypt` directly
> in `backend/app/core/security.py`. Flagging this so a future
> dependency bump doesn't reintroduce the same silent failure.

## JWT Access Tokens

- Signed with `SECRET_KEY` (HS256) — **must** be a long random value in
  production, generated via `python -c "import secrets; print(secrets.token_urlsafe(64))"`,
  never the placeholder in `.env.example`.
- Short-lived (`ACCESS_TOKEN_EXPIRE_MINUTES`, default 8 hours).
- Carry `sub` (email) and `role` claims — `role` is re-validated against
  the live `ADMIN_USERS` row on every request (`get_current_admin`),
  never trusted blindly from the token alone, so a role change or
  deactivation takes effect immediately rather than waiting for the
  token to expire.

## Refresh Tokens

- **Not JWTs.** Opaque random strings (`secrets.token_urlsafe(48)`),
  because a stateless JWT can't be revoked before it expires — these are
  hashed (SHA-256) and stored server-side in `ADMIN_REFRESH_TOKENS`, so
  revocation (logout, suspected compromise) is a single `UPDATE`.
- **Single-use rotation:** every `/auth/refresh` call revokes the
  presented token and issues a new one. Reusing an already-rotated
  token fails — this limits the blast radius of a leaked refresh token
  to one use.
- **Never logged.** Only the SHA-256 hash is ever persisted; the raw
  token exists only in the HTTP response and the client's storage.

## Role-Based Access Control (RBAC)

Three roles (`super_admin`, `sales_manager`, `support_agent`), enforced
server-side via `require_roles(...)` (`backend/app/api/deps.py`) on
every protected endpoint — never enforced only in the frontend UI (a
hidden button is not a security control). See
`apex/APPLICATION_SPECIFICATION.md` §3 for the equivalent Oracle APEX
authorization schemes, which reuse the same three roles rather than
inventing a parallel permission model.

## Input Validation

- **Every** API input is validated by Pydantic before it reaches the
  service layer — type coercion, length limits, format checks (email,
  phone regex, date-not-in-the-past), and enum membership are all
  enforced at the boundary, not trusted from the client.
- **Defense in depth at the database layer:** Oracle `CHECK` constraints
  mirror the same enum values Pydantic validates (see
  `oracle/constraints.sql`), so even a direct SQL write (an APEX
  process, a manual fix) can't insert an invalid `STATUS`, `SOURCE`,
  `DEMO_MODE`, `PREFERRED_LANGUAGE`, etc.
- **Frontend validation is a UX layer, not a security boundary** — Zod
  schemas on the client give instant feedback, but the backend
  re-validates everything independently and does not trust the
  frontend's judgment.

## SQL Injection

All database access goes through SQLAlchemy's ORM/Core query builder
(parameterized queries) via the Repository layer — no endpoint, service,
or repository method in this codebase builds a SQL string by
concatenating user input. PL/SQL procedures use bind parameters
(`p_lead_id`, etc.) exclusively, never dynamic SQL built from
unsanitized input.

## CORS

`BACKEND_CORS_ORIGINS_RAW` in `backend/.env` is an explicit allowlist —
never `*` in production. Only the real frontend origin(s) should be
listed.

## Secrets Management

- No secret (`SECRET_KEY`, `ORACLE_PASSWORD`, admin passwords) is ever
  committed — both `.env` files are gitignored, and `.env.example`
  files contain only placeholders.
- `oracle/sample_data.sql` **deliberately does not seed an admin
  account** — a known default password in a script is one of the first
  things an attacker tries against any deployment that forgot to change
  it. The first admin is always created interactively via
  `python -m app.scripts.create_admin`, which prompts for (and never
  accepts as a CLI argument) the password.

## Transport Security

HTTPS is assumed for every real deployment — see `RUN_PROJECT.md` §10
for TLS setup (Vercel/Render provide it automatically; a raw VM should
use Let's Encrypt in front of nginx). Neither the API nor the Oracle
APEX admin portal should ever be reachable over plain HTTP in
production.

## Known Limitations (Honestly Stated)

- **Rate limiting** is not implemented at the FastAPI layer — recommend
  adding it at the nginx/hosting-platform level for any public
  deployment (see `docs/API_DOCUMENTATION.md`).
- **The Oracle APEX ↔ FastAPI bcrypt bridge** (`apex/APPLICATION_SPECIFICATION.md`
  §2) is a design proposal, not implemented code — it recommends one
  new internal-only backend endpoint that does not exist yet, and
  explicitly calls out the alternative (a separate APEX-only password)
  as a simpler, if less elegant, option. This is a product decision, not
  something silently resolved in this codebase.
- **No automated dependency vulnerability scanning** is wired into CI
  yet (`.github/workflows/ci.yml` covers lint/build/import-check only)
  — consider adding `pip-audit` and `npm audit` as CI steps before a
  production launch.
- **No live Oracle instance or Oracle APEX workspace** was available to
  test any of this against in the environment this project was built
  in — every claim above about behavior (constraint enforcement, RBAC,
  token rotation) was verified either through actual code execution
  (JWT/refresh-token flow was tested end-to-end with a real in-memory
  database substitution — see the Module 7 verification notes) or
  through static cross-checking (Oracle SQL vs. ORM metadata). Run the
  verification checklist in `RUN_PROJECT.md` §12 against a real Oracle
  instance before trusting this in production.
