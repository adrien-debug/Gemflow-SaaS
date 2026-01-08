package io.hearstcorporation.atelier.dto.model.administration;

import io.hearstcorporation.atelier.dto.model.setting.CountryDto;
import io.hearstcorporation.atelier.dto.model.setting.CurrencyDto;
import io.hearstcorporation.atelier.dto.model.setting.SupplyTypeDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class SupplierDto {

    private Long id;
    private String name;
    private String email;
    private String address;
    private String city;
    private String postalCode;
    private String vatNumber;
    private SupplyTypeDto supplyType;
    private CountryDto country;
    private CurrencyDto currency;
    private BigDecimal markupPercentage;
}
