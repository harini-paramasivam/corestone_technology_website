-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- views.sql
--
-- One view per report in the SRS "REPORTS" section, plus the language
-- breakdown required by the bilingual spec. Every view is a plain SELECT
-- (no DML) so they're safe to expose directly as Oracle APEX Interactive
-- Report/Chart region sources.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- V_MONTHLY_LEADS — "Monthly Leads" report
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_MONTHLY_LEADS AS
SELECT
    TO_CHAR(CREATED_AT, 'YYYY-MM')     AS LEAD_MONTH,
    COUNT(*)                            AS TOTAL_LEADS,
    SUM(CASE WHEN SOURCE = 'contact_form' THEN 1 ELSE 0 END) AS CONTACT_FORM_LEADS,
    SUM(CASE WHEN SOURCE = 'demo_request' THEN 1 ELSE 0 END) AS DEMO_REQUEST_LEADS,
    SUM(CASE WHEN STATUS = 'converted' THEN 1 ELSE 0 END)    AS CONVERTED_LEADS
FROM CUSTOMER_LEADS
GROUP BY TO_CHAR(CREATED_AT, 'YYYY-MM')
ORDER BY LEAD_MONTH DESC;

-- ----------------------------------------------------------------------------
-- V_LEADS_BY_INDUSTRY — "Leads by Industry" report
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_LEADS_BY_INDUSTRY AS
SELECT
    DR.INDUSTRY,
    COUNT(*)                                                    AS TOTAL_DEMO_REQUESTS,
    SUM(CASE WHEN CL.STATUS = 'converted' THEN 1 ELSE 0 END)   AS CONVERTED,
    ROUND(
        SUM(CASE WHEN CL.STATUS = 'converted' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0),
        2
    ) AS CONVERSION_RATE_PCT
FROM DEMO_REQUESTS DR
JOIN CUSTOMER_LEADS CL ON CL.ID = DR.LEAD_ID
GROUP BY DR.INDUSTRY
ORDER BY TOTAL_DEMO_REQUESTS DESC;

-- ----------------------------------------------------------------------------
-- V_LEAD_SOURCES — "Lead Sources" report
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_LEAD_SOURCES AS
SELECT
    SOURCE,
    COUNT(*)                                              AS TOTAL_LEADS,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2)     AS PERCENTAGE_OF_TOTAL
FROM CUSTOMER_LEADS
GROUP BY SOURCE;

-- ----------------------------------------------------------------------------
-- V_DEMO_REQUESTS_DETAIL — "Demo Requests" report (full detail rows)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_DEMO_REQUESTS_DETAIL AS
SELECT
    CL.LEAD_ID,
    CL.FULL_NAME,
    CL.EMAIL,
    CL.PHONE,
    CL.PREFERRED_LANGUAGE,
    CL.STATUS,
    DR.COMPANY_NAME,
    DR.BUSINESS_TYPE,
    DR.INDUSTRY,
    DR.CITY,
    DR.STATE,
    DR.BUSINESS_REQUIREMENT,
    DR.PREFERRED_DEMO_DATE,
    DR.PREFERRED_DEMO_TIME,
    DR.DEMO_MODE,
    CL.CREATED_AT
FROM DEMO_REQUESTS DR
JOIN CUSTOMER_LEADS CL ON CL.ID = DR.LEAD_ID;

-- ----------------------------------------------------------------------------
-- V_LEAD_CONVERSION — "Lead Conversion" report (funnel counts by status)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_LEAD_CONVERSION AS
SELECT
    STATUS,
    COUNT(*)                                              AS LEAD_COUNT,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2)     AS PERCENTAGE_OF_TOTAL
FROM CUSTOMER_LEADS
GROUP BY STATUS;

-- ----------------------------------------------------------------------------
-- V_BUSINESS_CATEGORY_ANALYTICS — "Business Category Analytics" report
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_BUSINESS_CATEGORY_ANALYTICS AS
SELECT
    BC.NAME                                                AS CATEGORY_NAME,
    BC.SLUG                                                AS CATEGORY_SLUG,
    COUNT(DR.ID)                                            AS DEMO_REQUEST_COUNT
FROM BUSINESS_CATEGORIES BC
LEFT JOIN DEMO_REQUESTS DR ON DR.INDUSTRY = BC.SLUG
GROUP BY BC.NAME, BC.SLUG
ORDER BY DEMO_REQUEST_COUNT DESC;

-- ----------------------------------------------------------------------------
-- V_FOLLOWUP_STATUS — "Follow-up Status" report
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_FOLLOWUP_STATUS AS
SELECT
    LF.STATUS,
    COUNT(*)                                               AS FOLLOWUP_COUNT,
    SUM(CASE WHEN LF.FOLLOW_UP_DATE < TRUNC(SYSDATE) AND LF.STATUS = 'pending'
             THEN 1 ELSE 0 END)                             AS OVERDUE_COUNT
FROM LEAD_FOLLOWUPS LF
GROUP BY LF.STATUS;

-- ----------------------------------------------------------------------------
-- V_LEAD_LANGUAGE_BREAKDOWN — bilingual reporting requirement: every
-- report must be able to show the split between English and Tamil
-- enquiries.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_LEAD_LANGUAGE_BREAKDOWN AS
SELECT
    PREFERRED_LANGUAGE,
    COUNT(*)                                               AS TOTAL_LEADS,
    SUM(CASE WHEN SOURCE = 'demo_request' THEN 1 ELSE 0 END) AS DEMO_REQUESTS,
    SUM(CASE WHEN SOURCE = 'contact_form' THEN 1 ELSE 0 END) AS CONTACT_ENQUIRIES,
    SUM(CASE WHEN STATUS = 'converted' THEN 1 ELSE 0 END)    AS CONVERTED
FROM CUSTOMER_LEADS
GROUP BY PREFERRED_LANGUAGE;

-- ----------------------------------------------------------------------------
-- V_LEAD_DASHBOARD — single admin-portal grid combining lead + demo +
-- follow-up + WhatsApp-history counts. Intended as the Oracle APEX Lead
-- Management page's primary Interactive Grid source.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW V_LEAD_DASHBOARD AS
SELECT
    CL.ID,
    CL.LEAD_ID,
    CL.FULL_NAME,
    CL.EMAIL,
    CL.PHONE,
    CL.SOURCE,
    CL.STATUS,
    CL.PREFERRED_LANGUAGE,
    DR.COMPANY_NAME,
    DR.INDUSTRY,
    DR.DEMO_MODE,
    DR.PREFERRED_DEMO_DATE,
    (SELECT COUNT(*) FROM LEAD_FOLLOWUPS LF WHERE LF.LEAD_ID = CL.ID) AS FOLLOWUP_COUNT,
    (SELECT COUNT(*) FROM LEAD_FOLLOWUPS LF WHERE LF.LEAD_ID = CL.ID AND LF.STATUS = 'pending') AS PENDING_FOLLOWUPS,
    (SELECT COUNT(*) FROM WHATSAPP_MESSAGES WM WHERE WM.LEAD_ID = CL.ID) AS WHATSAPP_MESSAGE_COUNT,
    CL.CREATED_AT,
    CL.UPDATED_AT
FROM CUSTOMER_LEADS CL
LEFT JOIN DEMO_REQUESTS DR ON DR.LEAD_ID = CL.ID;
