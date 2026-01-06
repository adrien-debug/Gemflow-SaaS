package io.hearstcorporation.atelier.dto.mapper.inventory.puremetal;

import io.hearstcorporation.atelier.dto.mapper.setting.PriceMetalNameMapper;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalSummaryDto;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalSummary;
import io.hearstcorporation.atelier.util.PercentageHelper;
import lombok.experimental.UtilityClass;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@UtilityClass
public class PureMetalSummaryMapper {

    public static PureMetalSummaryDto toPureMetalSummaryDto(PureMetalSummary entity, BigDecimal priceGram) {
        if (entity == null) {
            return null;
        }
        BigDecimal currentTotalCost = entity.getRemainingWeight().multiply(priceGram);
        return PureMetalSummaryDto.builder()
                .id(entity.getId())
                .totalCost(entity.getTotalCost())
                .currentTotalCost(currentTotalCost)
                .remainingWeight(entity.getRemainingWeight())
                .currentCostPercentageDifference(PercentageHelper.calculateDifferencePercentage(entity.getTotalCost(), currentTotalCost))
                .priceGram(priceGram)
                .priceMetalName(PriceMetalNameMapper.toPriceMetalNameDto(entity.getPriceMetalName()))
                .build();
    }

    public static List<PureMetalSummaryDto> toPureMetalSummaryDtoList(List<PureMetalSummary> entities,
                                                                      Map<Long, BigDecimal> currentPriceMetalRatesMap) {
        return entities.stream().map(pms -> {
            BigDecimal priceMetalRate = currentPriceMetalRatesMap.getOrDefault(pms.getPriceMetalName().getId(), BigDecimal.ZERO);
            return PureMetalSummaryMapper.toPureMetalSummaryDto(pms, priceMetalRate);
        }).toList();
    }
}
