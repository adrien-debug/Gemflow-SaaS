package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;

import java.util.List;
import java.util.Map;

public interface MetalService {

    // Business logic methods

    void updateMetals(BatchUpdateDto<MetalUpdateInBatchDto, Long> batchUpdateDto);

    void updateCaratage(MetalCaratage metalCaratage, List<Long> ids);

    // Get Dto methods

    List<MetalDto> getMetalDtoList();

    MetalDto getMetalDto(Long id);

    Map<Long, MetalDto> getMetalDtoListMappedById(List<Long> ids);

    List<MetalDto> getMetalDtoListByMetalCaratageId(Long metalCaratageId);

    Map<Long, List<MetalDto>> getMetalDtoListGroupedByMetalCaratageId(List<Long> metalCaratageIds);

    // Get Entity methods

    Metal getMetal(Long id);

    List<Metal> getMetals(List<Long> ids);

    Map<Long, Metal> getMetalsMappedById(List<Long> ids);
}
