package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.LocationMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.LocationDto;
import io.hearstcorporation.atelier.dto.model.setting.LocationUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.Location;
import io.hearstcorporation.atelier.model.setting.Location_;
import io.hearstcorporation.atelier.repository.setting.LocationRepository;
import io.hearstcorporation.atelier.service.setting.LocationService;
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
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Override
    public List<LocationDto> getLocationDtoList() {
        return LocationMapper.toLocationDtoList(locationRepository.findAll(Sort.by(Location_.ID)));
    }

    @Override
    public LocationDto getLocationDto(Long id) {
        return LocationMapper.toLocationDto(getLocation(id));
    }

    @Override
    public Location getLocation(Long id) {
        return locationRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Location with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateLocations(BatchUpdateDto<LocationUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            Location location = Optional.ofNullable(requestDto.getId())
                    .map(this::getLocation)
                    .orElseGet(Location::new);
            LocationMapper.mapLocation(location, requestDto);
            locationRepository.save(location);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> locationRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Locations %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
