package io.hearstcorporation.atelier.model.inventory.puremetal;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "pure_metal_summary")
public class PureMetalSummary extends BaseModel {

    @Column(name = "total_cost", nullable = false)
    private BigDecimal totalCost;

    @Column(name = "current_total_cost", nullable = false)
    private BigDecimal currentTotalCost;

    @Column(name = "remaining_weight", nullable = false)
    private BigDecimal remainingWeight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_metal_name_id", nullable = false)
    private PriceMetalName priceMetalName;
}
