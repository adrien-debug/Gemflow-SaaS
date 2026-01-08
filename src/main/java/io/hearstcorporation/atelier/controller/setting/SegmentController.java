package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.SegmentDto;
import io.hearstcorporation.atelier.service.setting.SegmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.SegmentController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class SegmentController {

    public static final String BASE_URL = "/api/v1/settings/segments";

    private final SegmentService segmentService;

    @GetMapping
    public List<SegmentDto> getSegments() {
        return segmentService.getSegmentDtoList();
    }

    @GetMapping("/{id}")
    public SegmentDto getSegment(@PathVariable Long id) {
        return segmentService.getSegmentDto(id);
    }
}
