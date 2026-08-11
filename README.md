# 🚀 CoreStone Technologies — Enterprise SaaS Platform

> **Smart Software Solutions for Every Business.**  
> An enterprise-grade, high-performance SaaS marketing platform and Lead Management engine built for CoreStone Technologies. Featuring a bilingual (English / தமிழ்) React 19 frontend, FastAPI backend, background PDF generation & email delivery, and Oracle XE database integration.

---

## ⚡ Quick Links & Documentation Index

| Guide / Doc | What it Covers |
|---|---|
| 📖 **[RUN_PROJECT.md](RUN_PROJECT.md)** | Step-by-step installation, local execution, Docker setup, and troubleshooting |
| 🔌 **[docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)** | Complete REST API reference, endpoints, schemas, and payload examples |
| 🗄️ **[docs/DATABASE_DOCUMENTATION.md](docs/DATABASE_DOCUMENTATION.md)** | Oracle XE Database tables, PL/SQL packages, procedures, and schema DDL |
| 🏗️ **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** | High-level system design, data flow diagrams, and i18n translation framework |
| 🔒 **[docs/SECURITY_DOCUMENTATION.md](docs/SECURITY_DOCUMENTATION.md)** | Authentication, background task handling, SMTP security, and CORS policies |

---

## 🌟 Key Platform Features

- ⚡ **Instant Response & Non-Blocking Background Pipeline**:
  Form submissions save to Oracle DB and return HTTP 201 in `<1s`. Email notifications with attached PDF reports are dispatched asynchronously in background daemon threads.
- 📄 **Automated PDF Generation**:
  Backend ReportLab service automatically formats lead submissions into branded PDF reports and attaches them to incoming email notifications.
- 🌐 **Full Bilingual Support (English & தமிழ்)**:
  Instant language switching across all pages, dynamic solution/industry cards, form validation messages, and footer links with zero page reloads.
- 🎨 **High-Impact Visual Design**:
  Curated high-resolution sector photography for 9 Solutions & 28 Industries, custom interactive dashboard previews, frosted glass UI cards, and smooth micro-animations.
- 🏢 **Enterprise Oracle Integration**:
  Built on Oracle XE database with SQLAlchemy ORM, custom PL/SQL triggers, and clean relational data models (`CUSTOMER_LEADS`, `DEMO_REQUESTS`).

---

## 📁 Optimized Project Structure

```
CoreStone-Technologies/
├── 🌐 frontend/            React 19 + Vite + Tailwind v4 + Framer Motion
│   ├── src/components/    Reusable UI components, page heroes, and image banners
│   ├── src/data/          Bilingual content, site metadata, and sector photography
│   ├── src/i18n/          English & Tamil translation dictionaries (en.js, ta.js)
│   └── src/pages/         Page routes (Home, Solutions, Industries, Contact, Request Demo)
│
├── ⚙️ backend/             FastAPI + SQLAlchemy ORM + Oracle Database
│   ├── app/api/           REST API endpoints (/leads, /demo-requests)
│   ├── app/core/          App configuration & SMTP settings
│   ├── app/models/        Oracle ORM models (CustomerLead, DemoRequest)
│   ├── app/services/      PDF generation (ReportLab) & Email notifications (SMTP)
│   └── scripts/           Automated pipeline testing & database verification scripts
│
├── 🗄️ oracle/              Oracle DDL scripts, PL/SQL packages, and sample data
├── 📊 apex/                Oracle APEX admin portal specification & deployment guide
├── 🐳 docker/              Production Multi-Stage Dockerfiles & Nginx proxy config
└── 📜 docker-compose.yml   Full stack container orchestration (Frontend, Backend, Oracle XE)
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons, React Hook Form, Zod
- **Backend**: Python 3.12, FastAPI, SQLAlchemy 2.0, ReportLab (PDF), python-oracledb, Uvicorn
- **Database**: Oracle XE Database (23ai / 19c)
- **Infrastructure**: Docker & Docker Compose, Nginx Proxy

---

## ⚡ Quick Start

### Running with Docker (Recommended)

```bash
# 1. Start all services (Oracle DB + FastAPI Backend + React Frontend)
docker compose up --build -d

# 2. Access the Web App
# Frontend: http://localhost:5173 (or http://localhost)
# Backend API Specs: http://localhost:8002/docs
```

### Running Locally (Dev Mode)

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
docker compose up -d oracle-xe
uvicorn app.main:app --reload --port 8002
```

---

## 📬 Contact & Business Inquiries

**CoreStone Technologies**  
📧 Email: `corestonetech2026@gmail.com`  
📞 Phone / WhatsApp: `+91 77081 96424`  
📍 Location: Puducherry, India  
🔗 LinkedIn: [corestone-technology](https://www.linkedin.com/in/corestone-technology-6046a9428) | Instagram: [@corestonetech2026](https://www.instagram.com/corestonetech2026/) | Twitter: [@corestonetech](https://x.com/corestonetech)
