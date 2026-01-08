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
@Table(name = "metal")
public class Metal extends BaseModel {

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_caratage_id")
    private MetalCaratage metalCaratage;
}
