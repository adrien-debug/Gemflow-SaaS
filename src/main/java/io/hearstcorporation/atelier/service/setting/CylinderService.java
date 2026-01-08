package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.Cylinder;
import io.hearstcorporation.atelier.model.setting.Metal;

import java.util.List;

public interface CylinderService {

    // Business logic methods

    void updateCylinders(BatchUpdateDto<CylinderUpdateInBatchDto, Long> batchUpdateDto);

    void openCylinder(Cylinder cylinder, Metal metal);

    void closeCylinder(Cylinder cylinder);

    // Get Dto methods

    List<CylinderDto> getCylinderDtoList();

    CylinderDto getCylinderDto(Long id);

    // Get Entity methods

    Cylinder getCylinder(Long id);

    Cylinder getFullCylinder(Long id);
}
