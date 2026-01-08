package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.ClientCategoryDto;
import io.hearstcorporation.atelier.dto.model.setting.ClientCategoryRequestDto;
import io.hearstcorporation.atelier.model.setting.ClientCategory;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class ClientCategoryMapper {

    public static List<ClientCategoryDto> toClientCategoryDtoList(List<ClientCategory> clientCategories) {
        return clientCategories.stream()
                .map(ClientCategoryMapper::toClientCategoryDto)
                .collect(Collectors.toList());
    }

    public static ClientCategoryDto toClientCategoryDto(ClientCategory entity) {
        if (entity == null) {
            return null;
        }
        return ClientCategoryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapClientCategory(ClientCategory entity, ClientCategoryRequestDto dto) {
        entity.setName(dto.getName());
    }
}
