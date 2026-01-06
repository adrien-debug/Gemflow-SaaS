package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalRequestDto;
import io.hearstcorporation.atelier.model.setting.Metal;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class MetalMapper {

    public static List<MetalDto> toMetalDtoList(List<Metal> metals) {
        return metals.stream()
                .map(MetalMapper::toMetalDto)
                .collect(Collectors.toList());
    }

    public static MetalDto toMetalDto(Metal entity) {
        if (entity == null) {
            return null;
        }
        return MetalDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapMetal(Metal entity, MetalRequestDto dto) {
        entity.setName(dto.getName());
    }
}
