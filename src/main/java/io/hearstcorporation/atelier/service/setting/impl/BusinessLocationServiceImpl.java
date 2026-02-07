package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.BusinessLocationMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.BusinessLocationDto;
import io.hearstcorporation.atelier.dto.model.setting.BusinessLocationUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.BusinessLocation;
import io.hearstcorporation.atelier.model.setting.BusinessLocation_;
import io.hearstcorporation.atelier.repository.setting.BusinessLocationRepository;
import io.hearstcorporation.atelier.service.setting.BusinessLocationService;
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
public class BusinessLocationServiceImpl implements BusinessLocationService {

    private final BusinessLocationRepository businessLocationRepository;

    @Override
    public List<BusinessLocationDto> getBusinessLocationDtoList() {
        return BusinessLocationMapper.toBusinessLocationDtoList(businessLocationRepository.findAll(Sort.by(BusinessLocation_.ID)));
    }

    @Override
    public BusinessLocationDto getBusinessLocationDto(Long id) {
        return BusinessLocationMapper.toBusinessLocationDto(getBusinessLocation(id));
    }

    @Override
    public BusinessLocation getBusinessLocation(Long id) {
        return businessLocationRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Business location with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateBusinessLocations(BatchUpdateDto<BusinessLocationUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            BusinessLocation businessLocation = Optional.ofNullable(requestDto.getId())
                    .map(this::getBusinessLocation)
                    .orElseGet(BusinessLocation::new);
            BusinessLocationMapper.mapBusinessLocation(businessLocation, requestDto);
            businessLocationRepository.save(businessLocation);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> businessLocationRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Business locations %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
