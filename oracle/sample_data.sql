-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- sample_data.sql
--
SET DEFINE OFF;
--
-- BUSINESS_CATEGORIES and SERVICES rows below match
-- frontend/src/data/site.js's INDUSTRIES and SOLUTIONS arrays exactly
-- (same slugs, same names, same order) — the frontend's Industries/
-- Solutions pages are currently static content, but this keeps the
-- database catalog ready to become the source of truth later without a
-- slug mismatch.
--
-- ADMIN_USERS is intentionally NOT seeded here with a hardcoded
-- password. Run backend/app/scripts/create_admin.py after this script
-- to create the first SUPER_ADMIN interactively — seeding a known
-- default password into a production script is a real security
-- liability (it's the first thing an attacker tries), so this is a
-- deliberate omission, not an oversight.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- BUSINESS_CATEGORIES (16 industries — matches INDUSTRIES in site.js)
-- ----------------------------------------------------------------------------
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('nurseries', 'Nurseries', 'Plant/species-level stock tracking, seasonal demand planning, and bulk order billing.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('agriculture', 'Agriculture', 'Input purchase tracking, harvest/yield logging, and distributor invoicing.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('travel-logistics', 'Travel & Logistics', 'Booking management, fleet assignment, and route scheduling.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('tea-shops', 'Tea Shops', 'Fast checkout billing built for high-volume, low-ticket sales.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('bakeries', 'Bakeries', 'Recipe-based ingredient costing and production planning.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('grocery-stores', 'Grocery Stores', 'High-SKU barcode billing with expiry tracking.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('wholesale', 'Wholesale', 'Bulk pricing tiers, credit terms, and multi-warehouse stock.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('retail', 'Retail', 'Multi-branch POS billing with loyalty tracking and analytics.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('pharmacies', 'Pharmacies', 'Batch/expiry-tracked stock with prescription record-keeping.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('hospitals', 'Hospitals', 'Patient billing and department-wise inventory.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('clinics', 'Clinics', 'Appointment-linked billing and consumables inventory.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('restaurants', 'Restaurants', 'Table/order management linked to kitchen inventory and menu costing.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('hotels', 'Hotels', 'Room booking, occupancy, and consolidated guest billing.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('hardware-stores', 'Hardware Stores', 'Multi-unit-of-measure stock with variant tracking.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('service-businesses', 'Service Businesses', 'Job/ticket billing with technician scheduling.', 1);
INSERT INTO BUSINESS_CATEGORIES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('custom-enterprises', 'Custom Enterprises', 'Bespoke workflow discovery and modular configuration.', 1);

-- ----------------------------------------------------------------------------
-- SERVICES (9 solutions — matches SOLUTIONS in site.js)
-- ----------------------------------------------------------------------------
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('billing-software', 'Billing Software', 'Fast, accurate invoicing built for high-volume counters.', 1);
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('inventory-management', 'Inventory Management', 'Real-time stock visibility across locations and SKUs.', 1);
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('business-dashboards', 'Business Dashboards', 'Live, role-based views into how the business is doing.', 1);
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('gst-billing', 'GST Billing', 'Compliant tax invoicing with automatic GST calculation.', 1);
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('sales-analytics', 'Sales Analytics', 'Understand what is selling, where, and to whom.', 1);
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('business-reports', 'Business Reports', 'Daily, weekly and monthly reports, generated automatically.', 1);
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('custom-erp', 'Custom ERP', 'One system connecting purchasing, stock, sales and staff.', 1);
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('business-automation', 'Business Automation', 'Remove the manual, repetitive work from daily operations.', 1);
INSERT INTO SERVICES (SLUG, NAME, DESCRIPTION, IS_ACTIVE) VALUES ('custom-software-development', 'Custom Software Development', 'Software built around how your business actually runs.', 1);

-- ----------------------------------------------------------------------------
-- SOFTWARE_FEATURES — a representative subset per service (matches the
-- "features" arrays in frontend/src/data/solutionsContent.js)
-- ----------------------------------------------------------------------------
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Barcode & quick-search checkout', NULL FROM SERVICES WHERE SLUG = 'billing-software';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Split and multi-mode payments', NULL FROM SERVICES WHERE SLUG = 'billing-software';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Real-time stock levels across locations', NULL FROM SERVICES WHERE SLUG = 'inventory-management';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Low-stock and reorder-point alerts', NULL FROM SERVICES WHERE SLUG = 'inventory-management';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Role-based dashboards for owners, managers and staff', NULL FROM SERVICES WHERE SLUG = 'business-dashboards';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Automatic CGST/SGST/IGST calculation', NULL FROM SERVICES WHERE SLUG = 'gst-billing';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'GSTR-1 and GSTR-3B ready reports', NULL FROM SERVICES WHERE SLUG = 'gst-billing';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Product and category performance breakdowns', NULL FROM SERVICES WHERE SLUG = 'sales-analytics';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Automated daily closing reports', NULL FROM SERVICES WHERE SLUG = 'business-reports';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Unified purchase-to-sale workflow', NULL FROM SERVICES WHERE SLUG = 'custom-erp';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Automatic reorder triggers at stock thresholds', NULL FROM SERVICES WHERE SLUG = 'business-automation';
INSERT INTO SOFTWARE_FEATURES (SERVICE_ID, NAME, DESCRIPTION)
    SELECT ID, 'Requirements discovery with your actual team', NULL FROM SERVICES WHERE SLUG = 'custom-software-development';

-- ----------------------------------------------------------------------------
-- CUSTOMER_LEADS — a handful of realistic sample rows for local dev /
-- demo purposes, deliberately covering both languages, both sources, and
-- a spread of statuses so every view above returns non-trivial results
-- the first time someone queries them.
-- ----------------------------------------------------------------------------
INSERT INTO CUSTOMER_LEADS (LEAD_ID, FULL_NAME, EMAIL, PHONE, MESSAGE, SOURCE, STATUS, PREFERRED_LANGUAGE)
VALUES ('CS-202607-A1B2C3', 'Karthik Raman', 'karthik.raman@example.com', '9840012345', 'Interested in GST billing for my grocery store.', 'contact_form', 'contacted', 'en');

INSERT INTO CUSTOMER_LEADS (LEAD_ID, FULL_NAME, EMAIL, PHONE, MESSAGE, SOURCE, STATUS, PREFERRED_LANGUAGE)
VALUES ('CS-202607-D4E5F6', 'Priya Selvam', 'priya.selvam@example.com', '9940098765', NULL, 'demo_request', 'demo_scheduled', 'ta');

INSERT INTO CUSTOMER_LEADS (LEAD_ID, FULL_NAME, EMAIL, PHONE, MESSAGE, SOURCE, STATUS, PREFERRED_LANGUAGE)
VALUES ('CS-202606-11A2B3', 'Mohammed Ismail', 'ismail.traders@example.com', '9994411223', NULL, 'demo_request', 'converted', 'en');

INSERT INTO CUSTOMER_LEADS (LEAD_ID, FULL_NAME, EMAIL, PHONE, MESSAGE, SOURCE, STATUS, PREFERRED_LANGUAGE)
VALUES ('CS-202606-44C5D6', 'Lakshmi Narayanan', 'lakshmi.n@example.com', '9843322110', 'Need pricing for a 3-branch pharmacy.', 'contact_form', 'new', 'ta');

-- Linked DEMO_REQUESTS rows for the two demo_request leads above
INSERT INTO DEMO_REQUESTS (
    LEAD_ID, COMPANY_NAME, BUSINESS_TYPE, INDUSTRY, CITY, STATE,
    BUSINESS_REQUIREMENT, PREFERRED_DEMO_DATE, PREFERRED_DEMO_TIME, DEMO_MODE
)
SELECT ID, 'Selvam Wholesale Traders', 'proprietorship', 'wholesale', 'Madurai', 'Tamil Nadu',
       'Need bulk pricing tiers and multi-warehouse stock tracking.', DATE '2026-08-05', '11:30', 'online'
FROM CUSTOMER_LEADS WHERE LEAD_ID = 'CS-202607-D4E5F6';

INSERT INTO DEMO_REQUESTS (
    LEAD_ID, COMPANY_NAME, BUSINESS_TYPE, INDUSTRY, CITY, STATE,
    BUSINESS_REQUIREMENT, PREFERRED_DEMO_DATE, PREFERRED_DEMO_TIME, DEMO_MODE
)
SELECT ID, 'Ismail Hardware Mart', 'partnership', 'hardware-stores', 'Coimbatore', 'Tamil Nadu',
       'Variant tracking for sizes and brands, barcode billing.', DATE '2026-07-10', '14:30', 'in_person'
FROM CUSTOMER_LEADS WHERE LEAD_ID = 'CS-202606-11A2B3';

-- A follow-up and a WhatsApp message tied to one lead, for view testing
INSERT INTO LEAD_FOLLOWUPS (LEAD_ID, NOTE, FOLLOW_UP_DATE, STATUS)
SELECT ID, 'Called to confirm demo time, awaiting confirmation.', DATE '2026-07-22', 'pending'
FROM CUSTOMER_LEADS WHERE LEAD_ID = 'CS-202607-A1B2C3';

INSERT INTO WHATSAPP_MESSAGES (LEAD_ID, DIRECTION, MESSAGE_TEXT, LANGUAGE_CODE)
SELECT ID, 'outbound',
       'வணக்கம் CoreStone Technologies, நான் ஒரு டெமோவைக் கோரிக்கை வைத்துள்ளேன் (லீட் ஐடி: CS-202607-D4E5F6).',
       'ta'
FROM CUSTOMER_LEADS WHERE LEAD_ID = 'CS-202607-D4E5F6';

COMMIT;
