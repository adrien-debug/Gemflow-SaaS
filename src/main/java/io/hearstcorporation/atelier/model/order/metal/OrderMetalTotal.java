package io.hearstcorporation.atelier.model.order.metal;

import io.hearstcorporation.atelier.model.VersionModel;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "order_metal_total")
public class OrderMetalTotal extends VersionModel {

    @Column(name = "total_cost", nullable = false, precision = 13, scale = 3)
    private BigDecimal totalCost;

    @Generated
    @Column(name = "price_gram", nullable = false, insertable = false, updatable = false)
    private BigDecimal priceGram;

    @Column(name = "weight_in", nullable = false, precision = 8, scale = 2)
    private BigDecimal weightIn;

    @Column(name = "weight_out", precision = 8, scale = 2)
    private BigDecimal weightOut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, updatable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_id", nullable = false)
    private Metal metal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_purity_id", nullable = false)
    private MetalPurity metalPurity;

    public OrderMetalTotal() {
        this.totalCost = BigDecimal.ZERO;
        this.weightIn = BigDecimal.ZERO;
    }
}
