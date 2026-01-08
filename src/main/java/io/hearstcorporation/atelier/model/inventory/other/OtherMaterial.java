package io.hearstcorporation.atelier.model.inventory.other;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "other_material")
public class OtherMaterial extends BaseModel {

    @Column(name = "name", nullable = false, unique = true, length = 256)
    private String name;

    @Column(name = "remaining_weight", nullable = false, updatable = false)
    private BigDecimal remainingWeight;

    public OtherMaterial() {
        this.setRemainingWeight(BigDecimal.ZERO);
    }
}
