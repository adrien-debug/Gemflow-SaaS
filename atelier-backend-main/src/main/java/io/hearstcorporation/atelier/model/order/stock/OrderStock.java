package io.hearstcorporation.atelier.model.order.stock;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.setting.Location;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "order_stock")
@EntityListeners(AuditingEntityListener.class)
public class OrderStock extends BaseModel {

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 24)
    private OrderStockStatus status;

    @Column(name = "sale_date")
    private LocalDate saleDate;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Generated
    @Column(name = "total_cost", nullable = false, insertable = false, updatable = false)
    private BigDecimal totalCost;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    // Labour

    @Column(name = "labour_total_cost", nullable = false, updatable = false)
    private BigDecimal labourTotalCost;

    @Column(name = "labour_total_minutes", nullable = false, updatable = false)
    private Long labourTotalMinutes;

    // Gemstones

    @Column(name = "gemstones_total_cost", nullable = false, updatable = false)
    private BigDecimal gemstonesTotalCost;

    @Column(name = "gemstones_total_weight", nullable = false, updatable = false)
    private BigDecimal gemstonesTotalWeight;

    @Column(name = "gemstones_total_weight_grams", nullable = false, updatable = false)
    private BigDecimal gemstonesTotalWeightGrams;

    // Diamonds

    @Column(name = "diamonds_total_quantity", nullable = false, updatable = false)
    private Integer diamondsTotalQuantity;

    @Column(name = "diamonds_total_cost", nullable = false, updatable = false)
    private BigDecimal diamondsTotalCost;

    @Column(name = "diamonds_total_markup_cost", nullable = false, updatable = false)
    private BigDecimal diamondsTotalMarkupCost;

    @Column(name = "diamonds_total_weight", nullable = false, updatable = false)
    private BigDecimal diamondsTotalWeight;

    @Column(name = "diamonds_total_weight_grams", nullable = false, updatable = false)
    private BigDecimal diamondsTotalWeightGrams;

    @Column(name = "metals_total_cost", nullable = false, updatable = false)
    private BigDecimal metalsTotalCost;

    @Column(name = "metals_total_weight_in", nullable = false, updatable = false)
    private BigDecimal metalsTotalWeightIn;

    @Column(name = "metals_total_weight_out", nullable = false, updatable = false)
    private BigDecimal metalsTotalWeightOut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_client_id")
    private Client issueClient;

    @OneToOne(mappedBy = "orderStock")
    private Order order;

    public OrderStock() {
        this.status = OrderStockStatus.AVAILABLE;
    }
}
