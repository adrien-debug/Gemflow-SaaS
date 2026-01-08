package io.hearstcorporation.atelier.dto.model.order.metal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderMetalProductionUsageRequestDto {

    @NotNull
    private Long alloyedMetalId;

    @NotNull
    @Digits(integer = 6, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal weight;

    @NotNull
    private Long employeeId;
}
