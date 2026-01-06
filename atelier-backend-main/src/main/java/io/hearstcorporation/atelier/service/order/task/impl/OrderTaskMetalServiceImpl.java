package io.hearstcorporation.atelier.service.order.task.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.MetalMapper;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.model.order.task.OrderTaskMetal;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.repository.order.task.OrderTaskMetalRepository;
import io.hearstcorporation.atelier.service.order.task.OrderTaskMetalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderTaskMetalServiceImpl implements OrderTaskMetalService {

    private final OrderTaskMetalRepository orderTaskMetalRepository;

    @Override
    public List<MetalDto> getMetalDtoListByOrderTaskId(Long orderTaskId) {
        return getMetalsByOrderTaskId(orderTaskId).stream().map(MetalMapper::toMetalDto).collect(Collectors.toList());
    }

    @Override
    public Map<Long, List<MetalDto>> getMetalDtoListGroupedByOrderTaskId(List<Long> orderTaskIds) {
        List<OrderTaskMetal> orderTaskMetals = orderTaskMetalRepository.findAllByOrderTaskIdIn(orderTaskIds);
        Map<Long, List<OrderTaskMetal>> orderTaskMetalsGroupedByOrderTaskId = orderTaskMetals.stream()
                .collect(Collectors.groupingBy(orderTaskMetal -> orderTaskMetal.getOrderTask().getId()));
        return orderTaskMetalsGroupedByOrderTaskId.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue().stream()
                                .map(OrderTaskMetal::getMetal)
                                .map(MetalMapper::toMetalDto)
                                .toList()
                ));
    }

    @Override
    public List<Metal> getMetalsByOrderTaskId(Long orderTaskId) {
        return orderTaskMetalRepository.findAllByOrderTaskId(orderTaskId).stream()
                .map(OrderTaskMetal::getMetal)
                .collect(Collectors.toList());
    }

    @Override
    public Metal getSingleMetalByOrderTaskId(Long orderTaskId) {
        List<Metal> orderTaskMetals = getMetalsByOrderTaskId(orderTaskId);
        if (orderTaskMetals.isEmpty()) {
            throw new IllegalStateException(String.format("Order task %s has no metals", orderTaskId));
        }
        if (orderTaskMetals.size() > 1) {
            throw new IllegalStateException(String.format("Order task %s has more than 1 metal", orderTaskId));
        }
        return orderTaskMetals.getFirst();
    }
}
