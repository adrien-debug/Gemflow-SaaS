package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.DiamondShape;

import java.util.List;

public interface DiamondShapeService {

    List<DiamondShapeDto> getDiamondShapeDtoList();

    DiamondShapeDto getDiamondShapeDto(Long id);

    DiamondShape getDiamondShape(Long id);

    void updateDiamondShapes(BatchUpdateDto<DiamondShapeUpdateInBatchDto, Long> batchUpdateDto);
}
