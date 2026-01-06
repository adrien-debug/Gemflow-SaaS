package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.SegmentDto;
import io.hearstcorporation.atelier.dto.model.setting.SegmentUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.Segment;

import java.util.List;

public interface SegmentService {

    List<SegmentDto> getSegmentDtoList();

    SegmentDto getSegmentDto(Long id);

    Segment getSegment(Long id);

    void updateSegments(BatchUpdateDto<SegmentUpdateInBatchDto, Long> batchUpdateDto);
}
