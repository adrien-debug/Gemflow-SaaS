package io.hearstcorporation.atelier.dto.model.inventory.other;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class OtherMaterialTransactionRequestDto extends OtherMaterialTransactionUpdateDto {

    @NotNull
    private LocalDate balanceDate;

    @NotNull
    private Long otherMaterialId;

    @NotNull
    @Digits(integer = 6, fraction = 5)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal batchWeight;

    private Long orderId;
}
