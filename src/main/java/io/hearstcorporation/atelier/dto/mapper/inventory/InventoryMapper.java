package io.hearstcorporation.atelier.dto.mapper.inventory;

import io.hearstcorporation.atelier.dto.model.InventoryTotalCostDto;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.model.inventory.InventoryTotal;
import io.hearstcorporation.atelier.model.inventory.InventoryTotalCost;
import lombok.experimental.UtilityClass;

@UtilityClass
public class InventoryMapper {

    public static InventoryTotalDto toInventoryTotalDto(InventoryTotal total) {
        if (total == null) {
            return null;
        }
        return new InventoryTotalDto(total.totalCost(), total.totalWeight(), total.totalWeightGrams(),
                total.totalQuantity());
    }

    public static InventoryTotalCostDto toInventoryTotalCostDto(InventoryTotalCost total) {
        if (total == null) {
            return null;
        }
        return new InventoryTotalCostDto(total.totalCost());
    }
}
