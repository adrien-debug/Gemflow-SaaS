package io.hearstcorporation.atelier.service.inventory.alloy;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseUpdateDto;
import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;

public interface AlloyPurchaseService {

    AlloyPurchaseDto createAlloyPurchase(AlloyPurchaseRequestDto alloyPurchaseRequestDto);

    void updateAlloyPurchase(Long alloyPurchaseId, AlloyPurchaseUpdateDto alloyPurchaseUpdateDto);

    void deleteAlloyPurchase(Long alloyPurchaseId);

    BigDecimal reduceWeightByAlloyId(@NonNull Long alloyId, @NonNull BigDecimal weight);

    // Get Dto methods

    SearchDto<AlloyPurchaseDto> searchAlloyPurchases(SearchRequestDto<AlloyPurchaseSearchCriteriaDto> searchQueryDto);

    AlloyPurchaseDto getAlloyPurchaseDto(Long alloyPurchaseId);

    // Get Entity methods

    AlloyPurchase getAlloyPurchase(Long alloyPurchaseId);

    AlloyPurchase getFullAlloyPurchase(Long alloyPurchaseId);
}
