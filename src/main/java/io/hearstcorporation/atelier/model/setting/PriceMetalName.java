package io.hearstcorporation.atelier.model.setting;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
//todo: rename to PureMetal and union with PureMetalSummary into one entity
@Table(name = "price_metal_name")
public class PriceMetalName extends BaseModel {

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @OrderBy("id")
    @OneToMany(mappedBy = "priceMetalName", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PriceMetal> priceMetals;
}
