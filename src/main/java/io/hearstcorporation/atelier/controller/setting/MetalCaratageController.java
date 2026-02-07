package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalCaratageDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalCaratageUpdateInBatchDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.service.setting.MetalCaratageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.MetalCaratageController.BASE_URL;


@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class MetalCaratageController {

    public static final String BASE_URL = "/api/v1/settings/caratages";

    private final MetalCaratageService metalCaratageService;

    @GetMapping
    public List<MetalCaratageDto> getMetalCaratages() {
        return metalCaratageService.getMetalCaratageDtoList();
    }

    @GetMapping(params = "metalId")
    public MetalCaratageDto getMetalCaratageByMetalId(@RequestParam("metalId") Long metalId) {
        return metalCaratageService.getMetalCaratageDtoByMetalId(metalId);
    }

    @GetMapping("/metal-purities")
    public List<MetalPurityDto> getMetalCaratagePuritiesByMetalId(@RequestParam("metalId") Long metalId) {
        return metalCaratageService.getMetalCaratagePurityDtoListByMetalId(metalId);
    }

    @GetMapping("/{id}")
    public MetalCaratageDto getMetalCaratage(@PathVariable Long id) {
        return metalCaratageService.getMetalCaratageDto(id);
    }

    @PutMapping
    public List<MetalCaratageDto> updateMetalCaratages(@RequestBody @Valid BatchUpdateDto<MetalCaratageUpdateInBatchDto, Long> batchUpdateDto) {
        metalCaratageService.updateMetalCaratages(batchUpdateDto);
        return metalCaratageService.getMetalCaratageDtoList();
    }
}
