package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.CylinderMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.Cylinder;
import io.hearstcorporation.atelier.model.setting.Cylinder_;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.repository.setting.CylinderRepository;
import io.hearstcorporation.atelier.service.setting.CylinderService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Sort;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CylinderServiceImpl implements CylinderService {

    private final CylinderRepository cylinderRepository;

    @Override
    @Transactional
    public void updateCylinders(BatchUpdateDto<CylinderUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            Cylinder cylinder = Optional.ofNullable(requestDto.getId())
                    .map(this::getCylinder)
                    .orElseGet(Cylinder::new);
            CylinderMapper.mapCylinder(cylinder, requestDto);
            cylinderRepository.save(cylinder);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> cylinderRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Cylinders %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void openCylinder(Cylinder cylinder, Metal metal) {
        if (cylinder.getOpen()) {
            throw new InvalidDataException("Cylinder with id %d already open".formatted(cylinder.getId()));
        }
        Metal cylinderMetal = cylinder.getMetal();
        if (cylinderMetal != null && !cylinderMetal.getId().equals(metal.getId())) {
            throw new InvalidDataException(String.format("Cannot put metal with id %d to cylinder with id %d. " +
                    "Cylinder is using for metal with id %d.", metal.getId(), cylinder.getId(), cylinderMetal.getId()));
        }
        cylinder.setMetal(metal);
        cylinder.setOpen(true);
        cylinderRepository.save(cylinder);
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void closeCylinder(Cylinder cylinder) {
        if (!cylinder.getOpen()) {
            throw new InvalidDataException("Cylinder with id %d already closed".formatted(cylinder.getId()));
        }
        cylinder.setMetal(null);
        cylinder.setOpen(false);
        cylinderRepository.save(cylinder);
    }

    @Override
    public List<CylinderDto> getCylinderDtoList() {
        return CylinderMapper.toCylinderDtoList(cylinderRepository.findAll(Sort.by(Cylinder_.ID)));
    }

    @Override
    public CylinderDto getCylinderDto(Long id) {
        return CylinderMapper.toCylinderDto(getCylinder(id));
    }

    @Override
    public Cylinder getCylinder(Long id) {
        return retrieveCylinder(id, cylinderRepository.findById(id));
    }

    @Override
    public Cylinder getFullCylinder(Long id) {
        return retrieveCylinder(id, cylinderRepository.findCylinderById(id));
    }

    private Cylinder retrieveCylinder(Long id, Optional<Cylinder> cylinderOpt) {
        return cylinderOpt.orElseThrow(
                () -> new NotFoundException("Cylinder with id %d was not found.".formatted(id))
        );
    }
}
