package io.hearstcorporation.atelier.dto.model.inventory.other;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class OtherMaterialDto {

    private Long id;
    private String name;
    private BigDecimal remainingWeight;
}
