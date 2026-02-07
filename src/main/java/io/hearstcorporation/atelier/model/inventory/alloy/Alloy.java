package io.hearstcorporation.atelier.model.inventory.alloy;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.setting.Metal;
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
@Table(name = "alloy")
public class Alloy extends BaseModel {

    @Column(name = "name", nullable = false, unique = true, length = 256)
    private String name;

    @Column(name = "remaining_weight", nullable = false, updatable = false)
    private BigDecimal remainingWeight;

    @Column(name = "total_cost", nullable = false, updatable = false)
    private BigDecimal totalCost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_id", nullable = false)
    private Metal metal;

    public Alloy() {
        this.setTotalCost(BigDecimal.ZERO);
        this.setRemainingWeight(BigDecimal.ZERO);
    }
}
