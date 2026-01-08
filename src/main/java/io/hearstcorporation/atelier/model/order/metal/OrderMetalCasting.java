package io.hearstcorporation.atelier.model.order.metal;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "order_metal_casting")
@EntityListeners(AuditingEntityListener.class)
public class OrderMetalCasting extends BaseModel {

    @Column(name = "cost", nullable = false, updatable = false, precision = 13, scale = 3)
    private BigDecimal cost;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "casting_id", nullable = false, updatable = false)
    private Casting casting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_task_id", nullable = false, updatable = false)
    private OrderTask orderTask;
}
