package io.hearstcorporation.atelier.service.inventory.other;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionUpdateDto;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterialTransaction;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface OtherMaterialTransactionService {

    // Business logic methods

    void updateOtherMaterialTransaction(Long otherMaterialTransactionId, OtherMaterialTransactionUpdateDto updateDto);

    void addOtherMaterialTransactionWeight(OtherMaterialTransactionRequestDto requestDto);

    void reduceOtherMaterialTransactionWeight(OtherMaterialTransactionRequestDto requestDto);

    void addOtherMaterialTransactionWeight(LocalDate balanceDate, Long otherMaterialId, BigDecimal batchWeight,
                                           Long orderId, String description);

    // Get Dto methods

    SearchDto<OtherMaterialTransactionDto> searchOtherMaterialTransaction(SearchRequestDto<OtherMaterialTransactionSearchCriteriaDto> searchQueryDto);

    // Get Entity methods

    OtherMaterialTransaction getOtherMaterialTransaction(Long otherMaterialTransactionId);
}
