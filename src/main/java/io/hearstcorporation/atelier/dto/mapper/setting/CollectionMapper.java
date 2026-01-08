package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.CollectionDto;
import io.hearstcorporation.atelier.dto.model.setting.CollectionRequestDto;
import io.hearstcorporation.atelier.model.setting.Collection;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class CollectionMapper {

    public static List<CollectionDto> toCollectionDtoList(List<Collection> collections) {
        return collections.stream()
                .map(CollectionMapper::toCollectionDto)
                .collect(Collectors.toList());
    }

    public static CollectionDto toCollectionDto(Collection entity) {
        if (entity == null) {
            return null;
        }
        return CollectionDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapCollection(Collection entity, CollectionRequestDto dto) {
        entity.setName(dto.getName());
    }
}
