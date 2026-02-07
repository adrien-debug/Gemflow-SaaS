package io.hearstcorporation.atelier.model.order.stock;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class OrderStockTotal {

    private Long totalCount;
    private BigDecimal totalCost;
    private BigDecimal totalAdjustedCost;
}
