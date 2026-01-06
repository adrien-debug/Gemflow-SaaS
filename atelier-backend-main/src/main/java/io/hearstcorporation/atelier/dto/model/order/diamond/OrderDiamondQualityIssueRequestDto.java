package io.hearstcorporation.atelier.dto.model.order.diamond;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDiamondQualityIssueRequestDto {

    @NotNull
    @Min(value = 1)
    private Integer quantity;

    @NotNull
    private Long diamondId;

    @NotNull
    private Long orderId;
}
