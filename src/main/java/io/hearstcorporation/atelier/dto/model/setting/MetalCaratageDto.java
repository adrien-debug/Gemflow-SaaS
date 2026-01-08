package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class MetalCaratageDto {

    private Long id;
    private String name;
    private PriceMetalNameDto priceMetalName;
    private BigDecimal waxCastingValue;
    private List<MetalDto> metals;
    private List<MetalPurityDto> metalPurities;
}
