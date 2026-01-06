package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.SupplyTypeMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.SupplyTypeDto;
import io.hearstcorporation.atelier.dto.model.setting.SupplyTypeUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.SupplyType;
import io.hearstcorporation.atelier.model.setting.SupplyType_;
import io.hearstcorporation.atelier.repository.setting.SupplyTypeRepository;
import io.hearstcorporation.atelier.service.setting.SupplyTypeService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SupplyTypeServiceImpl implements SupplyTypeService {

    private final SupplyTypeRepository supplyTypeRepository;

    @Override
    public List<SupplyTypeDto> getSupplyTypeDtoList() {
        return SupplyTypeMapper.toSupplyTypeDtoList(supplyTypeRepository.findAll(
                Sort.by(Sort.Order.desc(SupplyType_.IMMUTABLE), Sort.Order.asc(SupplyType_.ID))));
    }

    @Override
    public SupplyTypeDto getSupplyTypeDto(Long id) {
        return SupplyTypeMapper.toSupplyTypeDto(getSupplyType(id));
    }

    @Override
    public SupplyType getSupplyType(Long id) {
        return supplyTypeRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Supply type with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateSupplyTypes(BatchUpdateDto<SupplyTypeUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        //todo: update all batch updates to collect all entities by on query, not separate query per entity
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            SupplyType supplyType = Optional.ofNullable(requestDto.getId())
                    .map(this::getSupplyType)
                    .orElseGet(SupplyType::new);
            SupplyTypeMapper.mapSupplyType(supplyType, requestDto);
            supplyTypeRepository.save(supplyType);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> supplyTypeRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Supply types %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
