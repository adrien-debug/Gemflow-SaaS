package io.hearstcorporation.atelier.dto.model.order;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProfitPatchDto {

    @NotNull
    @PositiveOrZero
    @Max(value = 1000)
    private Short profitPercentage;
}
