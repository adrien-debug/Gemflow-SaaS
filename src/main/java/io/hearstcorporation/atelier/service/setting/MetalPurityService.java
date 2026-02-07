package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import io.hearstcorporation.atelier.model.setting.MetalPurity;

import java.util.List;
import java.util.Map;

public interface MetalPurityService {

    // Business logic methods

    void updateMetalPurities(MetalCaratage metalCaratage, BatchUpdateDto<MetalPurityUpdateInBatchDto, Long> batchUpdateDto);

    // Get Dto methods

    List<MetalPurityDto> getMetalPurityDtoList();

    MetalPurityDto getMetalPurityDto(Long id);

    List<MetalPurityDto> getMetalPurityDtoListByMetalCaratageId(Long metalCaratageId);

    Map<Long, List<MetalPurityDto>> getMetalPurityDtoListGroupedByMetalCaratageId(List<Long> metalCaratageIds);

    // Get Entity methods

    MetalPurity getMetalPurity(Long id);

    List<MetalPurity> getMetalPurities(List<Long> ids);

    Map<Long, MetalPurity> getMetalPuritiesMappedById(List<Long> ids);

}
