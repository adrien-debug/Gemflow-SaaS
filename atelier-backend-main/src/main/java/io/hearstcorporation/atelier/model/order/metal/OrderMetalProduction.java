package io.hearstcorporation.atelier.model.order.metal;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.model.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "order_metal_production")
@EntityListeners(AuditingEntityListener.class)
public class OrderMetalProduction extends BaseModel {

    @Enumerated(EnumType.STRING)
    @Column(name = "material_type", nullable = false, updatable = false)
    private OrderMetalProductionMaterialType materialType;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation", nullable = false, updatable = false)
    private OrderMetalProductionOperation operation;

    @Column(name = "cost", nullable = false, updatable = false, precision = 13, scale = 3)
    private BigDecimal cost;

    @Column(name = "weight", nullable = false, updatable = false, precision = 8, scale = 2)
    private BigDecimal weight;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, updatable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false, updatable = false)
    private User employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_id", updatable = false)
    private Metal metal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_purity_id", updatable = false)
    private MetalPurity metalPurity;

    // For OrderMetalProductionMaterialType.ALLOYED_METAL
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alloyed_metal_id", updatable = false)
    private AlloyedMetal alloyedMetal;

    // For OrderMetalProductionMaterialType.OTHER
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "other_material_id", updatable = false)
    private OtherMaterial otherMaterial;
}
