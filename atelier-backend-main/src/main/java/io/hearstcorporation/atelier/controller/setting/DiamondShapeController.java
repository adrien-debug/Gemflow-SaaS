package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeUpdateInBatchDto;
import io.hearstcorporation.atelier.service.setting.DiamondShapeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.DiamondShapeController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class DiamondShapeController {

    public static final String BASE_URL = "/api/v1/settings/diamonds/shapes";

    private final DiamondShapeService diamondShapeService;

    @GetMapping
    public List<DiamondShapeDto> getDiamondShapes() {
        return diamondShapeService.getDiamondShapeDtoList();
    }

    @GetMapping("/{id}")
    public DiamondShapeDto getDiamondShape(@PathVariable Long id) {
        return diamondShapeService.getDiamondShapeDto(id);
    }

    @PutMapping
    public List<DiamondShapeDto> updateDiamondShapes(@RequestBody @Valid BatchUpdateDto<DiamondShapeUpdateInBatchDto, Long> batchUpdateDto) {
        diamondShapeService.updateDiamondShapes(batchUpdateDto);
        return diamondShapeService.getDiamondShapeDtoList();
    }
}
