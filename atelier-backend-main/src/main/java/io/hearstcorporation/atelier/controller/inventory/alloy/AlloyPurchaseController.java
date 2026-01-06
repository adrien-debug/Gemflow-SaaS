package io.hearstcorporation.atelier.controller.inventory.alloy;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseUpdateDto;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyPurchaseService;
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

import static io.hearstcorporation.atelier.controller.inventory.alloy.AlloyPurchaseController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class AlloyPurchaseController {

    public static final String BASE_URL = "/api/v1/alloy-purchases";
    public static final String ALLOY_PURCHASE_ID = "/{alloyPurchaseId}";

    private final AlloyPurchaseService alloyPurchaseService;

    @PostMapping
    public AlloyPurchaseDto createAlloyPurchase(@RequestBody @Valid AlloyPurchaseRequestDto requestDto) {
        return alloyPurchaseService.createAlloyPurchase(requestDto);
    }

    @PutMapping(ALLOY_PURCHASE_ID)
    public AlloyPurchaseDto updateAlloyPurchase(@PathVariable Long alloyPurchaseId,
                                                @RequestBody @Valid AlloyPurchaseUpdateDto updateDto) {
        alloyPurchaseService.updateAlloyPurchase(alloyPurchaseId, updateDto);
        return alloyPurchaseService.getAlloyPurchaseDto(alloyPurchaseId);
    }

    @GetMapping(ALLOY_PURCHASE_ID)
    public AlloyPurchaseDto getAlloyPurchase(@PathVariable Long alloyPurchaseId) {
        return alloyPurchaseService.getAlloyPurchaseDto(alloyPurchaseId);
    }

    @DeleteMapping(ALLOY_PURCHASE_ID)
    public void deleteAlloyPurchase(@PathVariable Long alloyPurchaseId) {
        alloyPurchaseService.deleteAlloyPurchase(alloyPurchaseId);
    }

    @PostMapping("/search")
    public SearchDto<AlloyPurchaseDto> searchAlloyPurchases(@RequestBody @Valid SearchRequestDto<AlloyPurchaseSearchCriteriaDto> searchQueryDto) {
        return alloyPurchaseService.searchAlloyPurchases(searchQueryDto);
    }
}
