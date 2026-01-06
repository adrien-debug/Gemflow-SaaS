package io.hearstcorporation.atelier.dto.model.order.labour;

import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderLabourTrackerStartDto {

    @NotNull
    private LabourTaskType taskType;

    @NotNull
    private Long orderId;
}
