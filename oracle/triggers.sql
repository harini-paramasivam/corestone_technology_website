-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- triggers.sql
--
-- Two trigger families:
--  1. TRG_CUSTOMER_LEADS_LEAD_ID  — backstop lead_id generation (should
--     essentially never fire; the FastAPI app always supplies LEAD_ID).
--  2. TRG_*_UPDATED_AT            — one per table, keeps UPDATED_AT current
--     at the database level as well as the SQLAlchemy onupdate=utcnow the
--     application already sets. Belt-and-suspenders: any row written by
--     something other than the FastAPI app (an APEX process, a direct
--     SQL*Plus fix) still gets a correct UPDATED_AT.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Backstop LEAD_ID generation
-- ----------------------------------------------------------------------------
CREATE OR REPLACE TRIGGER TRG_CUSTOMER_LEADS_LEAD_ID
    BEFORE INSERT ON CUSTOMER_LEADS
    FOR EACH ROW
BEGIN
    IF :NEW.LEAD_ID IS NULL THEN
        :NEW.LEAD_ID := FN_GENERATE_FALLBACK_LEAD_ID();
    END IF;
END;
/

-- ----------------------------------------------------------------------------
-- UPDATED_AT maintenance — one trigger per table
-- ----------------------------------------------------------------------------
CREATE OR REPLACE TRIGGER TRG_BUSINESS_CATEGORIES_UPD
    BEFORE UPDATE ON BUSINESS_CATEGORIES
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER TRG_SERVICES_UPD
    BEFORE UPDATE ON SERVICES
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER TRG_SOFTWARE_FEATURES_UPD
    BEFORE UPDATE ON SOFTWARE_FEATURES
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER TRG_CUSTOMER_LEADS_UPD
    BEFORE UPDATE ON CUSTOMER_LEADS
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER TRG_DEMO_REQUESTS_UPD
    BEFORE UPDATE ON DEMO_REQUESTS
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER TRG_LEAD_FOLLOWUPS_UPD
    BEFORE UPDATE ON LEAD_FOLLOWUPS
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER TRG_WHATSAPP_MESSAGES_UPD
    BEFORE UPDATE ON WHATSAPP_MESSAGES
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER TRG_ADMIN_USERS_UPD
    BEFORE UPDATE ON ADMIN_USERS
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER TRG_ADMIN_REFRESH_TOKENS_UPD
    BEFORE UPDATE ON ADMIN_REFRESH_TOKENS
    FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/
