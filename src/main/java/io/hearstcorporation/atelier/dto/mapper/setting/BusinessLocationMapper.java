package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.BusinessLocationDto;
import io.hearstcorporation.atelier.dto.model.setting.BusinessLocationRequestDto;
import io.hearstcorporation.atelier.model.setting.BusinessLocation;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class BusinessLocationMapper {

    public static List<BusinessLocationDto> toBusinessLocationDtoList(List<BusinessLocation> businessLocations) {
        return businessLocations.stream()
                .map(BusinessLocationMapper::toBusinessLocationDto)
                .collect(Collectors.toList());
    }

    public static BusinessLocationDto toBusinessLocationDto(BusinessLocation entity) {
        if (entity == null) {
            return null;
        }
        return BusinessLocationDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapBusinessLocation(BusinessLocation entity, BusinessLocationRequestDto dto) {
        entity.setName(dto.getName());
    }
}
