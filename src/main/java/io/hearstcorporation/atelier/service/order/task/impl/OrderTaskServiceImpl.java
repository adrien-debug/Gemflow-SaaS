package io.hearstcorporation.atelier.service.order.task.impl;

import io.hearstcorporation.atelier.dto.mapper.order.task.OrderTaskMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTasksSummaryDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.casting.CastingStatus;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStage;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatusCount;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.order.task.OrderTaskRepository;
import io.hearstcorporation.atelier.service.order.task.OrderTaskImageService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskMetalService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskService;
import io.hearstcorporation.atelier.service.setting.MetalService;
import io.hearstcorporation.atelier.specification.order.task.OrderTaskSpecification;
import io.hearstcorporation.atelier.util.ServiceHelper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderTaskServiceImpl implements OrderTaskService {

    private final OrderTaskRepository orderTaskRepository;
    private final OrderTaskImageService orderTaskImageService;
    private final MetalService metalService;
    private final OrderTaskMetalService orderTaskMetalService;
    private final PaginationResolver orderTaskPaginationResolver;

    @Override
    @Transactional
    public void createOrderTask(Order order, List<Long> metalIds, List<ImageRequestDto> images) {
        createOrderTask(order, metalIds, order.getStlCount(), images, OrderTaskStatus.READY_FOR_CAD);
    }

    @Override
    @Transactional
    public void createOrderTask(Order order, List<Long> metalIds, Integer stlCount,
                                List<ImageRequestDto> images, OrderTaskStatus status) {
        List<Metal> metals = metalService.getMetals(metalIds);
        OrderTask orderTask = OrderTaskMapper.toOrderTask(order, metals, stlCount, status);
        orderTask = orderTaskRepository.save(orderTask);
        orderTaskImageService.updateOrderTaskImages(images, orderTask);
    }

    @Override
    @Transactional
    public void updateCadOrderTasks(Order order) {
        List<OrderTask> orderTasks = getCadOrderTasks(order.getId());
        orderTasks.forEach(orderTask -> updateOrderTaskStlCount(orderTask, order.getStlCount()));
    }

    @Override
    @Transactional
    public void updateCadOrderTasks(Order order, List<Long> metalIds, List<ImageRequestDto> images) {
        List<Metal> metals = metalService.getMetals(metalIds);
        List<OrderTask> orderTasks = getCadOrderTasks(order.getId());
        orderTasks.forEach(orderTask -> {
            orderTask = updateOrderTask(orderTask, metals, order.getStlCount());
            orderTaskImageService.updateOrderTaskImages(images, orderTask);
        });
    }

    @Override
    @Transactional
    public void updateOrderTaskImages(Long orderTaskId, List<ImageRequestDto> images) {
        OrderTask orderTask = getOrderTask(orderTaskId);
        orderTaskImageService.updateOrderTaskImages(images, orderTask);
    }

    @Override
    @Transactional
    public void updateOrderTask(Long orderTaskId, Casting casting, OrderTaskStatus status) {
        OrderTask orderTask = getOrderTask(orderTaskId, status.getPreviousStatuses());
        orderTask.setCasting(casting);
        updateOrderTaskStatus(orderTask, status);
    }

    @Override
    @Transactional
    public void updateOrderTaskStatus(Long orderTaskId, OrderTaskStatus status) {
        OrderTask orderTask = getOrderTask(orderTaskId, status.getPreviousStatuses());
        updateOrderTaskStatus(orderTask, status);
    }

    @Override
    @Transactional
    public void updateOrderTaskWeight(Long orderTaskId, BigDecimal weight) {
        OrderTask orderTask = getOrderTask(orderTaskId, OrderTaskStatus.WEIGHT_CHANGE_STATUS);
        Casting casting = orderTask.getCasting();
        if (casting == null) {
            throw new InvalidDataException("Order task with id %d not related to any casting.".formatted(orderTask.getId()));
        }
        if (casting.getStatus() != CastingStatus.OPEN) {
            throw new InvalidDataException("Casting already completed for order task with id %d.".formatted(orderTask.getId()));
        }
        orderTask.setWeight(weight);
        orderTask.setStatus(OrderTaskStatus.COMPLETED);
        orderTaskRepository.save(orderTask);
    }

    public void updateOrderTaskStatusAndResetCasting(OrderTask orderTask, OrderTaskStatus status) {
        orderTask.setCasting(null);
        orderTask.setWeight(null);
        updateOrderTaskStatus(orderTask, status);
    }

    private void updateOrderTaskAndResetCasting(OrderTask orderTask, OrderTaskStatus status,
                                                List<ImageRequestDto> images) {
        orderTaskImageService.updateOrderTaskImages(images, orderTask);
        updateOrderTaskStatusAndResetCasting(orderTask, status);
    }

    private void updateOrderTaskStatus(OrderTask orderTask, OrderTaskStatus status) {
        orderTask.setStatus(status);
        orderTaskRepository.save(orderTask);
    }

    private void updateOrderTaskStlCount(OrderTask orderTask, Integer stlCount) {
        orderTask.setStlCount(stlCount);
        orderTaskRepository.save(orderTask);
    }

    private OrderTask updateOrderTask(OrderTask orderTask, List<Metal> metals, Integer stlCount) {
        OrderTaskMapper.mapOrderTask(orderTask, metals, stlCount);
        return orderTaskRepository.save(orderTask);
    }

    @Override
    @Transactional
    public void splitOrderTaskAndResetCasting(Long orderTaskId, Long metalId, Integer stlCount,
                                              List<ImageRequestDto> images, OrderTaskStatus status) {
        OrderTask orderTask = getOrderTask(orderTaskId, status.getPreviousStatuses());
        Optional<Metal> selectedMetal = orderTask.getMetals().stream()
                .filter(metal -> metal.getId().equals(metalId))
                .findFirst();
        if (selectedMetal.isEmpty()) {
            throw new InvalidDataException("Metal %d is not exists in order task %d.".formatted(metalId, orderTaskId));
        }
        if (orderTask.getMetals().size() == 1) {
            updateOrderTaskAndResetCasting(orderTask, status, images);
            return;
        }
        Integer orderTaskStlCount = ObjectUtils.defaultIfNull(orderTask.getStlCount(), 0);
        int newStlCount = subtractStlCount(orderTaskStlCount, stlCount);
        if (newStlCount == 0) {
            orderTask.setMetals(selectedMetal.stream().collect(Collectors.toList()));
            updateOrderTaskAndResetCasting(orderTask, status, images);
            return;
        }
        List<Metal> leftMetals = orderTask.getMetals().stream()
                .filter(metal -> metal != selectedMetal.get())
                .collect(Collectors.toList());
        updateOrderTask(orderTask, leftMetals, newStlCount);
        createOrderTask(orderTask.getOrder(), List.of(metalId), stlCount, images, status);
    }

    @Override
    @Transactional
    public void splitOrderTaskAndResetCasting(Long orderTaskId, Integer stlCount, List<ImageRequestDto> images, OrderTaskStatus status) {
        OrderTask orderTask = getOrderTask(orderTaskId, status.getPreviousStatuses());
        Integer orderTaskStlCount = ObjectUtils.defaultIfNull(orderTask.getStlCount(), 0);
        int newStlCount = subtractStlCount(orderTaskStlCount, stlCount);
        if (newStlCount == 0) {
            updateOrderTaskAndResetCasting(orderTask, status, images);
            return;
        }
        updateOrderTaskStlCount(orderTask, newStlCount);
        List<Long> metalIds = orderTask.getMetals().stream().map(Metal::getId).toList();
        createOrderTask(orderTask.getOrder(), metalIds, stlCount, images, status);
    }

    private int subtractStlCount(Integer initialStlCount, Integer subtractStlCount) {
        int newStlCount = initialStlCount - subtractStlCount;
        if (newStlCount < 0) {
            throw new InvalidDataException("Stl count must be less than or equal to initial stl count (%d)."
                    .formatted(initialStlCount));
        }
        return newStlCount;
    }

    @Override
    @Transactional
    public void updateOrderTaskStatusAndResetCastingByCastingId(Long castingId, OrderTaskStatus status) {
        List<OrderTask> orderTasks = orderTaskRepository.findOrderTasksByCastingId(castingId);
        orderTasks.forEach(orderTask -> {
            if (!status.getPreviousStatuses().contains(orderTask.getStatus())) {
                throw new InvalidDataException("Cannot update status of order task with id %d from %s to %s."
                        .formatted(orderTask.getId(), orderTask.getStatus(), status));
            }
            updateOrderTaskStatusAndResetCasting(orderTask, status);
        });
        orderTaskRepository.flush();
    }

    @Override
    public boolean isLastOrderTaskInCasting(Long orderTaskId, Long castingId) {
        return !orderTaskRepository.existsByIdNotAndCastingId(orderTaskId, castingId);
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<OrderTaskDto> searchOrderTasks(SearchRequestDto<OrderTaskSearchCriteriaDto> searchQuery) {
        Pageable pageable = orderTaskPaginationResolver.createPageable(
                searchQuery.getPage(),
                searchQuery.getSize(),
                searchQuery.getSorts()
        );
        Specification<OrderTask> specification = OrderTaskSpecification.create(searchQuery.getSearchCriteria());
        Page<OrderTask> result = orderTaskRepository.findAll(specification, pageable);
        List<Long> orderTaskIds = result.getContent().stream().map(OrderTask::getId).toList();
        Map<Long, List<ImageDto>> orderTaskImagesGroupedByOrderTaskId =
                orderTaskImageService.getImageDtoListGroupedByOrderTaskId(orderTaskIds);
        Map<Long, List<MetalDto>> orderTaskMetalsGroupedByOrderTaskId =
                orderTaskMetalService.getMetalDtoListGroupedByOrderTaskId(orderTaskIds);
        return OrderTaskMapper.toOrderTaskDtoPage(result, orderTaskImagesGroupedByOrderTaskId,
                orderTaskMetalsGroupedByOrderTaskId);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderTaskDto getOrderTaskDto(Long orderTaskId) {
        OrderTask orderTask = getFullOrderTask(orderTaskId);
        List<ImageDto> orderTaskImages = orderTaskImageService.getImageDtoList(orderTaskId);
        List<MetalDto> orderTaskMetals = orderTaskMetalService.getMetalDtoListByOrderTaskId(orderTaskId);
        return OrderTaskMapper.toOrderTaskDto(orderTask, orderTaskImages, orderTaskMetals);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderTaskCastingDto> getOrderTaskCastingDtoListByCastingId(Long castingId) {
        List<OrderTask> orderTasks = getOrderTasksWithOrderByCastingId(castingId);
        List<Long> orderTaskIds = orderTasks.stream().map(OrderTask::getId).toList();
        Map<Long, List<ImageDto>> orderTaskImagesGroupedByOrderTaskId =
                orderTaskImageService.getImageDtoListGroupedByOrderTaskId(orderTaskIds);
        return OrderTaskMapper.toOrderTaskCastingDtoList(orderTasks, orderTaskImagesGroupedByOrderTaskId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderTaskCastingDto> getOrderTaskCastingDtoListByIds(List<Long> orderTaskIds) {
        if (CollectionUtils.isEmpty(orderTaskIds)) {
            return List.of();
        }
        List<OrderTask> orderTasks = orderTaskRepository.findAllByIdIn(orderTaskIds);
        ServiceHelper.compareIdsOrThrow(orderTasks, orderTaskIds, OrderTask.class);
        Map<Long, List<ImageDto>> orderTaskImagesGroupedByOrderTaskId =
                orderTaskImageService.getImageDtoListGroupedByOrderTaskId(orderTaskIds);
        return OrderTaskMapper.toOrderTaskCastingDtoList(orderTasks, orderTaskImagesGroupedByOrderTaskId);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, OrderTaskCastingDto> getOrderTaskCastingDtoListMappedById(List<Long> orderTaskIds) {
        return getOrderTaskCastingDtoListByIds(orderTaskIds).stream()
                .collect(Collectors.toMap(OrderTaskCastingDto::getId, Function.identity()));
    }

    @Override
    public OrderTasksSummaryDto getOrderTasksSummary(Long orderId) {
        List<OrderTaskStatusCount> orderTaskStatusCounts = orderTaskRepository.getOrderTaskStatusCountSummary(orderId);
        Map<OrderTaskStage, Long> summaryMap = orderTaskStatusCounts.stream().collect(Collectors.groupingBy(
                orderTaskStatusCount -> orderTaskStatusCount.getStatus().getStage(),
                Collectors.summingLong(OrderTaskStatusCount::getCount)
        ));
        OrderTaskStage minStage = summaryMap.keySet().stream()
                .min(Comparator.comparing(OrderTaskStage::getOrder))
                .orElse(null);
        OrderTaskStage maxStage = summaryMap.keySet().stream()
                .max(Comparator.comparing(OrderTaskStage::getOrder))
                .orElse(null);
        return OrderTaskMapper.toOrderTaskSummaryDto(minStage, maxStage, summaryMap);
    }

    @Override
    public OrderTask getOrderTask(Long orderTaskId) {
        return orderTaskRepository.findById(orderTaskId).orElseThrow(
                () -> new NotFoundException("Order task with id %d was not found".formatted(orderTaskId))
        );
    }

    @Override
    public OrderTask getFullOrderTask(Long orderTaskId) {
        return orderTaskRepository.findOrderTaskById(orderTaskId).orElseThrow(
                () -> new NotFoundException("Order task with id %d was not found".formatted(orderTaskId))
        );
    }

    @Override
    public OrderTask getOrderTask(Long orderTaskId, List<OrderTaskStatus> statuses) {
        return orderTaskRepository.findByIdAndStatusIn(orderTaskId, statuses).orElseThrow(
                () -> new NotFoundException("Order task with id %d and in statuses %s was not found".formatted(orderTaskId, statuses))
        );
    }

    private List<OrderTask> getCadOrderTasks(Long orderId) {
        List<OrderTaskStatus> cadStatuses = OrderTaskStatus.getByStage(OrderTaskStage.CAD);
        return orderTaskRepository.findAllByOrderIdAndStatusIn(orderId, cadStatuses);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getOrderId(Long orderTaskId) {
        return OrderTaskMapper.toOrderId(getOrderTask(orderTaskId));
    }

    @Override
    public Set<OrderTaskStatus> getOrderTaskStatuses(Long orderId) {
        return orderTaskRepository.findOrderTaskStatusesByOrderId(orderId);
    }

    @Override
    public Set<OrderTaskStage> getOrderTaskStages(Long orderId) {
        return getOrderTaskStatuses(orderId).stream()
                .map(OrderTaskStatus::getStage)
                .collect(Collectors.toSet());
    }

    @Override
    public Map<Long, List<Long>> getOrderIdsGroupedByCastingId(List<Long> castingIds) {
        List<OrderTask> orderTasks = orderTaskRepository.findAllByCastingIdIn(castingIds);
        Map<Long, List<OrderTask>> orderTasksGroupedByCastingId = orderTasks.stream()
                .collect(Collectors.groupingBy(orderTask -> orderTask.getCasting().getId()));
        return orderTasksGroupedByCastingId.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue().stream()
                                .map(OrderTask::getOrder)
                                .map(Order::getId)
                                .distinct()
                                .toList()
                ));
    }

    @Override
    public List<OrderTask> getOrderTasksByCastingId(Long castingId) {
        return orderTaskRepository.findOrderTasksByCastingId(castingId);
    }

    @Override
    public List<OrderTask> getOrderTasksWithOrderByCastingId(Long castingId) {
        return orderTaskRepository.findAllByCastingId(castingId);
    }
}
