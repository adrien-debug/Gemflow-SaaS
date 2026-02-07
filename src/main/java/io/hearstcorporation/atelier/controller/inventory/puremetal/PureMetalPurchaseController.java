package io.hearstcorporation.atelier.controller.inventory.puremetal;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseUpdateDto;
import io.hearstcorporation.atelier.service.inventory.puremetal.PureMetalPurchaseService;
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

import static io.hearstcorporation.atelier.controller.inventory.puremetal.PureMetalPurchaseController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class PureMetalPurchaseController {

    public static final String BASE_URL = "/api/v1/pure-metal-purchases";
    public static final String PURE_METAL_PURCHASE_ID = "/{pureMetalPurchaseId}";

    private final PureMetalPurchaseService pureMetalPurchaseService;

    @PostMapping
    public PureMetalPurchaseDto createPureMetalPurchase(@RequestBody @Valid PureMetalPurchaseRequestDto requestDto) {
        return pureMetalPurchaseService.createPureMetalPurchase(requestDto);
    }

    @PutMapping(PURE_METAL_PURCHASE_ID)
    public PureMetalPurchaseDto updatePureMetalPurchase(@PathVariable Long pureMetalPurchaseId,
                                                        @RequestBody @Valid PureMetalPurchaseUpdateDto diamondUpdateDto) {
        pureMetalPurchaseService.updatePureMetalPurchase(pureMetalPurchaseId, diamondUpdateDto);
        return pureMetalPurchaseService.getPureMetalPurchaseDto(pureMetalPurchaseId);
    }

    @GetMapping(PURE_METAL_PURCHASE_ID)
    public PureMetalPurchaseDto getPureMetalPurchase(@PathVariable Long pureMetalPurchaseId) {
        return pureMetalPurchaseService.getPureMetalPurchaseDto(pureMetalPurchaseId);
    }

    @DeleteMapping(PURE_METAL_PURCHASE_ID)
    public void deletePureMetalPurchase(@PathVariable Long pureMetalPurchaseId) {
        pureMetalPurchaseService.deletePureMetalPurchase(pureMetalPurchaseId);
    }

    @PostMapping("/search")
    public SearchDto<PureMetalPurchaseDto> searchPureMetalPurchases(@RequestBody @Valid SearchRequestDto<PureMetalPurchaseSearchCriteriaDto> searchQueryDto) {
        return pureMetalPurchaseService.searchPureMetalPurchases(searchQueryDto);
    }
}
