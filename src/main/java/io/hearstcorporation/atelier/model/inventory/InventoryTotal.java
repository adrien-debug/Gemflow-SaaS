package io.hearstcorporation.atelier.model.inventory;

import java.math.BigDecimal;

public record InventoryTotal(BigDecimal totalCost, BigDecimal totalWeight, BigDecimal totalWeightGrams,
                             Integer totalQuantity) {
}
