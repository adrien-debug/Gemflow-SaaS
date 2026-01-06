package io.hearstcorporation.atelier.controller.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.model.InventoryTotalCostDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalUpdateDto;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalService;
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

import static io.hearstcorporation.atelier.controller.inventory.alloyedmetal.AlloyedMetalController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class AlloyedMetalController {

    public static final String BASE_URL = "/api/v1/alloyed-metals";
    public static final String ALLOYED_METAL_ID = "/{alloyedMetalId}";

    private final AlloyedMetalService alloyedMetalService;

    @PostMapping
    public AlloyedMetalDto createAlloyedMetal(@RequestBody @Valid AlloyedMetalRequestDto requestDto) {
        return alloyedMetalService.createAlloyedMetal(requestDto);
    }

    @PutMapping(ALLOYED_METAL_ID)
    public AlloyedMetalDto updateAlloyedMetal(@PathVariable Long alloyedMetalId, @RequestBody @Valid AlloyedMetalUpdateDto requestDto) {
        alloyedMetalService.updateAlloyedMetal(alloyedMetalId, requestDto);
        return alloyedMetalService.getAlloyedMetalDto(alloyedMetalId);
    }

    @GetMapping(ALLOYED_METAL_ID)
    public AlloyedMetalDto getAlloyedMetal(@PathVariable Long alloyedMetalId) {
        return alloyedMetalService.getAlloyedMetalDto(alloyedMetalId);
    }

    @DeleteMapping(ALLOYED_METAL_ID)
    public void deleteAlloyedMetal(@PathVariable Long alloyedMetalId) {
        alloyedMetalService.deleteAlloyedMetal(alloyedMetalId);
    }

    @PostMapping("/search")
    public SearchDto<AlloyedMetalDto> searchAlloyedMetals(@RequestBody @Valid SearchRequestDto<AlloyedMetalSearchCriteriaDto> searchQueryDto) {
        return alloyedMetalService.searchAlloyedMetals(searchQueryDto);
    }

    @PostMapping("/total")
    public InventoryTotalCostDto getTotalCost(@RequestBody @Valid AlloyedMetalSearchCriteriaDto searchQueryDto) {
        return alloyedMetalService.getAlloyedMetalTotalCostDto(searchQueryDto);
    }
}
