package io.hearstcorporation.atelier.model.order.task;

import io.hearstcorporation.atelier.model.setting.Metal;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "order_task_metal")
public class OrderTaskMetal {

    @EmbeddedId
    private OrderTaskMetalId orderTaskMetalId;

    @MapsId("orderTaskId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_task_id", nullable = false)
    private OrderTask orderTask;

    @MapsId("metalId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_id", nullable = false)
    private Metal metal;
}
