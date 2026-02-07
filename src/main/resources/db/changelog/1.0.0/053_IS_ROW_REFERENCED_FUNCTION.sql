CREATE OR REPLACE FUNCTION is_row_referenced(
    p_table_name text,
    p_column_name text,
    p_value anyelement
) RETURNS boolean AS
'
    DECLARE
        fk_record record;
        result    boolean;
    BEGIN
        FOR fk_record IN
            SELECT conrelid::regclass AS referencing_table,
                   a.attname          AS referencing_column
            FROM pg_constraint c
                     JOIN pg_attribute a ON a.attnum = ANY (c.conkey) AND a.attrelid = c.conrelid
                     JOIN pg_attribute af ON af.attnum = ANY (c.confkey) AND af.attrelid = c.confrelid
            WHERE c.confrelid = p_table_name::regclass
              AND c.contype = ''f''
              AND af.attname = p_column_name
            LOOP
                EXECUTE format(''SELECT EXISTS (SELECT 1 FROM %s WHERE %I = $1)'',
                               fk_record.referencing_table, fk_record.referencing_column)
                    INTO result USING p_value;

                IF result THEN
                    RETURN TRUE;
                END IF;
            END LOOP;

        RETURN FALSE;
    END;
'
    LANGUAGE plpgsql;