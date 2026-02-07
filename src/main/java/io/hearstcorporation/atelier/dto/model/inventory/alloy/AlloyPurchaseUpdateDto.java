package io.hearstcorporation.atelier.dto.model.inventory.alloy;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class AlloyPurchaseUpdateDto {

    @NotNull
    private LocalDate balanceDate;

    @NotNull
    @Digits(integer = 6, fraction = 5)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal batchWeight;

    @NotNull
    @Digits(integer = 10, fraction = 3)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal priceGram;

    @NotNull
    private Long supplierId;

    private Long invoiceId;
}
