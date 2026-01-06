package io.hearstcorporation.atelier.controller.inventory.other;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionUpdateDto;
import io.hearstcorporation.atelier.service.inventory.other.OtherMaterialTransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.inventory.other.OtherMaterialTransactionController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OtherMaterialTransactionController {

    public static final String BASE_URL = "/api/v1/other-material-transactions";
    public static final String OTHER_MATERIAL_TRANSACTION_ID = "/{otherMaterialTransactionId}";

    private final OtherMaterialTransactionService otherMaterialTransactionService;

    @PutMapping(OTHER_MATERIAL_TRANSACTION_ID)
    public void updateOtherMaterialTransaction(@PathVariable Long otherMaterialTransactionId,
                                               @RequestBody @Valid OtherMaterialTransactionUpdateDto updateDto) {
        otherMaterialTransactionService.updateOtherMaterialTransaction(otherMaterialTransactionId, updateDto);
    }

    @PostMapping("/search")
    public SearchDto<OtherMaterialTransactionDto> searchOtherMaterialTransaction(@RequestBody @Valid SearchRequestDto<OtherMaterialTransactionSearchCriteriaDto> searchQueryDto) {
        return otherMaterialTransactionService.searchOtherMaterialTransaction(searchQueryDto);
    }

    @PostMapping("/weight/add")
    public void addOtherMaterialTransactionWeight(@RequestBody @Valid OtherMaterialTransactionRequestDto requestDto) {
        otherMaterialTransactionService.addOtherMaterialTransactionWeight(requestDto);
    }

    @PostMapping("/weight/reduce")
    public void reduceOtherMaterialTransactionWeight(@RequestBody @Valid OtherMaterialTransactionRequestDto requestDto) {
        otherMaterialTransactionService.reduceOtherMaterialTransactionWeight(requestDto);
    }
}
