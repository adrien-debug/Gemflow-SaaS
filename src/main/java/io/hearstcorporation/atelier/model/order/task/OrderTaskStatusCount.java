package io.hearstcorporation.atelier.model.order.task;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderTaskStatusCount {

    private OrderTaskStatus status;
    private long count;
}
