package io.hearstcorporation.atelier.dto.model.order.stock;

import java.math.BigDecimal;

public record OrderStockTotalDto(Long totalCount, BigDecimal totalCost, BigDecimal totalAdjustedCost) {

}
