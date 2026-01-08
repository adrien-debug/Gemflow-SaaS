package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.SegmentDto;
import io.hearstcorporation.atelier.dto.model.setting.SegmentRequestDto;
import io.hearstcorporation.atelier.model.setting.Segment;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class SegmentMapper {

    public static List<SegmentDto> toSegmentDtoList(List<Segment> segments) {
        return segments.stream()
                .map(SegmentMapper::toSegmentDto)
                .collect(Collectors.toList());
    }

    public static SegmentDto toSegmentDto(Segment entity) {
        if (entity == null) {
            return null;
        }
        return SegmentDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapSegment(Segment entity, SegmentRequestDto dto) {
        entity.setName(dto.getName());
    }
}
