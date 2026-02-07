package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryDto;
import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.ItemCategory;

import java.util.List;

public interface ItemCategoryService {

    List<ItemCategoryDto> getItemCategoryDtoList();

    ItemCategoryDto getItemCategoryDto(Long id);

    ItemCategory getItemCategory(Long id);

    void updateItemCategories(BatchUpdateDto<ItemCategoryUpdateInBatchDto, Long> batchUpdateDto);
}
