package io.hearstcorporation.atelier.service.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseUpdateDto;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface AlloyedMetalPurchaseService {

    // Business logic methods

    AlloyedMetalPurchaseDto createAlloyedMetalPurchase(AlloyedMetalPurchaseRequestDto requestDto);

    AlloyedMetalPurchaseDto createAlloyedMetalPurchase(Casting casting, AlloyedMetalPurchaseRequestDto requestDto);

    AlloyedMetalPurchaseDto createAlloyedMetalPurchase(Long alloyId, Long alloyedMetalId, LocalDate balanceDate,
                                                       BigDecimal batchWeight, BigDecimal priceGram);

    AlloyedMetalPurchaseDto createAlloyedMetalPurchase(Casting casting, Long alloyId, Long alloyedMetalId,
                                                       LocalDate balanceDate, BigDecimal batchWeight,
                                                       BigDecimal priceGram);

    void updateAlloyedMetalPurchase(Long alloyedMetalPurchaseId, AlloyedMetalPurchaseUpdateDto updateDto);

    void deleteAlloyedMetalPurchase(Long alloyedMetalPurchaseId);

    BigDecimal reduceWeightByAlloyedMetalId(@NonNull Long alloyedMetalId, @NonNull BigDecimal weight);

    // Get Dto methods

    SearchDto<AlloyedMetalPurchaseDto> searchAlloyedMetalPurchases(SearchRequestDto<AlloyedMetalPurchaseSearchCriteriaDto> searchQueryDto);

    AlloyedMetalPurchaseDto getAlloyedMetalPurchaseDto(Long alloyedMetalPurchaseId);

    // Get Entity methods

    AlloyedMetalPurchase getAlloyedMetalPurchase(Long alloyedMetalPurchaseId);

    AlloyedMetalPurchase getFullAlloyedMetalPurchase(Long alloyedMetalPurchaseId);
}
