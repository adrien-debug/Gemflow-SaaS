package io.hearstcorporation.atelier.model.setting;

import io.hearstcorporation.atelier.model.VersionModel;
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
@Table(name = "cylinder")
public class Cylinder extends VersionModel {

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @Column(name = "open", nullable = false)
    private Boolean open;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metal_id")
    private Metal metal;

    public Cylinder() {
        open = false;
    }
}
