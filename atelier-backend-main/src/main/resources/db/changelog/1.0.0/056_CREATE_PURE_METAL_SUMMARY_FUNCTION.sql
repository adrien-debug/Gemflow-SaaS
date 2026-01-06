CREATE OR REPLACE FUNCTION create_pure_metal_summary()
    RETURNS TRIGGER AS
'BEGIN
    INSERT INTO pure_metal_summary (
        total_cost,
        current_total_cost,
        remaining_weight,
        price_metal_name_id
    ) VALUES (
                 0.000,               -- Default total_cost
                 0.000,               -- Default current_total_cost
                 0.00000,             -- Default remaining_weight
                 NEW.id
             );

    RETURN NEW;
END;'
  LANGUAGE plpgsql;