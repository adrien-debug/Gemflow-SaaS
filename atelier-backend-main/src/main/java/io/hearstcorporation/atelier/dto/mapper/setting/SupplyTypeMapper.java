package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.SupplyTypeDto;
import io.hearstcorporation.atelier.dto.model.setting.SupplyTypeRequestDto;
import io.hearstcorporation.atelier.model.setting.SupplyType;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class SupplyTypeMapper {

    public static List<SupplyTypeDto> toSupplyTypeDtoList(List<SupplyType> supplyTypes) {
        return supplyTypes.stream()
                .map(SupplyTypeMapper::toSupplyTypeDto)
                .collect(Collectors.toList());
    }

    public static SupplyTypeDto toSupplyTypeDto(SupplyType entity) {
        if (entity == null) {
            return null;
        }
        return SupplyTypeDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .immutable(entity.getImmutable())
                .build();
    }

    public static void mapSupplyType(SupplyType entity, SupplyTypeRequestDto dto) {
        entity.setName(dto.getName());
    }
}
