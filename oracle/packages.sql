-- ============================================================================
-- CoreStone Technologies — Oracle Database
-- packages.sql
--
-- CORESTONE_LEAD_PKG groups every lead-related operation under one
-- namespace — the form Oracle APEX page processes typically call
-- (PKG.PROCEDURE(...)) instead of loose schema-level procedures. Every
-- package member delegates to the standalone procedure/function already
-- defined in procedures.sql/functions.sql rather than re-implementing the
-- logic, so there is exactly one place each business rule lives.
-- ============================================================================

CREATE OR REPLACE PACKAGE CORESTONE_LEAD_PKG AS

    PROCEDURE CREATE_LEAD(
        p_full_name          IN VARCHAR2,
        p_email              IN VARCHAR2,
        p_phone              IN VARCHAR2,
        p_message            IN CLOB DEFAULT NULL,
        p_source             IN VARCHAR2 DEFAULT 'contact_form',
        p_preferred_language IN VARCHAR2 DEFAULT 'en',
        p_lead_id_out        OUT VARCHAR2
    );

    PROCEDURE CREATE_DEMO_REQUEST(
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
        p_lead_id_out           OUT VARCHAR2
    );

    PROCEDURE UPDATE_LEAD_STATUS(
        p_lead_id    IN VARCHAR2,
        p_new_status IN VARCHAR2
    );

    PROCEDURE ADD_FOLLOWUP(
        p_lead_id             IN VARCHAR2,
        p_note                IN CLOB,
        p_follow_up_date      IN DATE,
        p_created_by_admin_id IN NUMBER DEFAULT NULL,
        p_status              IN VARCHAR2 DEFAULT 'pending'
    );

    PROCEDURE LOG_WHATSAPP_MESSAGE(
        p_lead_id       IN VARCHAR2,
        p_direction     IN VARCHAR2,
        p_message_text  IN CLOB,
        p_language_code IN VARCHAR2 DEFAULT 'en'
    );

    FUNCTION GET_LEAD_COUNT(
        p_status     IN VARCHAR2 DEFAULT NULL,
        p_source     IN VARCHAR2 DEFAULT NULL,
        p_language   IN VARCHAR2 DEFAULT NULL,
        p_start_date IN DATE DEFAULT NULL,
        p_end_date   IN DATE DEFAULT NULL
    ) RETURN NUMBER;

    FUNCTION GET_CONVERSION_RATE(
        p_start_date IN DATE,
        p_end_date   IN DATE
    ) RETURN NUMBER;

END CORESTONE_LEAD_PKG;
/

CREATE OR REPLACE PACKAGE BODY CORESTONE_LEAD_PKG AS

    PROCEDURE CREATE_LEAD(
        p_full_name          IN VARCHAR2,
        p_email              IN VARCHAR2,
        p_phone              IN VARCHAR2,
        p_message            IN CLOB DEFAULT NULL,
        p_source             IN VARCHAR2 DEFAULT 'contact_form',
        p_preferred_language IN VARCHAR2 DEFAULT 'en',
        p_lead_id_out        OUT VARCHAR2
    ) IS
    BEGIN
        PR_CREATE_LEAD(
            p_full_name          => p_full_name,
            p_email              => p_email,
            p_phone              => p_phone,
            p_message            => p_message,
            p_source             => p_source,
            p_preferred_language => p_preferred_language,
            p_lead_id            => NULL,
            p_lead_id_out        => p_lead_id_out
        );
    END CREATE_LEAD;

    PROCEDURE CREATE_DEMO_REQUEST(
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
        p_lead_id_out           OUT VARCHAR2
    ) IS
    BEGIN
        PR_CREATE_DEMO_REQUEST(
            p_full_name            => p_full_name,
            p_company_name         => p_company_name,
            p_business_type        => p_business_type,
            p_industry             => p_industry,
            p_email                => p_email,
            p_phone                => p_phone,
            p_city                 => p_city,
            p_state                => p_state,
            p_business_requirement => p_business_requirement,
            p_preferred_demo_date  => p_preferred_demo_date,
            p_preferred_demo_time  => p_preferred_demo_time,
            p_demo_mode            => p_demo_mode,
            p_preferred_language   => p_preferred_language,
            p_lead_id              => NULL,
            p_lead_id_out          => p_lead_id_out
        );
    END CREATE_DEMO_REQUEST;

    PROCEDURE UPDATE_LEAD_STATUS(
        p_lead_id    IN VARCHAR2,
        p_new_status IN VARCHAR2
    ) IS
    BEGIN
        PR_UPDATE_LEAD_STATUS(p_lead_id => p_lead_id, p_new_status => p_new_status);
    END UPDATE_LEAD_STATUS;

    PROCEDURE ADD_FOLLOWUP(
        p_lead_id             IN VARCHAR2,
        p_note                IN CLOB,
        p_follow_up_date      IN DATE,
        p_created_by_admin_id IN NUMBER DEFAULT NULL,
        p_status              IN VARCHAR2 DEFAULT 'pending'
    ) IS
    BEGIN
        PR_CREATE_FOLLOWUP(
            p_lead_id             => p_lead_id,
            p_note                => p_note,
            p_follow_up_date      => p_follow_up_date,
            p_created_by_admin_id => p_created_by_admin_id,
            p_status              => p_status
        );
    END ADD_FOLLOWUP;

    PROCEDURE LOG_WHATSAPP_MESSAGE(
        p_lead_id       IN VARCHAR2,
        p_direction     IN VARCHAR2,
        p_message_text  IN CLOB,
        p_language_code IN VARCHAR2 DEFAULT 'en'
    ) IS
    BEGIN
        PR_LOG_WHATSAPP_MESSAGE(
            p_lead_id       => p_lead_id,
            p_direction     => p_direction,
            p_message_text  => p_message_text,
            p_language_code => p_language_code
        );
    END LOG_WHATSAPP_MESSAGE;

    FUNCTION GET_LEAD_COUNT(
        p_status     IN VARCHAR2 DEFAULT NULL,
        p_source     IN VARCHAR2 DEFAULT NULL,
        p_language   IN VARCHAR2 DEFAULT NULL,
        p_start_date IN DATE DEFAULT NULL,
        p_end_date   IN DATE DEFAULT NULL
    ) RETURN NUMBER IS
    BEGIN
        RETURN FN_GET_LEAD_COUNT(
            p_status     => p_status,
            p_source     => p_source,
            p_language   => p_language,
            p_start_date => p_start_date,
            p_end_date   => p_end_date
        );
    END GET_LEAD_COUNT;

    FUNCTION GET_CONVERSION_RATE(
        p_start_date IN DATE,
        p_end_date   IN DATE
    ) RETURN NUMBER IS
    BEGIN
        RETURN FN_LEAD_CONVERSION_RATE(p_start_date => p_start_date, p_end_date => p_end_date);
    END GET_CONVERSION_RATE;

END CORESTONE_LEAD_PKG;
/
