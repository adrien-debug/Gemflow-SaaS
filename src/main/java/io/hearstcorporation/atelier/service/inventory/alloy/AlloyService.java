package io.hearstcorporation.atelier.service.inventory.alloy;

import io.hearstcorporation.atelier.dto.model.InventoryTotalCostDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloySearchCriteriaDto;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;

public interface AlloyService {

    // Business logic methods

    AlloyDto createAlloy(AlloyRequestDto requestDto);

    void updateAlloy(Long alloyId, AlloyRequestDto requestDto);

    void deleteAlloy(Long alloyId);

    // Get Dto methods

    AlloyDto getAlloyDto(Long alloyId);

    SearchDto<AlloyDto> searchAlloys(SearchRequestDto<AlloySearchCriteriaDto> searchQueryDto);

    InventoryTotalCostDto getAlloyTotalCostDto(AlloySearchCriteriaDto searchCriteriaDto);

    // Get Entity methods

    Alloy getAlloy(Long alloyId);

    Alloy getFullAlloy(Long alloyId);

    Alloy getAlloyByIdAndMetalId(Long alloyId, Long metalId);
}
