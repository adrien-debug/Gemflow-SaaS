package io.hearstcorporation.atelier.dto.model.setting;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PriceMetalRequestDto {

    @NotNull
    private Long priceMetalNameId;

    //todo: make all the prices with the same format integer = ?, fraction = 3
    @NotNull
    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal rate;
}
