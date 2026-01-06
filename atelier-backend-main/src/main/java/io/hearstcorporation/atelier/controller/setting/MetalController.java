package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalUpdateInBatchDto;
import io.hearstcorporation.atelier.service.setting.MetalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.MetalController.BASE_URL;


@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class MetalController {

    public static final String BASE_URL = "/api/v1/settings/metals";

    private final MetalService metalService;

    @GetMapping
    public List<MetalDto> getMetals() {
        return metalService.getMetalDtoList();
    }

    @GetMapping("/{id}")
    public MetalDto getMetal(@PathVariable Long id) {
        return metalService.getMetalDto(id);
    }

    @PutMapping
    public List<MetalDto> updateMetals(@RequestBody @Valid BatchUpdateDto<MetalUpdateInBatchDto, Long> batchUpdateDto) {
        metalService.updateMetals(batchUpdateDto);
        return metalService.getMetalDtoList();
    }
}
