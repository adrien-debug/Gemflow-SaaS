package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.setting.PriceSettingDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceSettingRequestDto;

import java.time.LocalDate;

public interface PriceSettingService {

    PriceSettingDto getPriceSettingDto(LocalDate date);

    void updatePriceSetting(LocalDate date, PriceSettingRequestDto body);
}
