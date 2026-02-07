package io.hearstcorporation.atelier.controller.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseUpdateDto;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalPurchaseService;
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

import static io.hearstcorporation.atelier.controller.inventory.alloyedmetal.AlloyedMetalPurchaseController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class AlloyedMetalPurchaseController {

    public static final String BASE_URL = "/api/v1/alloyed-metal-purchases";
    public static final String ALLOYED_METAL_PURCHASE_ID = "/{alloyedMetalPurchaseId}";

    private final AlloyedMetalPurchaseService alloyedMetalPurchaseService;

    @PostMapping
    public AlloyedMetalPurchaseDto createAlloyedMetalPurchase(@RequestBody @Valid AlloyedMetalPurchaseRequestDto requestDto) {
        return alloyedMetalPurchaseService.createAlloyedMetalPurchase(requestDto);
    }

    @PutMapping(ALLOYED_METAL_PURCHASE_ID)
    public AlloyedMetalPurchaseDto updateAlloyedMetalPurchase(@PathVariable Long alloyedMetalPurchaseId,
                                                              @RequestBody @Valid AlloyedMetalPurchaseUpdateDto updateDto) {
        alloyedMetalPurchaseService.updateAlloyedMetalPurchase(alloyedMetalPurchaseId, updateDto);
        return alloyedMetalPurchaseService.getAlloyedMetalPurchaseDto(alloyedMetalPurchaseId);
    }

    @GetMapping(ALLOYED_METAL_PURCHASE_ID)
    public AlloyedMetalPurchaseDto getAlloyedMetalPurchase(@PathVariable Long alloyedMetalPurchaseId) {
        return alloyedMetalPurchaseService.getAlloyedMetalPurchaseDto(alloyedMetalPurchaseId);
    }

    @DeleteMapping(ALLOYED_METAL_PURCHASE_ID)
    public void deleteAlloyedMetalPurchase(@PathVariable Long alloyedMetalPurchaseId) {
        alloyedMetalPurchaseService.deleteAlloyedMetalPurchase(alloyedMetalPurchaseId);
    }

    @PostMapping("/search")
    public SearchDto<AlloyedMetalPurchaseDto> searchAlloyedMetalPurchases(@RequestBody @Valid SearchRequestDto<AlloyedMetalPurchaseSearchCriteriaDto> searchQueryDto) {
        return alloyedMetalPurchaseService.searchAlloyedMetalPurchases(searchQueryDto);
    }
}
