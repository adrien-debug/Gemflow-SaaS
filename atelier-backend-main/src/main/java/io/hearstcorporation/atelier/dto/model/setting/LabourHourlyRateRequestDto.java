package io.hearstcorporation.atelier.dto.model.setting;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class LabourHourlyRateRequestDto {

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal hourlyRate;
}
