package io.hearstcorporation.atelier.model.order.task;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class OrderTaskMetalId {

    private Long orderTaskId;
    private Long metalId;
}
