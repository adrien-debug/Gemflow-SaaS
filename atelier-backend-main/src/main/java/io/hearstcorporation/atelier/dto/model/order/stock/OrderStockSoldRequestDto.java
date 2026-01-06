package io.hearstcorporation.atelier.dto.model.order.stock;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OrderStockSoldRequestDto {

    @NotNull
    private Long clientId;

    @NotNull
    private LocalDate saleDate;
}
