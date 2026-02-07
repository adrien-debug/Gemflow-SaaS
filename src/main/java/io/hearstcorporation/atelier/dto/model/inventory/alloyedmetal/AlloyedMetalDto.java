package io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class AlloyedMetalDto {

    private Long id;
    private String name;
    private BigDecimal totalCost;
    private BigDecimal remainingWeight;
    private MetalDto metal;
    private MetalPurityDto metalPurity;
}
