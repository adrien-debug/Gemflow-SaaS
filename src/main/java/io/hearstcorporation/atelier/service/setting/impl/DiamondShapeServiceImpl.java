package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.DiamondShapeMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.DiamondShape;
import io.hearstcorporation.atelier.model.setting.DiamondShape_;
import io.hearstcorporation.atelier.repository.setting.DiamondShapeRepository;
import io.hearstcorporation.atelier.service.setting.DiamondShapeService;
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
public class DiamondShapeServiceImpl implements DiamondShapeService {

    private final DiamondShapeRepository diamondShapeRepository;

    @Override
    public List<DiamondShapeDto> getDiamondShapeDtoList() {
        return DiamondShapeMapper.toDiamondShapeDtoList(diamondShapeRepository.findAll(Sort.by(DiamondShape_.ID)));
    }

    @Override
    public DiamondShapeDto getDiamondShapeDto(Long id) {
        return DiamondShapeMapper.toDiamondShapeDto(getDiamondShape(id));
    }

    @Override
    public DiamondShape getDiamondShape(Long id) {
        return diamondShapeRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Diamond shape with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateDiamondShapes(BatchUpdateDto<DiamondShapeUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            DiamondShape diamondShape = Optional.ofNullable(requestDto.getId())
                    .map(this::getDiamondShape)
                    .orElseGet(DiamondShape::new);
            DiamondShapeMapper.mapDiamondShape(diamondShape, requestDto);
            diamondShapeRepository.save(diamondShape);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> diamondShapeRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Diamond shapes %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
