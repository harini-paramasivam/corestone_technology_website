-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- schema.sql  (master orchestrator)
--
-- Run this as the schema owner (see installation.sql for creating that
-- user/schema first) via SQL*Plus or SQLcl:
--
--     sqlplus corestone_app/<password>@<connect_string> @schema.sql
--
-- Order matters: tables before anything that references them; sequences
-- before the trigger that uses one; functions before the procedures/
-- package that call them; views last (they query everything else).
-- ============================================================================

SET DEFINE OFF
SET SERVEROUTPUT ON SIZE UNLIMITED
WHENEVER SQLERROR CONTINUE

PROMPT ===================================================
PROMPT CoreStone Technologies — Oracle schema installation
PROMPT ===================================================

PROMPT --- 1/9 tables.sql ---
@@tables.sql

PROMPT --- 2/9 sequences.sql ---
@@sequences.sql

PROMPT --- 3/9 constraints.sql ---
@@constraints.sql

PROMPT --- 4/9 indexes.sql ---
@@indexes.sql

PROMPT --- 5/9 functions.sql ---
@@functions.sql

PROMPT --- 6/9 procedures.sql ---
@@procedures.sql

PROMPT --- 7/9 packages.sql ---
@@packages.sql

PROMPT --- 8/9 triggers.sql ---
@@triggers.sql

PROMPT --- 9/9 views.sql ---
@@views.sql

PROMPT ===================================================
PROMPT Schema objects created. Run sample_data.sql separately
PROMPT if you want seed data (recommended for dev/staging,
PROMPT optional for production).
PROMPT ===================================================
