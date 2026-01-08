package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.setting.PriceMetalDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalRequestDto;
import io.hearstcorporation.atelier.model.setting.PriceSetting;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface PriceMetalService {

    List<PriceMetalDto> getPriceMetalDtoList(Long priceSettingId);

    void updatePriceMetals(PriceSetting priceSetting, List<PriceMetalRequestDto> priceMetalRequestDtoList);

    BigDecimal getCurrentPriceMetalRate(Long priceMetalNameId);

    Map<Long, BigDecimal> getCurrentPriceMetalRatesGroupedByPriceMetalNameId(List<Long> priceMetalNameIds);
}
