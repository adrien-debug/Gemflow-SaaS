package io.hearstcorporation.atelier.model.administration;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.setting.Country;
import io.hearstcorporation.atelier.model.setting.Currency;
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
@Table(name = "client")
public class Client extends BaseModel {

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_id")
    private Currency currency;
}
