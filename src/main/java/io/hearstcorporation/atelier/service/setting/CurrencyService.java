package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.setting.CurrencyDto;
import io.hearstcorporation.atelier.model.setting.Currency;

import java.util.List;

public interface CurrencyService {

    List<CurrencyDto> getCurrencyDtoList();

    Currency getCurrency(Long id);
}
