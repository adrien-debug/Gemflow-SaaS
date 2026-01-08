package io.hearstcorporation.atelier.controller.inventory.alloy;

import io.hearstcorporation.atelier.dto.model.InventoryTotalCostDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloySearchCriteriaDto;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyService;
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

import static io.hearstcorporation.atelier.controller.inventory.alloy.AlloyController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class AlloyController {

    public static final String BASE_URL = "/api/v1/alloys";
    public static final String ALLOY_ID = "/{alloyId}";

    private final AlloyService alloyService;

    @PostMapping
    public AlloyDto createAlloy(@RequestBody @Valid AlloyRequestDto requestDto) {
        return alloyService.createAlloy(requestDto);
    }

    @PutMapping(ALLOY_ID)
    public AlloyDto updateAlloy(@PathVariable Long alloyId, @RequestBody @Valid AlloyRequestDto requestDto) {
        alloyService.updateAlloy(alloyId, requestDto);
        return alloyService.getAlloyDto(alloyId);
    }

    @GetMapping(ALLOY_ID)
    public AlloyDto getAlloy(@PathVariable Long alloyId) {
        return alloyService.getAlloyDto(alloyId);
    }

    @DeleteMapping(ALLOY_ID)
    public void deleteAlloy(@PathVariable Long alloyId) {
        alloyService.deleteAlloy(alloyId);
    }

    @PostMapping("/search")
    public SearchDto<AlloyDto> searchAlloys(@RequestBody @Valid SearchRequestDto<AlloySearchCriteriaDto> searchQueryDto) {
        return alloyService.searchAlloys(searchQueryDto);
    }

    @PostMapping("/total")
    public InventoryTotalCostDto getTotalCost(@RequestBody @Valid AlloySearchCriteriaDto searchQueryDto) {
        return alloyService.getAlloyTotalCostDto(searchQueryDto);
    }
}
