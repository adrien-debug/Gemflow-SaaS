package io.hearstcorporation.atelier.service.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.model.InventoryTotalCostDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalUpdateDto;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;

public interface AlloyedMetalService {

    // Business logic methods

    AlloyedMetalDto createAlloyedMetal(AlloyedMetalRequestDto requestDto);

    void updateAlloyedMetal(Long alloyedMetalId, AlloyedMetalUpdateDto requestDto);

    void deleteAlloyedMetal(Long alloyedMetalId);

    // Get Dto methods

    AlloyedMetalDto getAlloyedMetalDto(Long alloyedMetalId);

    SearchDto<AlloyedMetalDto> searchAlloyedMetals(SearchRequestDto<AlloyedMetalSearchCriteriaDto> searchQueryDto);

    InventoryTotalCostDto getAlloyedMetalTotalCostDto(AlloyedMetalSearchCriteriaDto searchCriteriaDto);

    // Get Entity methods

    AlloyedMetal getAlloyedMetal(Long alloyedMetalId);

    AlloyedMetal getFullAlloyedMetal(Long alloyedMetalId);

    AlloyedMetal getAlloyedMetalByIdAndMetalIdAndMetalPurityId(Long alloyedMetalId, Long metalId, Long metalPurityId);
}
