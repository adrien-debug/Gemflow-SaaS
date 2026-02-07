package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.SupplyTypeDto;
import io.hearstcorporation.atelier.dto.model.setting.SupplyTypeUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.SupplyType;

import java.util.List;

public interface SupplyTypeService {

    List<SupplyTypeDto> getSupplyTypeDtoList();

    SupplyTypeDto getSupplyTypeDto(Long id);

    SupplyType getSupplyType(Long id);

    void updateSupplyTypes(BatchUpdateDto<SupplyTypeUpdateInBatchDto, Long> batchUpdateDto);
}
