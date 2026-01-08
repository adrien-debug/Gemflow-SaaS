package io.hearstcorporation.atelier.model.setting;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "price_metal")
public class PriceMetal extends BaseModel {

    @Column(name = "rate", nullable = false, precision = 6, scale = 2)
    private BigDecimal rate;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "price_metal_name_id", nullable = false)
    private PriceMetalName priceMetalName;

    @ManyToOne
    @JoinColumn(name = "price_setting_id", nullable = false)
    private PriceSetting priceSetting;

    public PriceMetal(PriceMetalName priceMetalName, PriceSetting priceSetting) {
        this.priceMetalName = priceMetalName;
        this.priceSetting = priceSetting;
    }
}
