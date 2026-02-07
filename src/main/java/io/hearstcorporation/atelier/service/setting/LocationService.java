package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.LocationDto;
import io.hearstcorporation.atelier.dto.model.setting.LocationUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.Location;

import java.util.List;

public interface LocationService {

    List<LocationDto> getLocationDtoList();

    LocationDto getLocationDto(Long id);

    Location getLocation(Long id);

    void updateLocations(BatchUpdateDto<LocationUpdateInBatchDto, Long> batchUpdateDto);
}
