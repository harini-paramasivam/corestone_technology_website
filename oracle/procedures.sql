-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- procedures.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PRC_ADD_FOLLOWUP
-- Adds a follow-up task against a lead (by business-key LEAD_ID), called
-- from the Oracle APEX Follow-up Tracker page process.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE PRC_ADD_FOLLOWUP(
    p_lead_id             IN VARCHAR2,
    p_note                IN CLOB,
    p_follow_up_date      IN DATE,
    p_created_by_admin_id IN NUMBER DEFAULT NULL,
    p_status              IN VARCHAR2 DEFAULT 'pending'
)
IS
    v_lead_internal_id CUSTOMER_LEADS.ID%TYPE;
BEGIN
    IF p_status NOT IN ('pending', 'done', 'cancelled') THEN
        RAISE_APPLICATION_ERROR(-20020, 'Invalid follow-up status: ' || p_status);
    END IF;

    BEGIN
        SELECT ID INTO v_lead_internal_id
        FROM CUSTOMER_LEADS
        WHERE LEAD_ID = p_lead_id;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20021, 'No lead found with LEAD_ID: ' || p_lead_id);
    END;

    INSERT INTO LEAD_FOLLOWUPS (
        LEAD_ID, NOTE, FOLLOW_UP_DATE, STATUS, CREATED_BY_ADMIN_ID
    ) VALUES (
        v_lead_internal_id, p_note, p_follow_up_date, p_status, p_created_by_admin_id
    );

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END PRC_ADD_FOLLOWUP;
/

-- ----------------------------------------------------------------------------
-- PRC_UPDATE_LEAD_STATUS
-- Updates a lead's status by its business-key LEAD_ID. Validates the new
-- status against the same enum the Python LeadStatus model uses.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE PRC_UPDATE_LEAD_STATUS(
    p_lead_id    IN VARCHAR2,
    p_new_status IN VARCHAR2
)
IS
    v_rows_updated NUMBER;
BEGIN
    IF p_new_status NOT IN ('new', 'contacted', 'qualified', 'demo_scheduled', 'converted', 'lost') THEN
        RAISE_APPLICATION_ERROR(-20030, 'Invalid lead status: ' || p_new_status);
    END IF;

    UPDATE CUSTOMER_LEADS
    SET STATUS = p_new_status,
        UPDATED_AT = SYSTIMESTAMP
    WHERE LEAD_ID = p_lead_id;

    v_rows_updated := SQL%ROWCOUNT;

    IF v_rows_updated = 0 THEN
        RAISE_APPLICATION_ERROR(-20031, 'No lead found with LEAD_ID: ' || p_lead_id);
    END IF;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END PRC_UPDATE_LEAD_STATUS;
/

-- ----------------------------------------------------------------------------
-- PRC_CLOSE_STALE_LEADS
-- Business automation: leads still in 'new' status after p_days_threshold
-- days are moved to 'lost'. Intended to run on an Oracle APEX scheduled
-- job or a DBMS_SCHEDULER job (see docs/DATABASE_DESIGN.md for the
-- scheduling snippet) — this procedure only contains the business logic.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE PRC_CLOSE_STALE_LEADS(
    p_days_threshold IN NUMBER DEFAULT 30
)
IS
    v_rows_updated NUMBER;
BEGIN
    UPDATE CUSTOMER_LEADS
    SET STATUS = 'lost',
        UPDATED_AT = SYSTIMESTAMP
    WHERE STATUS = 'new'
      AND CREATED_AT < SYSTIMESTAMP - p_days_threshold;

    v_rows_updated := SQL%ROWCOUNT;

    DBMS_OUTPUT.PUT_LINE('PRC_CLOSE_STALE_LEADS: closed ' || v_rows_updated || ' stale lead(s).');

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20040, 'PRC_CLOSE_STALE_LEADS failed: ' || SQLERRM);
END PRC_CLOSE_STALE_LEADS;
/

