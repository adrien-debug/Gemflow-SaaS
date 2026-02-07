CREATE OR REPLACE FUNCTION update_alloyed_metal_summary()
    RETURNS TRIGGER AS '
    BEGIN

        UPDATE public.alloyed_metal
        SET
            total_cost = total_cost + (coalesce(NEW.remaining_price, 0.0) - coalesce(OLD.remaining_price, 0.0)),
            remaining_weight = remaining_weight + (coalesce(NEW.remaining_weight, 0.0) - coalesce(OLD.remaining_weight, 0.0))
        WHERE id = coalesce(NEW.alloyed_metal_id, OLD.alloyed_metal_id);

        RETURN NULL;
    END;
' LANGUAGE plpgsql;