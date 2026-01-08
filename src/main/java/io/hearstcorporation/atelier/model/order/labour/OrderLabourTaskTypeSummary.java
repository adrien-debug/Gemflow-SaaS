package io.hearstcorporation.atelier.model.order.labour;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderLabourTaskTypeSummary {

    private LabourTaskType taskType;
    private Long totalTimeSpent;
}
