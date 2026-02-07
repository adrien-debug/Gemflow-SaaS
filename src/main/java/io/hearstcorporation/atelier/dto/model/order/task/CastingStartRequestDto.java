package io.hearstcorporation.atelier.dto.model.order.task;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CastingStartRequestDto {

    @NotNull
    private Long cylinderId;
}
