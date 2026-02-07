package io.hearstcorporation.atelier.controller.inventory.gemstone;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstonePaymentStatusDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneStatusDto;
import io.hearstcorporation.atelier.service.inventory.gemstone.GemstoneService;
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

import static io.hearstcorporation.atelier.controller.inventory.gemstone.GemstoneController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class GemstoneController {

    public static final String BASE_URL = "/api/v1/gemstones";
    public static final String GEMSTONE_ID = "/{gemstoneId}";

    private final GemstoneService gemstoneService;

    @GetMapping(GEMSTONE_ID)
    public GemstoneDto getGemstone(@PathVariable Long gemstoneId) {
        return gemstoneService.getGemstoneDto(gemstoneId);
    }

    @PostMapping
    public GemstoneDto createGemstone(@RequestBody @Valid GemstoneRequestDto gemstoneRequestDto) {
        Long gemstoneId = gemstoneService.createGemstone(gemstoneRequestDto);
        return gemstoneService.getGemstoneDto(gemstoneId);
    }

    @PutMapping(GEMSTONE_ID)
    public GemstoneDto updateGemstone(@PathVariable Long gemstoneId,
                                      @RequestBody @Valid GemstoneRequestDto gemstoneRequestDto) {
        gemstoneService.updateGemstone(gemstoneId, gemstoneRequestDto);
        return gemstoneService.getGemstoneDto(gemstoneId);
    }

    @PatchMapping(GEMSTONE_ID + "/status")
    public GemstoneDto changeGemstoneStatus(@PathVariable Long gemstoneId,
                                            @RequestBody @Valid GemstoneStatusDto gemstoneStatusDto) {
        gemstoneService.changeGemstoneStatus(gemstoneId, gemstoneStatusDto);
        return gemstoneService.getGemstoneDto(gemstoneId);
    }

    @PatchMapping(GEMSTONE_ID + "/payment-status")
    public GemstoneDto changeGemstonePaymentStatus(@PathVariable Long gemstoneId,
                                                   @RequestBody @Valid GemstonePaymentStatusDto gemstonePaymentStatusDto) {
        gemstoneService.changeGemstonePaymentStatus(gemstoneId, gemstonePaymentStatusDto);
        return gemstoneService.getGemstoneDto(gemstoneId);
    }

    @DeleteMapping(GEMSTONE_ID)
    public void deleteGemstone(@PathVariable Long gemstoneId) {
        gemstoneService.deleteGemstone(gemstoneId);
    }

    @PostMapping("/search")
    public SearchDto<GemstoneDto> searchGemstones(@RequestBody @Valid SearchRequestDto<GemstoneSearchCriteriaDto> gemstoneSearchQueryDto) {
        return gemstoneService.searchGemstones(gemstoneSearchQueryDto);
    }

    @PostMapping("/total")
    public InventoryTotalDto getGemstoneTotalDto(@RequestBody @Valid GemstoneSearchCriteriaDto searchQueryDto) {
        return gemstoneService.getGemstoneTotalDto(searchQueryDto);
    }
}
