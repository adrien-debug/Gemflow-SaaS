package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.SegmentMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.SegmentDto;
import io.hearstcorporation.atelier.dto.model.setting.SegmentUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.Segment;
import io.hearstcorporation.atelier.model.setting.Segment_;
import io.hearstcorporation.atelier.repository.setting.SegmentRepository;
import io.hearstcorporation.atelier.service.setting.SegmentService;
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
public class SegmentServiceImpl implements SegmentService {

    private final SegmentRepository segmentRepository;

    @Override
    public List<SegmentDto> getSegmentDtoList() {
        return SegmentMapper.toSegmentDtoList(segmentRepository.findAll(Sort.by(Segment_.ID)));
    }

    @Override
    public SegmentDto getSegmentDto(Long id) {
        return SegmentMapper.toSegmentDto(getSegment(id));
    }

    @Override
    public Segment getSegment(Long id) {
        return segmentRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Segment with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateSegments(BatchUpdateDto<SegmentUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            Segment segment = Optional.ofNullable(requestDto.getId())
                    .map(this::getSegment)
                    .orElseGet(Segment::new);
            SegmentMapper.mapSegment(segment, requestDto);
            segmentRepository.save(segment);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> segmentRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Segments %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
