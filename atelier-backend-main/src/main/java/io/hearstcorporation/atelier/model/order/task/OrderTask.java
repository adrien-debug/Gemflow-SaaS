package io.hearstcorporation.atelier.model.order.task;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.setting.Metal;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "order_task")
@EntityListeners(AuditingEntityListener.class)
public class OrderTask extends BaseModel {

    @Column(name = "stl_count")
    private Integer stlCount;

    @Column(name = "weight", precision = 8, scale = 2)
    private BigDecimal weight;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 24)
    private OrderTaskStatus status;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "casting_id")
    private Casting casting;

    @OrderBy("id")
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "order_task_metal",
            joinColumns = {@JoinColumn(name = "order_task_id")},
            inverseJoinColumns = {@JoinColumn(name = "metal_id")}
    )
    private List<Metal> metals;

    @OrderBy("id")
    @OneToMany(mappedBy = "orderTask", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderTaskImage> orderTaskImages;

    public OrderTask() {
        this.status = OrderTaskStatus.READY_FOR_CAD;
    }

    public OrderTask(OrderTaskStatus status) {
        this.status = status;
    }
}
