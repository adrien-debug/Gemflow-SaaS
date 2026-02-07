package io.hearstcorporation.atelier.dto.model.order.metal;

import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class OrderMetalProductionSummaryDto {

    private final MetalDto metal;
    private final MetalPurityDto metalPurity;
    private final BigDecimal totalWeight;
    private final BigDecimal totalCost;
    private final List<OrderMetalProductionDto> otherMetalProductions;

    public OrderMetalProductionSummaryDto(MetalDto metal, MetalPurityDto metalPurity, List<OrderMetalProductionDto> otherMetalProductions) {
        this.metal = metal;
        this.metalPurity = metalPurity;
        this.otherMetalProductions = otherMetalProductions;
        this.totalWeight = otherMetalProductions.stream().map(OrderMetalProductionDto::getWeight).reduce(BigDecimal.ZERO, BigDecimal::add);
        this.totalCost = otherMetalProductions.stream().map(OrderMetalProductionDto::getCost).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
