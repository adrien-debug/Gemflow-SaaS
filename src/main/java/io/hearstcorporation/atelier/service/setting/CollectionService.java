package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.CollectionDto;
import io.hearstcorporation.atelier.dto.model.setting.CollectionUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.Collection;

import java.util.List;

public interface CollectionService {

    List<CollectionDto> getCollectionDtoList();

    CollectionDto getCollectionDto(Long id);

    Collection getCollection(Long id);

    void updateCollections(BatchUpdateDto<CollectionUpdateInBatchDto, Long> batchUpdateDto);
}
