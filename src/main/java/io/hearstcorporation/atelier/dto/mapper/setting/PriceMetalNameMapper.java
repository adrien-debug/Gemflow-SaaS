package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameRequestDto;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class PriceMetalNameMapper {

    public static List<PriceMetalNameDto> toPriceMetalNameDtoList(List<PriceMetalName> priceMetalNames) {
        return priceMetalNames.stream()
                .map(PriceMetalNameMapper::toPriceMetalNameDto)
                .collect(Collectors.toList());
    }

    public static PriceMetalNameDto toPriceMetalNameDto(PriceMetalName priceMetalName) {
        if (priceMetalName == null) {
            return null;
        }
        return PriceMetalNameDto.builder()
                .id(priceMetalName.getId())
                .name(priceMetalName.getName())
                .build();
    }

    public static void mapPriceMetalName(PriceMetalName entity, PriceMetalNameRequestDto dto) {
        entity.setName(dto.getName());
    }

    public static ModelNameDto toModelNameDto(PriceMetalName priceMetalName) {
        if (priceMetalName == null) {
            return null;
        }
        return ModelNameDto.builder()
                .id(priceMetalName.getId())
                .name(priceMetalName.getName())
                .build();
    }
}
