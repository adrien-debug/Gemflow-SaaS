package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderUpdateInBatchDto;
import io.hearstcorporation.atelier.service.setting.CylinderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.CylinderController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class CylinderController {

    public static final String BASE_URL = "/api/v1/settings/cylinders";

    private final CylinderService cylinderService;

    @GetMapping
    public List<CylinderDto> getCylinders() {
        return cylinderService.getCylinderDtoList();
    }

    @GetMapping("/{cylinderId}")
    public CylinderDto getCylinder(@PathVariable Long cylinderId) {
        return cylinderService.getCylinderDto(cylinderId);
    }

    @PutMapping
    public List<CylinderDto> updateCylinders(@RequestBody @Valid BatchUpdateDto<CylinderUpdateInBatchDto, Long> batchUpdateDto) {
        cylinderService.updateCylinders(batchUpdateDto);
        return cylinderService.getCylinderDtoList();
    }
}
