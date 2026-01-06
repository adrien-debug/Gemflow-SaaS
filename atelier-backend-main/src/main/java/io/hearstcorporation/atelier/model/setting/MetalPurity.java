package io.hearstcorporation.atelier.model.setting;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "metal_purity")
public class MetalPurity extends BaseModel {

    @Column(name = "metal_purity", nullable = false)
    private Short metalPurity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_caratage_id", nullable = false)
    private MetalCaratage metalCaratage;
}
