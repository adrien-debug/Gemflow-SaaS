package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.setting.ParametersDto;
import io.hearstcorporation.atelier.dto.model.setting.ParametersUpdateInBatchDto;

public interface ParametersCompositeService {

    ParametersDto getParametersDto();

    void updateParameters(ParametersUpdateInBatchDto batchUpdateDto);
}
