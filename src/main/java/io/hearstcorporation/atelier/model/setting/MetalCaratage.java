package io.hearstcorporation.atelier.model.setting;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "metal_caratage")
public class MetalCaratage extends BaseModel {

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "price_metal_name_id")
    private PriceMetalName priceMetalName;

    @Column(name = "wax_casting_value", nullable = false, precision = 4, scale = 2)
    private BigDecimal waxCastingValue;

    @OrderBy("id")
    @OneToMany(mappedBy = "metalCaratage", fetch = FetchType.LAZY)
    private List<Metal> metals;

    @OrderBy("id")
    @OneToMany(mappedBy = "metalCaratage", fetch = FetchType.LAZY)
    private List<MetalPurity> metalPurities;
}
