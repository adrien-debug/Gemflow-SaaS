package io.hearstcorporation.atelier.dto.model.order;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProductionFinishRequestDto {

    @NotNull
    private Long locationId;
}
