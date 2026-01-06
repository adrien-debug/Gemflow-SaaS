package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryDto;
import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryRequestDto;
import io.hearstcorporation.atelier.model.setting.ItemCategory;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class ItemCategoryMapper {

    public static List<ItemCategoryDto> toItemCategoryDtoList(List<ItemCategory> itemCategories) {
        return itemCategories.stream()
                .map(ItemCategoryMapper::toItemCategoryDto)
                .collect(Collectors.toList());
    }

    public static ItemCategoryDto toItemCategoryDto(ItemCategory entity) {
        if (entity == null) {
            return null;
        }
        return ItemCategoryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .immutable(entity.getImmutable())
                .build();
    }

    public static void mapItemCategory(ItemCategory entity, ItemCategoryRequestDto dto) {
        entity.setName(dto.getName());
    }
}
