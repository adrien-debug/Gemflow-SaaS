package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.PriceSettingDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceSettingRequestDto;
import io.hearstcorporation.atelier.service.setting.PriceSettingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

import static io.hearstcorporation.atelier.controller.setting.PriceSettingController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class PriceSettingController {
    public static final String BASE_URL = "/api/v1/settings/price";

    private final PriceSettingService priceSettingService;

    @GetMapping("/{date}")
    public PriceSettingDto getPriceSetting(@PathVariable LocalDate date) {
        return priceSettingService.getPriceSettingDto(date);
    }

    @PutMapping("/{date}")
    public PriceSettingDto updatePriceSetting(@PathVariable LocalDate date,
                                              @RequestBody @Valid PriceSettingRequestDto body) {
        priceSettingService.updatePriceSetting(date, body);
        return priceSettingService.getPriceSettingDto(date);
    }
}
