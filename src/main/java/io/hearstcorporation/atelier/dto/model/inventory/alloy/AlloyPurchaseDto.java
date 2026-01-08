package io.hearstcorporation.atelier.dto.model.inventory.alloy;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class AlloyPurchaseDto {

    private Long id;
    private LocalDate balanceDate;
    private BigDecimal priceGram;
    private BigDecimal batchWeight;
    private BigDecimal remainingWeight;
    private BigDecimal batchPrice;
    private BigDecimal remainingPrice;
    private AlloyDto alloy;
    private ModelNameDto supplier;
    private AtelierDownloadFileDto invoice;
}
