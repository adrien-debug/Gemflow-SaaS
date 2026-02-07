package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.setting.GemsDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsUpdateInBatchDto;

public interface GemsCompositeService {

    GemsDto getGemsDto();

    void updateGems(GemsUpdateInBatchDto batchUpdateDto);
}
