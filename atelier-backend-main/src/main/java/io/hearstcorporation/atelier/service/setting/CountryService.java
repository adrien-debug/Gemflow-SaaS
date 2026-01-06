package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.setting.CountryDto;
import io.hearstcorporation.atelier.model.setting.Country;

import java.util.List;

public interface CountryService {

    List<CountryDto> getCountryDtoList();

    Country getCountry(Long id);
}
