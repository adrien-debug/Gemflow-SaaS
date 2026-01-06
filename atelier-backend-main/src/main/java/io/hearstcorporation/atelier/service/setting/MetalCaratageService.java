package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalCaratageDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalCaratageUpdateInBatchDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;

import java.util.List;
import java.util.Map;

public interface MetalCaratageService {

    // Business logic methods

    void updateMetalCaratages(BatchUpdateDto<MetalCaratageUpdateInBatchDto, Long> batchUpdateDto);

    boolean metalCaratageExistsByMetalIdAndPurityId(Long metalId, Long metalPurityId);

    void metalCaratageExistsByMetalIdAndPurityIdOrThrow(Long metalId, Long metalPurityId);

    // Get Dto methods

    MetalCaratageDto getMetalCaratageDto(Long id);

    List<MetalCaratageDto> getMetalCaratageDtoList();

    MetalCaratageDto getMetalCaratageDtoByMetalId(Long metalId);

    List<MetalPurityDto> getMetalCaratagePurityDtoListByMetalId(Long metalId);

    // Get Entity methods

    MetalCaratage getMetalCaratage(Long id);

    MetalCaratage getFullMetalCaratage(Long id);

    List<MetalCaratage> getMetalCaratages(List<Long> ids);

    Map<Long, MetalCaratage> getMetalCaratagesMappedById(List<Long> ids);

    MetalCaratage getMetalCaratageByMetalId(Long metalId);

    PriceMetalName getPriceMetalNameByMetalId(Long metalId);
}
