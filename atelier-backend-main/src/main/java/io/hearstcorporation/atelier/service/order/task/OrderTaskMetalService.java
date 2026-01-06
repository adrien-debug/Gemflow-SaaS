package io.hearstcorporation.atelier.service.order.task;

import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.model.setting.Metal;

import java.util.List;
import java.util.Map;

public interface OrderTaskMetalService {

    // Get Dto methods

    List<MetalDto> getMetalDtoListByOrderTaskId(Long orderTaskId);

    Map<Long, List<MetalDto>> getMetalDtoListGroupedByOrderTaskId(List<Long> orderTaskIds);

    // Get Entity methods

    List<Metal> getMetalsByOrderTaskId(Long orderTaskId);

    Metal getSingleMetalByOrderTaskId(Long orderTaskId);
}
