package io.hearstcorporation.atelier.dto.model.inventory.puremetal;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class PureMetalPurchaseDto {

    private Long id;
    private BigDecimal batchWeight;
    private BigDecimal remainingWeight;
    private String barNumber;
    private String coc;
    private LocalDate balanceDate;
    private BigDecimal priceGram;
    private BigDecimal batchPrice;
    private BigDecimal remainingPrice;
    private PriceMetalNameDto priceMetalName;
    private ModelNameDto supplier;
    private AtelierDownloadFileDto invoice;
}
