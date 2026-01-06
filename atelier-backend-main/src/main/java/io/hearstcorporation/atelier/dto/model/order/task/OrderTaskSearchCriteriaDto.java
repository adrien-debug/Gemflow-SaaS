package io.hearstcorporation.atelier.dto.model.order.task;

import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderTaskSearchCriteriaDto {

    private String searchInput;
    private Long orderId;
    private List<Long> metalIds;
    private List<Long> cylinderIds;
    private List<OrderTaskStatus> statuses;
}
