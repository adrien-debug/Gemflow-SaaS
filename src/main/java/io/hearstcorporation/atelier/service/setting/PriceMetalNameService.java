package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;

import java.util.List;

public interface PriceMetalNameService {

    List<PriceMetalNameDto> getPriceMetalNameDtoList();

    PriceMetalNameDto getPriceMetalNameDto(Long id);

    List<PriceMetalName> getPriceMetalNames();

    PriceMetalName getPriceMetalName(Long id);

    void updatePriceMetalNames(BatchUpdateDto<PriceMetalNameUpdateInBatchDto, Long> batchUpdateDto);
}
