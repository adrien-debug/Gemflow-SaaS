package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.PriceMetalDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalRequestDto;
import io.hearstcorporation.atelier.model.setting.PriceMetal;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class PriceMetalMapper {

    public static List<PriceMetalDto> toPriceMetalDtoList(List<PriceMetal> priceMetals) {
        return priceMetals.stream()
                .map(PriceMetalMapper::toPriceMetalDto)
                .collect(Collectors.toList());
    }

    public static PriceMetalDto toPriceMetalDto(PriceMetal entity) {
        if (entity == null) {
            return null;
        }
        return PriceMetalDto.builder()
                .priceMetalName(PriceMetalNameMapper.toPriceMetalNameDto(entity.getPriceMetalName()))
                .rate(entity.getRate())
                .build();
    }

    public static void mapPriceMetal(PriceMetal priceMetal, PriceMetalRequestDto dto) {
        priceMetal.setRate(dto.getRate());
    }

    public static List<PriceMetalDto> toPriceMetalDtoTemplateList(List<PriceMetalNameDto> priceMetalNameDtoList) {
        return priceMetalNameDtoList.stream()
                .map(PriceMetalMapper::toPriceMetaDtoTemplate)
                .collect(Collectors.toList());
    }

    public static PriceMetalDto toPriceMetaDtoTemplate(PriceMetalNameDto priceMetalNameDto) {
        return PriceMetalDto.builder()
                .priceMetalName(priceMetalNameDto)
                .build();
    }
}
