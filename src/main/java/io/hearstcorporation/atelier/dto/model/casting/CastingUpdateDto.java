package io.hearstcorporation.atelier.dto.model.casting;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CastingUpdateDto {

    @NotNull
    private Long metalPurityId;

    @NotNull
    private Long alloyId;

    private Long alloyedMetalId;

    @Digits(integer = 6, fraction = 2)
    @DecimalMin(value = "0.0")
    private BigDecimal supportWithWaxTreeWeight;

    @Digits(integer = 6, fraction = 2)
    @DecimalMin(value = "0.0")
    private BigDecimal supportWeight;

    @Digits(integer = 6, fraction = 2)
    @DecimalMin(value = "0.0")
    private BigDecimal alloyedMetalWeight;

    @Digits(integer = 6, fraction = 2)
    @DecimalMin(value = "0.0")
    private BigDecimal pureMetalWeight;

    @Digits(integer = 6, fraction = 2)
    @DecimalMin(value = "0.0")
    private BigDecimal alloyWeight;

    @Digits(integer = 6, fraction = 2)
    @DecimalMin(value = "0.0")
    private BigDecimal reuseWeight;
}
