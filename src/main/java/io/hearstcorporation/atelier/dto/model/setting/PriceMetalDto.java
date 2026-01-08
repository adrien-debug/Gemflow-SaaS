package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class PriceMetalDto {

    private PriceMetalNameDto priceMetalName;
    private BigDecimal rate;
}
