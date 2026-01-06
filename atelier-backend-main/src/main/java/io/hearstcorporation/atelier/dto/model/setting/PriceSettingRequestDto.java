package io.hearstcorporation.atelier.dto.model.setting;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PriceSettingRequestDto {

    @Valid
    private List<PriceMetalRequestDto> priceMetals = new ArrayList<>();

    @NotNull
    @Digits(integer = 4, fraction = 3)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal dirhamConversionRate;

    @NotNull
    @Digits(integer = 4, fraction = 3)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal euroConversionRate;

    @NotNull
    @Digits(integer = 4, fraction = 3)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal poundConversionRate;
}
