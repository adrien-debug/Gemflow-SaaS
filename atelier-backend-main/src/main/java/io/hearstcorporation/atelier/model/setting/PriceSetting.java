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
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "price_setting")
public class PriceSetting extends BaseModel {

    @Column(name = "update_date", unique = true, nullable = false)
    private LocalDate updateDate;

    @OrderBy("id")
    @OneToMany(mappedBy = "priceSetting", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PriceMetal> priceMetals;

    @Column(name = "dirham_conversion_rate", nullable = false, precision = 7, scale = 3)
    private BigDecimal dirhamConversionRate;

    @Column(name = "euro_conversion_rate", nullable = false, precision = 7, scale = 3)
    private BigDecimal euroConversionRate;

    @Column(name = "pound_conversion_rate", nullable = false, precision = 7, scale = 3)
    private BigDecimal poundConversionRate;

    public PriceSetting(LocalDate updateDate) {
        this.updateDate = updateDate;
    }
}