-- ----------------------------------------------------------------------------
-- PRC_GET_DAILY_LEAD_REPORT
-- Returns every lead created on p_report_date via a REF CURSOR — designed
-- to be called directly as an Oracle APEX Interactive Report/Grid region
-- source (Function Returning SQL Query wrapping this, or a classic report
-- with "PL/SQL function returning a cursor").
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE PRC_GET_DAILY_LEAD_REPORT(
    p_report_date IN DATE,
    p_cursor      OUT SYS_REFCURSOR
)
IS
BEGIN
    OPEN p_cursor FOR
        SELECT
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
            CL.CREATED_AT
        FROM CUSTOMER_LEADS CL
        LEFT JOIN DEMO_REQUESTS DR ON DR.LEAD_ID = CL.ID
        WHERE TRUNC(CL.CREATED_AT) = TRUNC(p_report_date)
        ORDER BY CL.CREATED_AT DESC;
END PRC_GET_DAILY_LEAD_REPORT;
/

-- ----------------------------------------------------------------------------
-- PR_CREATE_LEAD
-- Creates a CUSTOMER_LEADS row directly at the database layer. The
-- FastAPI app does NOT call this in normal operation (LeadService /
-- LeadRepository insert via SQLAlchemy instead) — this procedure exists
-- for Oracle APEX page processes and any future direct-DB integration
-- that needs to create a lead without going through the API. p_lead_id
-- is optional: pass NULL to let TRG_CUSTOMER_LEADS_LEAD_ID generate a
-- fallback ID; pass a value to reuse an ID already generated elsewhere
-- (e.g. by the FastAPI app calling this procedure through a future
-- direct-DB code path).
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE PR_CREATE_LEAD(
    p_full_name          IN VARCHAR2,
    p_email              IN VARCHAR2,
    p_phone              IN VARCHAR2,
    p_message            IN CLOB DEFAULT NULL,
    p_source             IN VARCHAR2 DEFAULT 'contact_form',
    p_preferred_language IN VARCHAR2 DEFAULT 'en',
    p_lead_id            IN VARCHAR2 DEFAULT NULL,
    p_lead_id_out        OUT VARCHAR2
)
IS
BEGIN
    IF p_source NOT IN ('contact_form', 'demo_request') THEN
        RAISE_APPLICATION_ERROR(-20050, 'Invalid lead source: ' || p_source);
    END IF;

    IF p_preferred_language NOT IN ('en', 'ta') THEN
        RAISE_APPLICATION_ERROR(-20051, 'Invalid preferred_language: ' || p_preferred_language);
    END IF;

    INSERT INTO CUSTOMER_LEADS (
        LEAD_ID, FULL_NAME, EMAIL, PHONE, MESSAGE, SOURCE, STATUS, PREFERRED_LANGUAGE
    ) VALUES (
        p_lead_id, p_full_name, p_email, p_phone, p_message, p_source, 'new', p_preferred_language
    )
    RETURNING LEAD_ID INTO p_lead_id_out;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20052, 'PR_CREATE_LEAD failed: ' || SQLERRM);
END PR_CREATE_LEAD;
/

-- ----------------------------------------------------------------------------
-- PR_CREATE_DEMO_REQUEST
-- Creates a CUSTOMER_LEADS row (source='demo_request') and its linked
-- DEMO_REQUESTS row in a single transaction — the DB-layer equivalent of
-- LeadService.create_demo_request() in the FastAPI app. Same optional
-- p_lead_id pattern as PR_CREATE_LEAD.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE PR_CREATE_DEMO_REQUEST(
    p_full_name             IN VARCHAR2,
    p_company_name          IN VARCHAR2,
    p_business_type         IN VARCHAR2,
    p_industry              IN VARCHAR2,
    p_email                 IN VARCHAR2,
    p_phone                 IN VARCHAR2,
    p_city                  IN VARCHAR2,
    p_state                 IN VARCHAR2,
    p_business_requirement  IN CLOB,
    p_preferred_demo_date   IN DATE,
    p_preferred_demo_time   IN VARCHAR2,
    p_demo_mode             IN VARCHAR2,
    p_preferred_language    IN VARCHAR2 DEFAULT 'en',
    p_lead_id               IN VARCHAR2 DEFAULT NULL,
    p_lead_id_out           OUT VARCHAR2
)
IS
    v_lead_internal_id CUSTOMER_LEADS.ID%TYPE;
