package io.hearstcorporation.atelier.dto.model.inventory;

import java.math.BigDecimal;

public record InventoryTotalDto(BigDecimal totalCost, BigDecimal totalWeight, BigDecimal totalWeightGrams,
                                Integer totalQuantity) {
}
