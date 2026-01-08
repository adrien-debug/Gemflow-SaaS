package io.hearstcorporation.atelier.model.order.diamon;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
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
import org.hibernate.annotations.Generated;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "order_diamond")
public class OrderDiamond extends BaseModel {

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "markup_percentage", updatable = false, precision = 5, scale = 2)
    private BigDecimal markupPercentage;

    @Generated
    @Column(name = "markup_percentage_value", insertable = false, updatable = false)
    private BigDecimal markupPercentageValue;

    @Column(name = "date")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 50, nullable = false)
    private OrderDiamondStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diamond_id", nullable = false, updatable = false)
    private Diamond diamond;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private User employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, updatable = false)
    private Order order;
}
