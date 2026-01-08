package io.hearstcorporation.atelier.dto.model.inventory.other;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class OtherMaterialTransactionDto {

    private Long id;
    private LocalDate balanceDate;
    private String description;
    private BigDecimal batchWeight;
    private ModelNameDto order;
    private OtherMaterialDto otherMaterial;
}
