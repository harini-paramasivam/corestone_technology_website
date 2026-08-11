-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- constraints.sql
--
-- FK, UNIQUE and CHECK constraints. CHECK constraints on enum-like VARCHAR2
-- columns mirror backend/app/models/lead.py and admin.py's Python enums
-- exactly (LeadSource, LeadStatus, DemoMode, FollowupStatus,
-- WhatsAppDirection, AdminRole) — SQLAlchemy uses native_enum=False (plain
-- VARCHAR2 validated at the app layer), so these CHECKs are the Oracle-side
-- backstop that keeps the column honest even if a row is written outside
-- the FastAPI app (e.g. directly from an Oracle APEX process).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- UNIQUE constraints
-- ----------------------------------------------------------------------------
ALTER TABLE BUSINESS_CATEGORIES ADD CONSTRAINT UQ_BUSINESS_CATEGORIES_SLUG UNIQUE (SLUG);
ALTER TABLE SERVICES            ADD CONSTRAINT UQ_SERVICES_SLUG UNIQUE (SLUG);
ALTER TABLE CUSTOMER_LEADS      ADD CONSTRAINT UQ_CUSTOMER_LEADS_LEAD_ID UNIQUE (LEAD_ID);
ALTER TABLE DEMO_REQUESTS       ADD CONSTRAINT UQ_DEMO_REQUESTS_LEAD_ID UNIQUE (LEAD_ID);
ALTER TABLE ADMIN_USERS         ADD CONSTRAINT UQ_ADMIN_USERS_EMAIL UNIQUE (EMAIL);
ALTER TABLE ADMIN_REFRESH_TOKENS ADD CONSTRAINT UQ_ADMIN_REFRESH_TOKENS_HASH UNIQUE (TOKEN_HASH);

-- ----------------------------------------------------------------------------
-- FOREIGN KEY constraints
-- ----------------------------------------------------------------------------
ALTER TABLE SERVICES
    ADD CONSTRAINT FK_SERVICES_CATEGORY
    FOREIGN KEY (CATEGORY_ID) REFERENCES BUSINESS_CATEGORIES (ID)
    ON DELETE SET NULL;

ALTER TABLE SOFTWARE_FEATURES
    ADD CONSTRAINT FK_FEATURES_SERVICE
    FOREIGN KEY (SERVICE_ID) REFERENCES SERVICES (ID)
    ON DELETE SET NULL;

ALTER TABLE DEMO_REQUESTS
    ADD CONSTRAINT FK_DEMO_REQUESTS_LEAD
    FOREIGN KEY (LEAD_ID) REFERENCES CUSTOMER_LEADS (ID)
    ON DELETE CASCADE;

ALTER TABLE LEAD_FOLLOWUPS
    ADD CONSTRAINT FK_FOLLOWUPS_LEAD
    FOREIGN KEY (LEAD_ID) REFERENCES CUSTOMER_LEADS (ID)
    ON DELETE CASCADE;

ALTER TABLE LEAD_FOLLOWUPS
    ADD CONSTRAINT FK_FOLLOWUPS_ADMIN
    FOREIGN KEY (CREATED_BY_ADMIN_ID) REFERENCES ADMIN_USERS (ID)
    ON DELETE SET NULL;

ALTER TABLE WHATSAPP_MESSAGES
    ADD CONSTRAINT FK_WHATSAPP_LEAD
    FOREIGN KEY (LEAD_ID) REFERENCES CUSTOMER_LEADS (ID)
    ON DELETE CASCADE;

ALTER TABLE ADMIN_REFRESH_TOKENS
    ADD CONSTRAINT FK_REFRESH_TOKENS_ADMIN
    FOREIGN KEY (ADMIN_ID) REFERENCES ADMIN_USERS (ID)
    ON DELETE CASCADE;

-- ----------------------------------------------------------------------------
-- CHECK constraints — booleans stored as NUMBER(1)
-- ----------------------------------------------------------------------------
ALTER TABLE BUSINESS_CATEGORIES ADD CONSTRAINT CK_BUSINESS_CATEGORIES_ACTIVE CHECK (IS_ACTIVE IN (0, 1));
ALTER TABLE SERVICES            ADD CONSTRAINT CK_SERVICES_ACTIVE CHECK (IS_ACTIVE IN (0, 1));
ALTER TABLE ADMIN_USERS         ADD CONSTRAINT CK_ADMIN_USERS_ACTIVE CHECK (IS_ACTIVE IN (0, 1));

-- ----------------------------------------------------------------------------
-- CHECK constraints — enum-like VARCHAR2 columns (mirrors Python enums)
-- ----------------------------------------------------------------------------
ALTER TABLE CUSTOMER_LEADS
    ADD CONSTRAINT CK_CUSTOMER_LEADS_SOURCE
    CHECK (SOURCE IN ('contact_form', 'demo_request'));

ALTER TABLE CUSTOMER_LEADS
    ADD CONSTRAINT CK_CUSTOMER_LEADS_STATUS
    CHECK (STATUS IN ('new', 'contacted', 'qualified', 'demo_scheduled', 'converted', 'lost'));

ALTER TABLE CUSTOMER_LEADS
    ADD CONSTRAINT CK_CUSTOMER_LEADS_LANGUAGE
    CHECK (PREFERRED_LANGUAGE IN ('en', 'ta'));

ALTER TABLE DEMO_REQUESTS
    ADD CONSTRAINT CK_DEMO_REQUESTS_MODE
    CHECK (DEMO_MODE IN ('online', 'in_person', 'phone_call'));

ALTER TABLE LEAD_FOLLOWUPS
    ADD CONSTRAINT CK_FOLLOWUPS_STATUS
    CHECK (STATUS IN ('pending', 'done', 'cancelled'));

ALTER TABLE WHATSAPP_MESSAGES
    ADD CONSTRAINT CK_WHATSAPP_DIRECTION
    CHECK (DIRECTION IN ('outbound', 'inbound'));

ALTER TABLE WHATSAPP_MESSAGES
    ADD CONSTRAINT CK_WHATSAPP_LANGUAGE
    CHECK (LANGUAGE_CODE IN ('en', 'ta'));

ALTER TABLE ADMIN_USERS
    ADD CONSTRAINT CK_ADMIN_USERS_ROLE
    CHECK (ROLE IN ('super_admin', 'sales_manager', 'support_agent'));

-- ----------------------------------------------------------------------------
-- CHECK constraint — basic email shape (defense-in-depth; real validation
-- happens in Pydantic before the row is ever written)
-- ----------------------------------------------------------------------------
ALTER TABLE CUSTOMER_LEADS
    ADD CONSTRAINT CK_CUSTOMER_LEADS_EMAIL_FORMAT
    CHECK (REGEXP_LIKE(EMAIL, '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'));

ALTER TABLE ADMIN_USERS
    ADD CONSTRAINT CK_ADMIN_USERS_EMAIL_FORMAT
    CHECK (REGEXP_LIKE(EMAIL, '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'));
