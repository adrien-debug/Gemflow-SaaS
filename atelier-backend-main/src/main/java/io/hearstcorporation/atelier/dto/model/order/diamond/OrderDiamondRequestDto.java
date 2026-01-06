package io.hearstcorporation.atelier.dto.model.order.diamond;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDiamondRequestDto extends OrderDiamondUpdateDto {

    @NotNull
    private Long diamondId;

    @NotNull
    private Long orderId;
}
