package io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class AlloyedMetalPurchaseDto {

    private Long id;
    private LocalDate balanceDate;
    private BigDecimal priceGram;
    private BigDecimal batchWeight;
    private BigDecimal remainingWeight;
    private BigDecimal batchPrice;
    private BigDecimal remainingPrice;
    private Long castingId;
    private ModelNameDto alloy;
    private ModelNameDto alloyedMetal;
}
