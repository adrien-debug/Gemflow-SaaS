package io.hearstcorporation.atelier.model.order.diamon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class OrderDiamondTotal {

    private Integer totalQuantity;
    private BigDecimal totalWeight;
    private BigDecimal totalWeightGrams;
    private BigDecimal totalPrice;
    private BigDecimal totalMarkupPrice;
}
