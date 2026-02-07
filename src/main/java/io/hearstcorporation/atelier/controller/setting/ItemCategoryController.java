package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryDto;
import io.hearstcorporation.atelier.service.setting.ItemCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.ItemCategoryController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class ItemCategoryController {

    public static final String BASE_URL = "/api/v1/settings/items/categories";

    private final ItemCategoryService itemCategoryService;

    @GetMapping
    public List<ItemCategoryDto> getItemCategorys() {
        return itemCategoryService.getItemCategoryDtoList();
    }

    @GetMapping("/{id}")
    public ItemCategoryDto getItemCategory(@PathVariable Long id) {
        return itemCategoryService.getItemCategoryDto(id);
    }
}
