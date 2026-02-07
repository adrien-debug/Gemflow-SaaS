package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.ClientCategoryDto;
import io.hearstcorporation.atelier.service.setting.ClientCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.ClientCategoryController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class ClientCategoryController {

    public static final String BASE_URL = "/api/v1/settings/clients/categories";

    private final ClientCategoryService clientCategoryService;

    @GetMapping
    public List<ClientCategoryDto> getClientCategories() {
        return clientCategoryService.getClientCategoryDtoList();
    }

    @GetMapping("/{id}")
    public ClientCategoryDto getClientCategory(@PathVariable Long id) {
        return clientCategoryService.getClientCategoryDto(id);
    }
}
