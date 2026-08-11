-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- functions.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- FN_GENERATE_FALLBACK_LEAD_ID
-- Backstop lead_id generator (see sequences.sql). Format matches the
-- application layer's own scheme closely enough to be visually
-- recognizable as a lead ID: CS-YYYYMM-<6-digit sequence>.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION FN_GENERATE_FALLBACK_LEAD_ID
    RETURN VARCHAR2
IS
    v_lead_id VARCHAR2(32);
BEGIN
    SELECT 'CS-' || TO_CHAR(SYSDATE, 'YYYYMM') || '-' ||
           LPAD(TO_CHAR(CORESTONE_LEAD_FALLBACK_SEQ.NEXTVAL), 6, '0')
    INTO v_lead_id
    FROM DUAL;

    RETURN v_lead_id;
END FN_GENERATE_FALLBACK_LEAD_ID;
/

-- ----------------------------------------------------------------------------
-- FN_LEAD_CONVERSION_RATE
-- Percentage of leads created in [p_start_date, p_end_date] that reached
-- status = 'converted'. Powers the "Lead Conversion" report (SRS Reports
-- section) and the equivalent Oracle APEX dashboard chart.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION FN_LEAD_CONVERSION_RATE(
    p_start_date IN DATE,
    p_end_date   IN DATE
) RETURN NUMBER
IS
    v_total_count     NUMBER := 0;
    v_converted_count NUMBER := 0;
    v_rate            NUMBER := 0;
BEGIN
    SELECT COUNT(*)
    INTO v_total_count
    FROM CUSTOMER_LEADS
    WHERE TRUNC(CREATED_AT) BETWEEN TRUNC(p_start_date) AND TRUNC(p_end_date);

    IF v_total_count = 0 THEN
        RETURN 0;
    END IF;

    SELECT COUNT(*)
    INTO v_converted_count
    FROM CUSTOMER_LEADS
    WHERE TRUNC(CREATED_AT) BETWEEN TRUNC(p_start_date) AND TRUNC(p_end_date)
      AND STATUS = 'converted';

    v_rate := ROUND((v_converted_count / v_total_count) * 100, 2);
    RETURN v_rate;
EXCEPTION
    WHEN ZERO_DIVIDE THEN
        RETURN 0;
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20010, 'FN_LEAD_CONVERSION_RATE failed: ' || SQLERRM);
END FN_LEAD_CONVERSION_RATE;
/

-- ----------------------------------------------------------------------------
-- FN_GET_LEAD_AGE_DAYS
-- Days elapsed since a lead was created, by business-key LEAD_ID. Used by
-- the admin portal's follow-up prioritization view.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION FN_GET_LEAD_AGE_DAYS(
    p_lead_id IN VARCHAR2
) RETURN NUMBER
IS
    v_created_at CUSTOMER_LEADS.CREATED_AT%TYPE;
BEGIN
    SELECT CREATED_AT
    INTO v_created_at
    FROM CUSTOMER_LEADS
    WHERE LEAD_ID = p_lead_id;

    RETURN TRUNC(SYSTIMESTAMP) - TRUNC(v_created_at);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20011, 'No lead found with LEAD_ID: ' || p_lead_id);
END FN_GET_LEAD_AGE_DAYS;
/

-- ----------------------------------------------------------------------------
-- FN_GET_LEAD_COUNT
-- Flexible lead counter used by the APEX dashboard's summary tiles and by
-- ad-hoc reporting. All filters are optional (NULL = "don't filter on
-- this"); p_language filters on PREFERRED_LANGUAGE so the admin portal can
-- show "English enquiries" vs "Tamil enquiries" counts separately.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION FN_GET_LEAD_COUNT(
    p_status     IN VARCHAR2 DEFAULT NULL,
    p_source     IN VARCHAR2 DEFAULT NULL,
    p_language   IN VARCHAR2 DEFAULT NULL,
    p_start_date IN DATE DEFAULT NULL,
    p_end_date   IN DATE DEFAULT NULL
) RETURN NUMBER
IS
    v_count NUMBER := 0;
BEGIN
    SELECT COUNT(*)
    INTO v_count
    FROM CUSTOMER_LEADS
    WHERE (p_status IS NULL OR STATUS = p_status)
      AND (p_source IS NULL OR SOURCE = p_source)
      AND (p_language IS NULL OR PREFERRED_LANGUAGE = p_language)
      AND (p_start_date IS NULL OR TRUNC(CREATED_AT) >= TRUNC(p_start_date))
      AND (p_end_date IS NULL OR TRUNC(CREATED_AT) <= TRUNC(p_end_date));

    RETURN v_count;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20012, 'FN_GET_LEAD_COUNT failed: ' || SQLERRM);
END FN_GET_LEAD_COUNT;
/
