package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.LocationDto;
import io.hearstcorporation.atelier.dto.model.setting.LocationRequestDto;
import io.hearstcorporation.atelier.model.setting.Location;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class LocationMapper {

    public static List<LocationDto> toLocationDtoList(List<Location> locations) {
        return locations.stream()
                .map(LocationMapper::toLocationDto)
                .collect(Collectors.toList());
    }

    public static LocationDto toLocationDto(Location entity) {
        if (entity == null) {
            return null;
        }
        return LocationDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapLocation(Location entity, LocationRequestDto dto) {
        entity.setName(dto.getName());
    }
}
