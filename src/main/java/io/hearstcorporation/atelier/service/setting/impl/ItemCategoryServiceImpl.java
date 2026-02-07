package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.ItemCategoryMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryDto;
import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.ItemCategory;
import io.hearstcorporation.atelier.model.setting.ItemCategory_;
import io.hearstcorporation.atelier.repository.setting.ItemCategoryRepository;
import io.hearstcorporation.atelier.service.setting.ItemCategoryService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemCategoryServiceImpl implements ItemCategoryService {

    private final ItemCategoryRepository itemCategoryRepository;

    @Override
    public List<ItemCategoryDto> getItemCategoryDtoList() {
        return ItemCategoryMapper.toItemCategoryDtoList(itemCategoryRepository.findAll(
                Sort.by(Sort.Order.desc(ItemCategory_.IMMUTABLE), Sort.Order.asc(ItemCategory_.ID))));
    }

    @Override
    public ItemCategoryDto getItemCategoryDto(Long id) {
        return ItemCategoryMapper.toItemCategoryDto(getItemCategory(id));
    }

    @Override
    public ItemCategory getItemCategory(Long id) {
        return itemCategoryRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Item category with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateItemCategories(BatchUpdateDto<ItemCategoryUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            ItemCategory itemCategory = Optional.ofNullable(requestDto.getId())
                    .map(this::getItemCategory)
                    .orElseGet(ItemCategory::new);
            if (BooleanUtils.isNotTrue(itemCategory.getImmutable())) {
                ItemCategoryMapper.mapItemCategory(itemCategory, requestDto);
                itemCategoryRepository.save(itemCategory);
            }
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> itemCategoryRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Item categories %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
