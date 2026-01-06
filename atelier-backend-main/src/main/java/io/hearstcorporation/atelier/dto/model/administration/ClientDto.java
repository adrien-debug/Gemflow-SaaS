package io.hearstcorporation.atelier.dto.model.administration;

import io.hearstcorporation.atelier.dto.model.setting.CountryDto;
import io.hearstcorporation.atelier.dto.model.setting.CurrencyDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClientDto {

    private Long id;
    private String name;
    private String email;
    private String address;
    private String city;
    private String postalCode;
    private String vatNumber;
    private CountryDto country;
    private CurrencyDto currency;
}
