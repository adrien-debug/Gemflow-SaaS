package io.hearstcorporation.atelier.model.casting;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.setting.Cylinder;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import io.hearstcorporation.atelier.model.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.ObjectUtils;
import org.hibernate.annotations.Generated;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "casting")
@EntityListeners(AuditingEntityListener.class)
public class Casting extends BaseModel {

    @Column(name = "support_with_wax_tree_weight", nullable = false, precision = 8, scale = 2)
    private BigDecimal supportWithWaxTreeWeight;

    @Column(name = "support_weight", nullable = false, precision = 8, scale = 2)
    private BigDecimal supportWeight;

    @Generated
    @Column(name = "wax_weight", nullable = false, insertable = false, updatable = false, precision = 8, scale = 2)
    private BigDecimal waxWeight;

    @Column(name = "alloyed_metal_weight", nullable = false, precision = 8, scale = 2)
    private BigDecimal alloyedMetalWeight;

    @Column(name = "alloyed_metal_cost", nullable = false, precision = 13, scale = 3)
    private BigDecimal alloyedMetalCost;

    @Column(name = "pure_metal_weight", nullable = false, precision = 8, scale = 2)
    private BigDecimal pureMetalWeight;

    @Column(name = "pure_metal_cost", nullable = false, precision = 13, scale = 3)
    private BigDecimal pureMetalCost;

    @Column(name = "alloy_weight", nullable = false, precision = 8, scale = 2)
    private BigDecimal alloyWeight;

    @Column(name = "alloy_cost", nullable = false, precision = 13, scale = 3)
    private BigDecimal alloyCost;

    @Column(name = "reuse_weight", nullable = false, precision = 8, scale = 2)
    private BigDecimal reuseWeight;

    @Generated
    @Column(name = "total_weight", nullable = false, insertable = false, updatable = false)
    private BigDecimal totalWeight;

    @Generated
    @Column(name = "total_cost", nullable = false, insertable = false, updatable = false)
    private BigDecimal totalCost;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 12)
    private CastingStatus status;

    @Column(name = "completed_at")
    private Instant completedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "completed_by_id")
    private User completedBy;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @CreatedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false, updatable = false)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cylinder_id", nullable = false)
    private Cylinder cylinder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_id", nullable = false)
    private Metal metal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_purity_id", nullable = false)
    private MetalPurity metalPurity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alloyed_metal_id")
    private AlloyedMetal alloyedMetal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_metal_name_id", nullable = false)
    private PriceMetalName priceMetalName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alloy_id", nullable = false)
    private Alloy alloy;

    public Casting() {
        this.status = CastingStatus.OPEN;
    }

    @PreUpdate
    @PrePersist
    public void prePersistOrUpdate() {
        this.supportWithWaxTreeWeight = ObjectUtils.defaultIfNull(this.supportWithWaxTreeWeight, BigDecimal.ZERO);
        this.supportWeight = ObjectUtils.defaultIfNull(this.supportWeight, BigDecimal.ZERO);
        this.alloyedMetalWeight = ObjectUtils.defaultIfNull(this.alloyedMetalWeight, BigDecimal.ZERO);
        this.alloyedMetalCost = ObjectUtils.defaultIfNull(this.alloyedMetalCost, BigDecimal.ZERO);
        this.pureMetalWeight = ObjectUtils.defaultIfNull(this.pureMetalWeight, BigDecimal.ZERO);
        this.pureMetalCost = ObjectUtils.defaultIfNull(this.pureMetalCost, BigDecimal.ZERO);
        this.alloyWeight = ObjectUtils.defaultIfNull(this.alloyWeight, BigDecimal.ZERO);
        this.alloyCost = ObjectUtils.defaultIfNull(this.alloyCost, BigDecimal.ZERO);
        this.reuseWeight = ObjectUtils.defaultIfNull(this.reuseWeight, BigDecimal.ZERO);
    }
}
