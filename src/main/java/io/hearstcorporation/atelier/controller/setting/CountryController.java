package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.CountryDto;
import io.hearstcorporation.atelier.service.setting.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.CountryController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class CountryController {

    public static final String BASE_URL = "/api/v1/countries";

    private final CountryService countryService;

    @GetMapping
    public List<CountryDto> getCountries() {
        return countryService.getCountryDtoList();
    }
}
