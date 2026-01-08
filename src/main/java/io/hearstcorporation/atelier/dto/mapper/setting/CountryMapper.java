package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.CountryDto;
import io.hearstcorporation.atelier.model.setting.Country;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CountryMapper {

    public static CountryDto toCountryDto(Country entity) {
        if (entity == null) {
            return null;
        }
        return CountryDto.builder()
                .id(entity.getId())
                .code(entity.getCode())
                .name(entity.getName())
                .region(entity.getRegion())
                .build();
    }
}
