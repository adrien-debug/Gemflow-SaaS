package io.hearstcorporation.atelier.dto.model.inventory.puremetal;

import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class PureMetalSummaryDto {

    private Long id;
    private BigDecimal totalCost;
    private BigDecimal currentTotalCost;
    private BigDecimal remainingWeight;
    private BigDecimal priceGram;
    private BigDecimal currentCostPercentageDifference;
    private PriceMetalNameDto priceMetalName;
}
