package io.hearstcorporation.atelier.service.inventory.other;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialSearchCriteriaDto;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;

public interface OtherMaterialService {

    // Business logic methods

    OtherMaterialDto createOtherMaterial(OtherMaterialRequestDto requestDto);

    void updateOtherMaterial(Long otherMaterialId, OtherMaterialRequestDto requestDto);

    void deleteOtherMaterial(Long otherMaterialId);

    // Get Dto methods

    OtherMaterialDto getOtherMaterialDto(Long otherMaterialId);

    SearchDto<OtherMaterialDto> searchOtherMaterials(SearchRequestDto<OtherMaterialSearchCriteriaDto> searchQueryDto);

    // Get Entity methods

    OtherMaterial getOtherMaterial(Long otherMaterialId);
}
