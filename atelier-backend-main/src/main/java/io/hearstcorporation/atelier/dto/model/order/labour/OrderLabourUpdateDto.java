package io.hearstcorporation.atelier.dto.model.order.labour;

import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OrderLabourUpdateDto {

    @NotNull
    private LabourTaskType taskType;

    @NotNull
    @Min(value = 1)
    private Long spentSeconds;

    @NotNull
    private LocalDate date;

    @NotNull
    private Long employeeId;
}
