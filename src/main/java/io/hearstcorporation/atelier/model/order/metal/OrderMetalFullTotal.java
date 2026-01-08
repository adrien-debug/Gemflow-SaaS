package io.hearstcorporation.atelier.model.order.metal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class OrderMetalFullTotal {

    private Long orderId;
    private BigDecimal totalCost;
    private BigDecimal totalWeightIn;
    private BigDecimal totalWeightOut;
}
