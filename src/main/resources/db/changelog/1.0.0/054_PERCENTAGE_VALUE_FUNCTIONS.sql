CREATE
OR REPLACE FUNCTION percentage_value(percentage numeric)
    RETURNS numeric
LANGUAGE SQL
IMMUTABLE
RETURNS NULL ON NULL INPUT
RETURN percentage * 0.01;

CREATE
OR REPLACE FUNCTION markup_percentage_value(percentage numeric)
    RETURNS numeric
LANGUAGE SQL
IMMUTABLE
RETURNS NULL ON NULL INPUT
RETURN (1 + percentage_value(percentage));