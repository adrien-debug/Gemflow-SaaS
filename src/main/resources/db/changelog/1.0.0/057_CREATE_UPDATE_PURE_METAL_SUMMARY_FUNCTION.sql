CREATE OR REPLACE FUNCTION update_pure_metal_summary()
    RETURNS TRIGGER AS '
BEGIN

    UPDATE public.pure_metal_summary
    SET
        total_cost = total_cost + (coalesce(NEW.remaining_price, 0.0) - coalesce(OLD.remaining_price, 0.0)),
        remaining_weight = remaining_weight + (coalesce(NEW.remaining_weight, 0.0) - coalesce(OLD.remaining_weight, 0.0))
    WHERE price_metal_name_id = coalesce(NEW.price_metal_name_id, OLD.price_metal_name_id);

    RETURN NULL;
END;
' LANGUAGE plpgsql;