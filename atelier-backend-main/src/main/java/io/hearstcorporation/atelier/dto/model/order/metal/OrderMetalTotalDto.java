package io.hearstcorporation.atelier.dto.model.order.metal;

import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class OrderMetalTotalDto {

    private Long id;
    private Long orderId;
    private BigDecimal totalCost;
    private BigDecimal priceGram;
    private BigDecimal weightIn;
    private BigDecimal weightOut;
    private MetalDto metal;
    private MetalPurityDto metalPurity;
}
