package io.hearstcorporation.atelier.controller.inventory.diamond;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondQuantityDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondUpdateDto;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.service.inventory.diamond.DiamondService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.inventory.diamond.DiamondController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class DiamondController {

    public static final String BASE_URL = "/api/v1/diamonds";
    public static final String DIAMOND_ID = "/{diamondId}";

    private final DiamondService diamondService;

    @PostMapping
    public DiamondDto createDiamond(@RequestBody @Valid DiamondRequestDto diamondRequestDto) {
        return diamondService.createDiamond(diamondRequestDto);
    }

    @PutMapping(DIAMOND_ID)
    public DiamondDto updateDiamond(@PathVariable Long diamondId,
                                    @RequestBody @Valid DiamondUpdateDto diamondUpdateDto) {
        diamondService.updateDiamond(diamondId, diamondUpdateDto);
        return diamondService.getDiamondDto(diamondId);
    }

    @GetMapping(DIAMOND_ID)
    public DiamondDto getDiamond(@PathVariable Long diamondId) {
        return diamondService.getDiamondDto(diamondId);
    }

    @DeleteMapping(DIAMOND_ID)
    public void deleteDiamond(@PathVariable Long diamondId) {
        diamondService.deleteDiamond(diamondId);
    }

    @PostMapping("/search")
    public SearchDto<DiamondDto> searchDiamonds(@RequestBody @Valid SearchRequestDto<DiamondSearchCriteriaDto> searchQueryDto) {
        return diamondService.searchDiamonds(searchQueryDto);
    }

    @PatchMapping(DIAMOND_ID + "/quantity/add")
    public DiamondDto addDiamondQuantity(@PathVariable Long diamondId,
                                         @RequestBody @Valid DiamondQuantityDto diamondQuantityDto) {
        diamondService.addDiamondQuantity(diamondId, diamondQuantityDto);
        return diamondService.getDiamondDto(diamondId);
    }

    @PatchMapping(DIAMOND_ID + "/quantity/reduce")
    public DiamondDto reduceDiamondQuantity(@PathVariable Long diamondId,
                                            @RequestBody @Valid DiamondQuantityDto diamondQuantityDto) {
        diamondService.reduceDiamondQuantity(diamondId, diamondQuantityDto);
        return diamondService.getDiamondDto(diamondId);
    }

    @PostMapping("/total")
    public InventoryTotalDto getTotalPrices(@RequestBody @Valid DiamondSearchCriteriaDto searchQueryDto) {
        return diamondService.getDiamondTotalDto(searchQueryDto);
    }
}
