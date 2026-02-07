package io.hearstcorporation.atelier.service.order.task;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.model.order.task.OrderTask;

import java.util.List;
import java.util.Map;

public interface OrderTaskImageService {

    // Business logic methods

    void updateOrderTaskImages(List<ImageRequestDto> images, OrderTask orderTask);

    // Get Dto methods

    List<ImageDto> getImageDtoList(Long orderTaskId);

    Map<Long, List<ImageDto>> getImageDtoListGroupedByOrderTaskId(List<Long> orderTaskIds);
}
