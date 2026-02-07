package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.CurrencyDto;
import io.hearstcorporation.atelier.model.setting.Currency;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CurrencyMapper {

    public static CurrencyDto toCurrencyDto(Currency entity) {
        if (entity == null) {
            return null;
        }
        return CurrencyDto.builder()
                .id(entity.getId())
                .namePlural(entity.getNamePlural())
                .code(entity.getCode())
                .name(entity.getName())
                .decimalDigits(entity.getDecimalDigits())
                .symbol(entity.getSymbol())
                .rounding(entity.getRounding())
                .build();
    }
}
