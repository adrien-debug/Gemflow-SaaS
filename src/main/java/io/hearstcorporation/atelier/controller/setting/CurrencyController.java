package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.CurrencyDto;
import io.hearstcorporation.atelier.service.setting.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.CurrencyController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class CurrencyController {

    public static final String BASE_URL = "/api/v1/currencies";

    private final CurrencyService currencyService;

    @GetMapping
    public List<CurrencyDto> getCurrencies() {
        return currencyService.getCurrencyDtoList();
    }
}
