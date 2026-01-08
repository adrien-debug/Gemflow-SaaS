package io.hearstcorporation.atelier.dto.model.order.diamond;

import java.math.BigDecimal;

public record OrderDiamondTotalDto(Integer totalQuantity, BigDecimal totalWeight, BigDecimal totalWeightGrams,
                                   BigDecimal totalPrice, BigDecimal totalMarkupPrice) {

}
