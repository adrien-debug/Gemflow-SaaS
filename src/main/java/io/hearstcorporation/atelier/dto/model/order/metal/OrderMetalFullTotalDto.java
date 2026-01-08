package io.hearstcorporation.atelier.dto.model.order.metal;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class OrderMetalFullTotalDto {

    private Long orderId;
    private BigDecimal totalCost;
    private BigDecimal totalWeightIn;
    private BigDecimal totalWeightOut;
}
