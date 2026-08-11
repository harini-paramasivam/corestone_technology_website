-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- indexes.sql
--
-- Oracle does NOT automatically index foreign key columns (unlike some
-- other databases) — every FK below gets an explicit index, since
-- otherwise every ON DELETE CASCADE and every join against the parent
-- table does a full table scan on the child. Unique constraints already
-- create their own index implicitly (BUSINESS_CATEGORIES.SLUG,
-- CUSTOMER_LEADS.LEAD_ID, ADMIN_USERS.EMAIL, etc.) — not repeated here.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Foreign key indexes
-- ----------------------------------------------------------------------------
CREATE INDEX IX_SERVICES_CATEGORY_ID           ON SERVICES (CATEGORY_ID);
CREATE INDEX IX_FEATURES_SERVICE_ID            ON SOFTWARE_FEATURES (SERVICE_ID);
CREATE INDEX IX_DEMO_REQUESTS_LEAD_ID          ON DEMO_REQUESTS (LEAD_ID);
CREATE INDEX IX_FOLLOWUPS_LEAD_ID              ON LEAD_FOLLOWUPS (LEAD_ID);
CREATE INDEX IX_FOLLOWUPS_ADMIN_ID             ON LEAD_FOLLOWUPS (CREATED_BY_ADMIN_ID);
CREATE INDEX IX_WHATSAPP_MESSAGES_LEAD_ID      ON WHATSAPP_MESSAGES (LEAD_ID);
CREATE INDEX IX_REFRESH_TOKENS_ADMIN_ID        ON ADMIN_REFRESH_TOKENS (ADMIN_ID);

-- ----------------------------------------------------------------------------
-- Reporting / lookup indexes — matches the SRS reports list (Monthly
-- Leads, Leads by Industry, Lead Sources, Follow-up Status) and the
-- contact/demo lookups the API does on every submission.
-- ----------------------------------------------------------------------------
CREATE INDEX IX_CUSTOMER_LEADS_EMAIL           ON CUSTOMER_LEADS (EMAIL);
CREATE INDEX IX_CUSTOMER_LEADS_PHONE           ON CUSTOMER_LEADS (PHONE);
CREATE INDEX IX_CUSTOMER_LEADS_STATUS          ON CUSTOMER_LEADS (STATUS);
CREATE INDEX IX_CUSTOMER_LEADS_SOURCE          ON CUSTOMER_LEADS (SOURCE);
CREATE INDEX IX_CUSTOMER_LEADS_CREATED_AT      ON CUSTOMER_LEADS (CREATED_AT);

CREATE INDEX IX_DEMO_REQUESTS_INDUSTRY         ON DEMO_REQUESTS (INDUSTRY);
CREATE INDEX IX_DEMO_REQUESTS_DEMO_DATE        ON DEMO_REQUESTS (PREFERRED_DEMO_DATE);

CREATE INDEX IX_FOLLOWUPS_STATUS               ON LEAD_FOLLOWUPS (STATUS);
CREATE INDEX IX_FOLLOWUPS_DATE                 ON LEAD_FOLLOWUPS (FOLLOW_UP_DATE);

CREATE INDEX IX_REFRESH_TOKENS_EXPIRES_AT      ON ADMIN_REFRESH_TOKENS (EXPIRES_AT);
