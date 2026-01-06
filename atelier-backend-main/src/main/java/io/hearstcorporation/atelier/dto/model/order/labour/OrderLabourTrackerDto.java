package io.hearstcorporation.atelier.dto.model.order.labour;

import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderLabourTrackerDto {

    private LabourTaskType taskType;
    private Long orderId;
    private Long totalSeconds;
}
