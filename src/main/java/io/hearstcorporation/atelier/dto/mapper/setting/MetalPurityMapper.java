package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityRequestDto;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class MetalPurityMapper {

    public static List<MetalPurityDto> toMetalPurityDtoList(List<MetalPurity> metalPurities) {
        return metalPurities.stream()
                .map(MetalPurityMapper::toMetalPurityDto)
                .collect(Collectors.toList());
    }

    public static MetalPurityDto toMetalPurityDto(MetalPurity entity) {
        if (entity == null) {
            return null;
        }
        return MetalPurityDto.builder()
                .id(entity.getId())
                .metalPurity(entity.getMetalPurity())
                .build();
    }

    public static void mapMetalPurity(MetalPurity entity, MetalPurityRequestDto dto, MetalCaratage metalCaratage) {
        entity.setMetalPurity(dto.getMetalPurity());
        entity.setMetalCaratage(metalCaratage);
    }
}
