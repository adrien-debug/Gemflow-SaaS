CREATE OR REPLACE FUNCTION update_other_material_summary()
    RETURNS TRIGGER AS '
    BEGIN

        UPDATE public.other_material
        SET
            remaining_weight = remaining_weight + (coalesce(NEW.batch_weight, 0.0) - coalesce(OLD.batch_weight, 0.0))
        WHERE id = coalesce(NEW.other_material_id, OLD.other_material_id);

        RETURN NULL;
    END;
' LANGUAGE plpgsql;