package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.ClientCategoryDto;
import io.hearstcorporation.atelier.dto.model.setting.ClientCategoryUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.ClientCategory;

import java.util.List;

public interface ClientCategoryService {

    List<ClientCategoryDto> getClientCategoryDtoList();

    ClientCategoryDto getClientCategoryDto(Long id);

    ClientCategory getClientCategory(Long id);

    void updateClientCategories(BatchUpdateDto<ClientCategoryUpdateInBatchDto, Long> batchUpdateDto);
}
