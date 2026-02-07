package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.MetalCaratageMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalCaratageDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalCaratageUpdateInBatchDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import io.hearstcorporation.atelier.model.setting.MetalCaratage_;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import io.hearstcorporation.atelier.repository.setting.MetalCaratageRepository;
import io.hearstcorporation.atelier.service.setting.MetalCaratageService;
import io.hearstcorporation.atelier.service.setting.MetalPurityService;
import io.hearstcorporation.atelier.service.setting.MetalService;
import io.hearstcorporation.atelier.service.setting.PriceMetalNameService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import io.hearstcorporation.atelier.util.ServiceHelper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MetalCaratageServiceImpl implements MetalCaratageService {

    private final MetalCaratageRepository metalCaratageRepository;
    private final PriceMetalNameService priceMetalNameService;
    private final MetalService metalService;
    private final MetalPurityService metalPurityService;

    @Override
    @Transactional
    public void updateMetalCaratages(BatchUpdateDto<MetalCaratageUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        Map<Long, MetalCaratage> metalCaratagesMappedById = getMetalCaratagesMappedById(batchUpdateDto.getRequestDtoIds());
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            MetalCaratage metalCaratage = Optional.ofNullable(requestDto.getId())
                    .map(metalCaratagesMappedById::get)
                    .orElseGet(MetalCaratage::new);
            MetalCaratageMapper.mapMetalCaratage(metalCaratage, requestDto);
            metalCaratage.setPriceMetalName(priceMetalNameService.getPriceMetalName(requestDto.getPriceMetalNameId()));
            metalCaratage = metalCaratageRepository.save(metalCaratage);
            metalService.updateCaratage(metalCaratage, requestDto.getMetalIds());
            metalPurityService.updateMetalPurities(metalCaratage, requestDto.getMetalPurities());
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> metalCaratageRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Metal caratages %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }

    @Override
    public boolean metalCaratageExistsByMetalIdAndPurityId(Long metalId, Long metalPurityId) {
        return metalCaratageRepository.existsByMetalIdAndMetalPurityId(metalId, metalPurityId);
    }

    @Override
    public void metalCaratageExistsByMetalIdAndPurityIdOrThrow(Long metalId, Long metalPurityId) {
        if (!metalCaratageExistsByMetalIdAndPurityId(metalId, metalPurityId)) {
            throw new InvalidDataException("Metal purity with id %d not suitable for the metal with id %d"
                    .formatted(metalPurityId, metalId));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public MetalCaratageDto getMetalCaratageDto(Long id) {
        List<MetalDto> metals = metalService.getMetalDtoListByMetalCaratageId(id);
        List<MetalPurityDto> metalPurities = metalPurityService.getMetalPurityDtoListByMetalCaratageId(id);
        return MetalCaratageMapper.toMetalCaratageDto(getFullMetalCaratage(id), metals, metalPurities);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MetalCaratageDto> getMetalCaratageDtoList() {
        List<MetalCaratage> metalCaratages = metalCaratageRepository.findAll(Sort.by(MetalCaratage_.ID));
        List<Long> metalCaratageIds = metalCaratages.stream().map(MetalCaratage::getId).toList();
        Map<Long, List<MetalDto>> metalDtoListGroupedByMetalCaratageId =
                metalService.getMetalDtoListGroupedByMetalCaratageId(metalCaratageIds);
        Map<Long, List<MetalPurityDto>> metalPurityDtoListGroupedByMetalCaratageId =
                metalPurityService.getMetalPurityDtoListGroupedByMetalCaratageId(metalCaratageIds);
        return MetalCaratageMapper.toMetalCaratageDtoList(metalCaratages,
                metalDtoListGroupedByMetalCaratageId, metalPurityDtoListGroupedByMetalCaratageId);
    }

    @Override
    @Transactional(readOnly = true)
    public MetalCaratageDto getMetalCaratageDtoByMetalId(Long metalId) {
        MetalCaratage metalCaratage = getMetalCaratageByMetalId(metalId);
        List<MetalDto> metals = metalService.getMetalDtoListByMetalCaratageId(metalCaratage.getId());
        List<MetalPurityDto> metalPurities = metalPurityService.getMetalPurityDtoListByMetalCaratageId(metalCaratage.getId());
        return MetalCaratageMapper.toMetalCaratageDto(metalCaratage, metals, metalPurities);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MetalPurityDto> getMetalCaratagePurityDtoListByMetalId(Long metalId) {
        return metalCaratageRepository.findByMetalId(metalId)
                .map(MetalCaratage::getId)
                .map(metalPurityService::getMetalPurityDtoListByMetalCaratageId)
                .orElseGet(List::of);
    }

    @Override
    public MetalCaratage getMetalCaratage(Long id) {
        return retrieveMetalCaratage(id, metalCaratageRepository.findById(id));
    }

    @Override
    public MetalCaratage getFullMetalCaratage(Long id) {
        return retrieveMetalCaratage(id, metalCaratageRepository.findMetalCaratageById(id));
    }

    private MetalCaratage retrieveMetalCaratage(Long id, Optional<MetalCaratage> metalCaratageOpt) {
        return metalCaratageOpt.orElseThrow(
                () -> new NotFoundException("Metal caratage with id %d was not found.".formatted(id))
        );
    }

    private MetalCaratage retrieveMetalCaratageByMetalId(Long metalId, Optional<MetalCaratage> metalCaratageOpt) {
        return metalCaratageOpt.orElseThrow(
                () -> new NotFoundException("Metal caratage by metal id %d was not found.".formatted(metalId))
        );
    }

    @Override
    public List<MetalCaratage> getMetalCaratages(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return new ArrayList<>();
        }
        List<MetalCaratage> foundEntities = metalCaratageRepository.findAllByIdInOrderByIdAsc(ids);
        ServiceHelper.compareIdsOrThrow(foundEntities, ids, MetalCaratage.class);
        return foundEntities;
    }

    @Override
    public Map<Long, MetalCaratage> getMetalCaratagesMappedById(List<Long> ids) {
        return getMetalCaratages(ids).stream().collect(Collectors.toMap(MetalCaratage::getId, Function.identity()));
    }

    @Override
    public MetalCaratage getMetalCaratageByMetalId(Long metalId) {
        return retrieveMetalCaratageByMetalId(metalId, metalCaratageRepository.findMetalCaratageByMetalId(metalId));
    }

    @Override
    public PriceMetalName getPriceMetalNameByMetalId(Long metalId) {
        MetalCaratage metalCaratage = getMetalCaratageByMetalId(metalId);
        PriceMetalName priceMetalName = metalCaratage.getPriceMetalName();
        if (priceMetalName == null) {
            throw new NotFoundException("Price metal name by metal with id %d was not found.".formatted(metalId));
        }
        return priceMetalName;
    }
}
