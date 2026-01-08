package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.PriceMetalDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceSettingDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceSettingRequestDto;
import io.hearstcorporation.atelier.model.setting.PriceSetting;
import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.util.List;

@UtilityClass
public class PriceSettingMapper {

    public static PriceSettingDto toPriceSettingDto(PriceSetting entity, List<PriceMetalDto> priceMetalDtoList) {
        if (entity == null) {
            return null;
        }
        return PriceSettingDto.builder()
                .id(entity.getId())
                .updateDate(entity.getUpdateDate())
                .priceMetals(priceMetalDtoList)
                .dirhamConversionRate(entity.getDirhamConversionRate())
                .euroConversionRate(entity.getEuroConversionRate())
                .poundConversionRate(entity.getPoundConversionRate())
                .build();
    }

    public static PriceSettingDto toPriceSettingDtoTemplate(LocalDate updateDate, List<PriceMetalDto> priceMetalDtoList) {
        return PriceSettingDto.builder()
                .updateDate(updateDate)
                .priceMetals(priceMetalDtoList)
                .build();
    }

    public static void mapPriceSetting(PriceSetting entity, PriceSettingRequestDto dto) {
        entity.setDirhamConversionRate(dto.getDirhamConversionRate());
        entity.setEuroConversionRate(dto.getEuroConversionRate());
        entity.setPoundConversionRate(dto.getPoundConversionRate());
    }
}
