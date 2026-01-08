package io.hearstcorporation.atelier.model.order.labour;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "order_labour")
public class OrderLabour extends BaseModel {

    @Enumerated(EnumType.STRING)
    @Column(name = "task_type", nullable = false)
    private LabourTaskType taskType;

    @Column(name = "spent_seconds", nullable = false)
    private Long spentSeconds;

    @Column(name = "tracking_date", nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
}
