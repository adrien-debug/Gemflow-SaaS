package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.BusinessLocationDto;
import io.hearstcorporation.atelier.dto.model.setting.BusinessLocationUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.BusinessLocation;

import java.util.List;

public interface BusinessLocationService {

    List<BusinessLocationDto> getBusinessLocationDtoList();

    BusinessLocationDto getBusinessLocationDto(Long id);

    BusinessLocation getBusinessLocation(Long id);

    void updateBusinessLocations(BatchUpdateDto<BusinessLocationUpdateInBatchDto, Long> batchUpdateDto);
}
