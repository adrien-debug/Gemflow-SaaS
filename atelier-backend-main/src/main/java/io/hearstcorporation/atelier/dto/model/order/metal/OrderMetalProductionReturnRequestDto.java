package io.hearstcorporation.atelier.dto.model.order.metal;

import io.hearstcorporation.atelier.model.order.metal.OrderMetalProductionMaterialType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderMetalProductionReturnRequestDto {

    @NotNull
    private Long metalId;

    @NotNull
    private Long metalPurityId;

    @NotNull
    private OrderMetalProductionMaterialType materialType;

    // Can be alloyedMetalId for materialType = ALLOYED_METAL
    // Can be otherMaterialId for materialType = OTHER
    @NotNull
    private Long materialId;

    // Required only for materialType = ALLOYED_METAL
    private Long alloyId;

    @NotNull
    @Digits(integer = 6, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal weight;

    @NotNull
    private Long employeeId;
}
