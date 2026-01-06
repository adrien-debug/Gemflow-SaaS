package io.hearstcorporation.atelier.service.inventory.puremetal;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseUpdateDto;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;

public interface PureMetalPurchaseService {

    // Business logic methods

    PureMetalPurchaseDto createPureMetalPurchase(PureMetalPurchaseRequestDto pureMetalPurchaseRequestDto);

    void updatePureMetalPurchase(Long pureMetalPurchaseId, PureMetalPurchaseUpdateDto pureMetalPurchaseUpdateDto);

    void deletePureMetalPurchase(Long pureMetalPurchaseId);

    BigDecimal reduceWeightByPriceMetalNameId(@NonNull Long priceMetalNameId, @NonNull BigDecimal weight);

    // Get Dto methods

    SearchDto<PureMetalPurchaseDto> searchPureMetalPurchases(SearchRequestDto<PureMetalPurchaseSearchCriteriaDto> searchQueryDto);

    PureMetalPurchaseDto getPureMetalPurchaseDto(Long pureMetalPurchaseId);

    // Get Entity methods

    PureMetalPurchase getPureMetalPurchase(Long pureMetalPurchaseId);

    PureMetalPurchase getFullPureMetalPurchase(Long pureMetalPurchaseId);
}
