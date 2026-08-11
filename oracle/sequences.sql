-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- sequences.sql
--
-- Lead IDs are generated at the application layer by default (see
-- backend/app/utils/lead_id.py: format CS-YYYYMM-<6 hex chars>), so no
-- surrogate-key sequence is needed here — IDENTITY columns (tables.sql)
-- cover every table's numeric primary key.
--
-- This sequence exists purely as a defense-in-depth BACKSTOP: if a row is
-- ever inserted into CUSTOMER_LEADS with LEAD_ID left NULL (the
-- application should never do this), the BEFORE INSERT trigger in
-- triggers.sql uses this sequence to generate a fallback lead_id instead
-- of the insert failing on the NOT NULL constraint. In normal operation
-- this sequence should almost never be touched.
-- ============================================================================

CREATE SEQUENCE CORESTONE_LEAD_FALLBACK_SEQ
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;
