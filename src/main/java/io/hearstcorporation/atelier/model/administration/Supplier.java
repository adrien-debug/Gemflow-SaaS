package io.hearstcorporation.atelier.model.administration;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.setting.Country;
import io.hearstcorporation.atelier.model.setting.Currency;
import io.hearstcorporation.atelier.model.setting.SupplyType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "supplier")
public class Supplier extends BaseModel {

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @Column(name = "email", length = 256)
    private String email;

    @Column(name = "address", length = 256)
    private String address;

    @Column(name = "city", length = 128)
    private String city;

    @Column(name = "postal_code", length = 16)
    private String postalCode;

    @Column(name = "vat_number", length = 16)
    private String vatNumber;

    @Column(name = "markup_percentage", precision = 5, scale = 2)
    private BigDecimal markupPercentage;

    @Generated
    @Column(name = "markup_percentage_value", insertable = false, updatable = false)
    private BigDecimal markupPercentageValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supply_type_id", nullable = false)
    private SupplyType supplyType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_id")
    private Currency currency;
}