BEGIN
    IF p_demo_mode NOT IN ('online', 'in_person', 'phone_call') THEN
        RAISE_APPLICATION_ERROR(-20060, 'Invalid demo_mode: ' || p_demo_mode);
    END IF;

    IF p_preferred_language NOT IN ('en', 'ta') THEN
        RAISE_APPLICATION_ERROR(-20061, 'Invalid preferred_language: ' || p_preferred_language);
    END IF;

    INSERT INTO CUSTOMER_LEADS (
        LEAD_ID, FULL_NAME, EMAIL, PHONE, SOURCE, STATUS, PREFERRED_LANGUAGE
    ) VALUES (
        p_lead_id, p_full_name, p_email, p_phone, 'demo_request', 'new', p_preferred_language
    )
    RETURNING ID, LEAD_ID INTO v_lead_internal_id, p_lead_id_out;

    INSERT INTO DEMO_REQUESTS (
        LEAD_ID, COMPANY_NAME, BUSINESS_TYPE, INDUSTRY, CITY, STATE,
        BUSINESS_REQUIREMENT, PREFERRED_DEMO_DATE, PREFERRED_DEMO_TIME, DEMO_MODE
    ) VALUES (
        v_lead_internal_id, p_company_name, p_business_type, p_industry, p_city, p_state,
        p_business_requirement, p_preferred_demo_date, p_preferred_demo_time, p_demo_mode
    );

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20062, 'PR_CREATE_DEMO_REQUEST failed: ' || SQLERRM);
END PR_CREATE_DEMO_REQUEST;
/

-- ----------------------------------------------------------------------------
-- PR_LOG_WHATSAPP_MESSAGE
-- Records a WhatsApp message (outbound click-to-chat handoff, or future
-- inbound webhook delivery) against a lead's WHATSAPP_MESSAGES history,
-- preserving which language the message was composed in.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE PR_LOG_WHATSAPP_MESSAGE(
    p_lead_id        IN VARCHAR2,
    p_direction      IN VARCHAR2,
    p_message_text   IN CLOB,
    p_language_code  IN VARCHAR2 DEFAULT 'en'
)
IS
    v_lead_internal_id CUSTOMER_LEADS.ID%TYPE;
BEGIN
    IF p_direction NOT IN ('outbound', 'inbound') THEN
        RAISE_APPLICATION_ERROR(-20070, 'Invalid WhatsApp message direction: ' || p_direction);
    END IF;

    IF p_language_code NOT IN ('en', 'ta') THEN
        RAISE_APPLICATION_ERROR(-20071, 'Invalid language_code: ' || p_language_code);
    END IF;

    BEGIN
        SELECT ID INTO v_lead_internal_id
        FROM CUSTOMER_LEADS
        WHERE LEAD_ID = p_lead_id;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20072, 'No lead found with LEAD_ID: ' || p_lead_id);
    END;

    INSERT INTO WHATSAPP_MESSAGES (LEAD_ID, DIRECTION, MESSAGE_TEXT, LANGUAGE_CODE)
    VALUES (v_lead_internal_id, p_direction, p_message_text, p_language_code);

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END PR_LOG_WHATSAPP_MESSAGE;
/

-- ----------------------------------------------------------------------------
-- PR_UPDATE_LEAD_STATUS / PR_CREATE_FOLLOWUP
-- Thin wrappers over PRC_UPDATE_LEAD_STATUS / PRC_ADD_FOLLOWUP so the
-- procedure names match the SRS naming exactly, without duplicating the
-- validation/transaction logic those two already implement.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE PR_UPDATE_LEAD_STATUS(
    p_lead_id    IN VARCHAR2,
    p_new_status IN VARCHAR2
)
IS
BEGIN
    PRC_UPDATE_LEAD_STATUS(p_lead_id => p_lead_id, p_new_status => p_new_status);
END PR_UPDATE_LEAD_STATUS;
/

CREATE OR REPLACE PROCEDURE PR_CREATE_FOLLOWUP(
    p_lead_id             IN VARCHAR2,
    p_note                IN CLOB,
    p_follow_up_date      IN DATE,
    p_created_by_admin_id IN NUMBER DEFAULT NULL,
    p_status              IN VARCHAR2 DEFAULT 'pending'
)
IS
BEGIN
    PRC_ADD_FOLLOWUP(
        p_lead_id             => p_lead_id,
        p_note                => p_note,
        p_follow_up_date      => p_follow_up_date,
        p_created_by_admin_id => p_created_by_admin_id,
        p_status              => p_status
    );
END PR_CREATE_FOLLOWUP;
/
