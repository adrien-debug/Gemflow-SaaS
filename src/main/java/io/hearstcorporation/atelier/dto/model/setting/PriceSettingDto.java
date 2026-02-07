package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class PriceSettingDto {

    private Long id;
    private LocalDate updateDate;
    private List<PriceMetalDto> priceMetals;
    private BigDecimal dirhamConversionRate;
    private BigDecimal euroConversionRate;
    private BigDecimal poundConversionRate;
}
