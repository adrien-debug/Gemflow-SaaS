package io.hearstcorporation.atelier.service.inventory.diamond;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondQuantityDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondUpdateDto;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;

public interface DiamondService {

    // Business logic methods

    DiamondDto createDiamond(DiamondRequestDto diamondRequestDto);

    void updateDiamond(Long diamondId, DiamondUpdateDto diamondUpdateDto);

    void addDiamondQuantity(Long diamondId, DiamondQuantityDto diamondQuantityDto);

    void addDiamondQuantity(Long diamondId, Integer quantity);

    void reduceDiamondQuantity(Long diamondId, DiamondQuantityDto diamondQuantityDto);

    void reduceDiamondQuantity(Long diamondId, Integer quantity);

    void deleteDiamond(Long diamondId);

    // Get Dto methods

    SearchDto<DiamondDto> searchDiamonds(SearchRequestDto<DiamondSearchCriteriaDto> searchQueryDto);

    DiamondDto getDiamondDto(Long diamondId);

    InventoryTotalDto getDiamondTotalDto(DiamondSearchCriteriaDto searchCriteriaDto);

    // Get Entity methods

    Diamond getDiamond(Long diamondId);

    Diamond getFullDiamond(Long diamondId);

    Diamond getLockDiamond(Long diamondId);
}
