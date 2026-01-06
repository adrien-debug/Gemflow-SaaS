package io.hearstcorporation.atelier.dto.model.order.labour;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderLabourRequestDto extends OrderLabourUpdateDto {

    @NotNull
    private Long orderId;
}
