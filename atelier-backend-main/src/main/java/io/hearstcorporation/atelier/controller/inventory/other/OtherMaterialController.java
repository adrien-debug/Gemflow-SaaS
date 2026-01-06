package io.hearstcorporation.atelier.controller.inventory.other;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialSearchCriteriaDto;
import io.hearstcorporation.atelier.service.inventory.other.OtherMaterialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.inventory.other.OtherMaterialController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OtherMaterialController {

    public static final String BASE_URL = "/api/v1/other-materials";
    public static final String OTHER_MATERIAL_ID = "/{otherMaterialId}";

    private final OtherMaterialService otherMaterialService;

    @PostMapping
    public OtherMaterialDto createOtherMaterial(@RequestBody @Valid OtherMaterialRequestDto requestDto) {
        return otherMaterialService.createOtherMaterial(requestDto);
    }

    @PutMapping(OTHER_MATERIAL_ID)
    public OtherMaterialDto updateOtherMaterial(@PathVariable Long otherMaterialId, @RequestBody @Valid OtherMaterialRequestDto requestDto) {
        otherMaterialService.updateOtherMaterial(otherMaterialId, requestDto);
        return otherMaterialService.getOtherMaterialDto(otherMaterialId);
    }

    @GetMapping(OTHER_MATERIAL_ID)
    public OtherMaterialDto getOtherMaterial(@PathVariable Long otherMaterialId) {
        return otherMaterialService.getOtherMaterialDto(otherMaterialId);
    }

    @DeleteMapping(OTHER_MATERIAL_ID)
    public void deleteOtherMaterial(@PathVariable Long otherMaterialId) {
        otherMaterialService.deleteOtherMaterial(otherMaterialId);
    }

    @PostMapping("/search")
    public SearchDto<OtherMaterialDto> searchOtherMaterials(@RequestBody @Valid SearchRequestDto<OtherMaterialSearchCriteriaDto> searchQueryDto) {
        return otherMaterialService.searchOtherMaterials(searchQueryDto);
    }
}
