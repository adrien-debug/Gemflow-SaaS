package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.MetalMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import io.hearstcorporation.atelier.model.setting.Metal_;
import io.hearstcorporation.atelier.repository.setting.MetalRepository;
import io.hearstcorporation.atelier.service.setting.MetalService;
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
public class MetalServiceImpl implements MetalService {

    private final MetalRepository metalRepository;

    @Override
    @Transactional
    public void updateMetals(BatchUpdateDto<MetalUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            Metal metal = Optional.ofNullable(requestDto.getId())
                    .map(this::getMetal)
                    .orElseGet(Metal::new);
            MetalMapper.mapMetal(metal, requestDto);
            metalRepository.save(metal);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> metalRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Metals %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }

    @Override
    @Transactional
    public void updateCaratage(MetalCaratage metalCaratage, List<Long> ids) {
        List<Long> currentMetalIds = metalRepository.findAllByMetalCaratageId(metalCaratage.getId()).stream()
                .map(Metal::getId)
                .toList();

        List<Long> newMetalIds = ids.stream().filter(id -> !currentMetalIds.contains(id)).toList();
        if (CollectionUtils.isNotEmpty(newMetalIds)) metalRepository.setMetalCaratage(metalCaratage, newMetalIds);

        List<Long> resetMetalIds = currentMetalIds.stream().filter(id -> !ids.contains(id)).toList();
        if (CollectionUtils.isNotEmpty(resetMetalIds)) metalRepository.resetMetalCaratage(metalCaratage, resetMetalIds);
    }

    @Override
    public List<MetalDto> getMetalDtoList() {
        return MetalMapper.toMetalDtoList(metalRepository.findAll(Sort.by(Metal_.ID)));
    }

    @Override
    public MetalDto getMetalDto(Long id) {
        return MetalMapper.toMetalDto(getMetal(id));
    }

    @Override
    public Map<Long, MetalDto> getMetalDtoListMappedById(List<Long> ids) {
        return getMetals(ids).stream()
                .map(MetalMapper::toMetalDto)
                .collect(Collectors.toMap(MetalDto::getId, Function.identity()));
    }

    @Override
    public List<MetalDto> getMetalDtoListByMetalCaratageId(Long metalCaratageId) {
        return MetalMapper.toMetalDtoList(metalRepository.findAllByMetalCaratageIdOrderByIdAsc(metalCaratageId));
    }

    @Override
    public Map<Long, List<MetalDto>> getMetalDtoListGroupedByMetalCaratageId(List<Long> metalCaratageIds) {
        List<Metal> metals = metalRepository.findAllByMetalCaratageIdInOrderByIdAsc(metalCaratageIds);
        Map<Long, List<Metal>> metalsGroupedByMetalCaratageId = metals.stream()
                .collect(Collectors.groupingBy(metal -> metal.getMetalCaratage().getId()));
        return metalsGroupedByMetalCaratageId.entrySet().stream().collect(Collectors.toMap(
                Map.Entry::getKey, e -> MetalMapper.toMetalDtoList(e.getValue())));
    }

    @Override
    public Metal getMetal(Long id) {
        return metalRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Metal with id %d was not found.".formatted(id))
        );
    }

    @Override
    public List<Metal> getMetals(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return new ArrayList<>();
        }
        List<Metal> foundEntities = metalRepository.findAllByIdInOrderByIdAsc(ids);
        ServiceHelper.compareIdsOrThrow(foundEntities, ids, Metal.class);
        return foundEntities;
    }

    @Override
    public Map<Long, Metal> getMetalsMappedById(List<Long> ids) {
        return getMetals(ids).stream().collect(Collectors.toMap(Metal::getId, Function.identity()));
    }
}
