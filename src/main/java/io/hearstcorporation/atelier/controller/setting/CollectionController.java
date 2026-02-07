package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.CollectionDto;
import io.hearstcorporation.atelier.service.setting.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.CollectionController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class CollectionController {

    public static final String BASE_URL = "/api/v1/settings/collections";

    private final CollectionService collectionService;

    @GetMapping
    public List<CollectionDto> getCollections() {
        return collectionService.getCollectionDtoList();
    }

    @GetMapping("/{id}")
    public CollectionDto getCollection(@PathVariable Long id) {
        return collectionService.getCollectionDto(id);
    }
}
