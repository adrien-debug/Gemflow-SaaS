CREATE OR REPLACE FUNCTION update_alloy_summary()
    RETURNS TRIGGER AS '
BEGIN

    UPDATE public.alloy
    SET
        total_cost = total_cost + (coalesce(NEW.remaining_price, 0.0) - coalesce(OLD.remaining_price, 0.0)),
        remaining_weight = remaining_weight + (coalesce(NEW.remaining_weight, 0.0) - coalesce(OLD.remaining_weight, 0.0))
    WHERE id = coalesce(NEW.alloy_id, OLD.alloy_id);

    RETURN NULL;
END;
' LANGUAGE plpgsql;