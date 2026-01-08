package io.hearstcorporation.atelier.dto.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogTimeRequestDto {

    @PositiveOrZero
    private Long spentSeconds;

    @NotNull
    private Long employeeId;
}
