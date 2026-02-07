package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.MetalPurityMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.model.setting.MetalPurity_;
import io.hearstcorporation.atelier.repository.setting.MetalPurityRepository;
import io.hearstcorporation.atelier.service.setting.MetalPurityService;
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
public class MetalPurityServiceImpl implements MetalPurityService {

    private final MetalPurityRepository metalPurityRepository;

    @Override
    @Transactional
    public void updateMetalPurities(MetalCaratage metalCaratage, BatchUpdateDto<MetalPurityUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        Map<Long, MetalPurity> metalPurityMap = getMetalPuritiesMappedById(batchUpdateDto.getRequestDtoIds());
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            MetalPurity metalPurity = Optional.ofNullable(requestDto.getId())
                    .map(metalPurityMap::get)
                    .orElseGet(MetalPurity::new);
            MetalPurityMapper.mapMetalPurity(metalPurity, requestDto, metalCaratage);
            metalPurityRepository.save(metalPurity);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds()) && metalCaratage.getId() != null) {
            ExceptionWrapper.onDelete(() -> metalPurityRepository.deleteByIdsAndMetalCaratageId(
                            batchUpdateDto.getDeletedIds(), metalCaratage.getId()),
                    "Metal purities %s cannot be deleted for metal caratage %d.".formatted(batchUpdateDto.getDeletedIds(),
                            metalCaratage.getId()));
        }
    }

    @Override
    public List<MetalPurityDto> getMetalPurityDtoList() {
        return MetalPurityMapper.toMetalPurityDtoList(metalPurityRepository.findAll(Sort.by(MetalPurity_.ID)));
    }

    @Override
    public MetalPurityDto getMetalPurityDto(Long id) {
        return MetalPurityMapper.toMetalPurityDto(getMetalPurity(id));
    }

    @Override
    public List<MetalPurityDto> getMetalPurityDtoListByMetalCaratageId(Long metalCaratageId) {
        return MetalPurityMapper.toMetalPurityDtoList(metalPurityRepository.findAllByMetalCaratageIdOrderByIdAsc(metalCaratageId));
    }

    @Override
    public Map<Long, List<MetalPurityDto>> getMetalPurityDtoListGroupedByMetalCaratageId(List<Long> metalCaratageIds) {
        List<MetalPurity> metalPurities = metalPurityRepository.findAllByMetalCaratageIdInOrderByIdAsc(metalCaratageIds);
        Map<Long, List<MetalPurity>> metalPuritiesGroupedByMetalCaratageId = metalPurities.stream()
                .collect(Collectors.groupingBy(metalPurity -> metalPurity.getMetalCaratage().getId()));
        return metalPuritiesGroupedByMetalCaratageId.entrySet().stream().collect(Collectors.toMap(
                Map.Entry::getKey, e -> MetalPurityMapper.toMetalPurityDtoList(e.getValue())));
    }

    @Override
    public MetalPurity getMetalPurity(Long id) {
        return metalPurityRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Metal purity with id %d was not found.".formatted(id))
        );
    }

    @Override
    public List<MetalPurity> getMetalPurities(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return new ArrayList<>();
        }
        List<MetalPurity> entities = metalPurityRepository.findAllByIdInOrderByIdAsc(ids);
        ServiceHelper.compareIdsOrThrow(entities, ids, MetalPurity.class);
        return entities;
    }

    @Override
    public Map<Long, MetalPurity> getMetalPuritiesMappedById(List<Long> ids) {
        return getMetalPurities(ids).stream().collect(Collectors.toMap(MetalPurity::getId, Function.identity()));
    }
}
