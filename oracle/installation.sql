-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- installation.sql
--
-- Run this ONCE, as a DBA-privileged user (SYSTEM, ADMIN on Autonomous DB,
-- or SYS), to create the application's dedicated schema/user before
-- running schema.sql. Replace <STRONG_PASSWORD_HERE> with a real secret —
-- never commit an actual password into this file.
--
-- On Oracle Autonomous Database (ATP/ADW), TABLESPACE/QUOTA clauses are
-- managed automatically — skip those two lines there and just run the
-- CREATE USER / GRANT statements.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Create the dedicated application schema/user
-- ----------------------------------------------------------------------------
CREATE USER CORESTONE_APP IDENTIFIED BY "changeme_dev_only";

-- Omit the next line on Autonomous Database (quota is managed for you).
ALTER USER CORESTONE_APP QUOTA UNLIMITED ON USERS;

-- ----------------------------------------------------------------------------
-- 2. Minimum privileges the application needs
-- ----------------------------------------------------------------------------
GRANT CREATE SESSION       TO CORESTONE_APP;
GRANT CREATE TABLE         TO CORESTONE_APP;
GRANT CREATE SEQUENCE      TO CORESTONE_APP;
GRANT CREATE VIEW          TO CORESTONE_APP;
GRANT CREATE PROCEDURE     TO CORESTONE_APP;
GRANT CREATE TRIGGER       TO CORESTONE_APP;
GRANT CREATE TYPE          TO CORESTONE_APP;

-- Needed for PRC_CLOSE_STALE_LEADS to run as a scheduled job (see
-- docs/DATABASE_DESIGN.md for the DBMS_SCHEDULER job definition).
GRANT CREATE JOB           TO CORESTONE_APP;

-- ----------------------------------------------------------------------------
-- 3. Connect as CORESTONE_APP and run schema.sql, then (optionally)
--    sample_data.sql:
--
--        sqlplus CORESTONE_APP/"<STRONG_PASSWORD_HERE>"@<connect_string> @schema.sql
--        sqlplus CORESTONE_APP/"<STRONG_PASSWORD_HERE>"@<connect_string> @sample_data.sql
--
-- 4. Point backend/.env at this schema:
--        ORACLE_USER=CORESTONE_APP
--        ORACLE_PASSWORD=<the same password>
--        ORACLE_DSN=<host>:<port>/<service_name>   (or a wallet TNS alias
--                                                    for Autonomous DB)
--
-- 5. Create the first admin login:
--        cd backend && python -m app.scripts.create_admin \
--            --email you@corestonetech.com --name "Fernandes"
-- ----------------------------------------------------------------------------
