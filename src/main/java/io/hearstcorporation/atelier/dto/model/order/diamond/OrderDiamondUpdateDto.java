package io.hearstcorporation.atelier.dto.model.order.diamond;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OrderDiamondUpdateDto extends OrderDiamondQuantityUpdateDto {

    @NotNull
    private Long employeeId;

    @NotNull
    private LocalDate date;
}
