package io.hearstcorporation.atelier.dto.model.setting;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class LabourSettingCostRequestDto {

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal cutDownPaveCost;

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal clawCost;

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal centerCost;

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal shoulderCost;

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal ruboverCost;

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal channelCost;
}
