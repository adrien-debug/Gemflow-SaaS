package io.hearstcorporation.atelier.dto.model.inventory.alloy;

import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class AlloyDto {

    private Long id;
    private String name;
    private BigDecimal totalCost;
    private BigDecimal remainingWeight;
    private MetalDto metal;
}
