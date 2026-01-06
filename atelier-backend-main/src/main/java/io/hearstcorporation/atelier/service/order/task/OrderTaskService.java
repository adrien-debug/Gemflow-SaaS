package io.hearstcorporation.atelier.service.order.task;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTasksSummaryDto;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStage;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface OrderTaskService {

    // Business logic methods

    void createOrderTask(Order order, List<Long> metalIds, List<ImageRequestDto> images);

    void createOrderTask(Order order, List<Long> metalIds, Integer stlCount,
                         List<ImageRequestDto> images, OrderTaskStatus status);

    void updateCadOrderTasks(Order order);

    void updateCadOrderTasks(Order order, List<Long> metalIds, List<ImageRequestDto> images);

    void updateOrderTaskImages(Long orderTaskId, List<ImageRequestDto> images);

    void updateOrderTask(Long orderTaskId, Casting casting, OrderTaskStatus status);

    void updateOrderTaskStatus(Long orderTaskId, OrderTaskStatus status);

    void updateOrderTaskWeight(Long orderTaskId, BigDecimal weight);

    void splitOrderTaskAndResetCasting(Long orderTaskId, Long metalId, Integer stlCount,
                                       List<ImageRequestDto> images, OrderTaskStatus status);

    void splitOrderTaskAndResetCasting(Long orderTaskId, Integer stlCount, List<ImageRequestDto> images, OrderTaskStatus status);

    void updateOrderTaskStatusAndResetCastingByCastingId(Long castingId, OrderTaskStatus status);

    boolean isLastOrderTaskInCasting(Long orderTaskId, Long cylinderId);

    // Get Dto methods

    SearchDto<OrderTaskDto> searchOrderTasks(SearchRequestDto<OrderTaskSearchCriteriaDto> searchQuery);

    OrderTaskDto getOrderTaskDto(Long orderTaskId);

    List<OrderTaskCastingDto> getOrderTaskCastingDtoListByCastingId(Long castingId);

    List<OrderTaskCastingDto> getOrderTaskCastingDtoListByIds(List<Long> orderTaskIds);

    Map<Long, OrderTaskCastingDto> getOrderTaskCastingDtoListMappedById(List<Long> orderTaskIds);

    OrderTasksSummaryDto getOrderTasksSummary(Long orderId);

    // Get Entity methods

    OrderTask getOrderTask(Long orderTaskId);

    OrderTask getFullOrderTask(Long orderTaskId);

    OrderTask getOrderTask(Long orderTaskId, List<OrderTaskStatus> statuses);

    Long getOrderId(Long orderTaskId);

    Set<OrderTaskStatus> getOrderTaskStatuses(Long orderId);

    Set<OrderTaskStage> getOrderTaskStages(Long orderId);

    Map<Long, List<Long>> getOrderIdsGroupedByCastingId(List<Long> castingIds);

    List<OrderTask> getOrderTasksByCastingId(Long castingId);

    List<OrderTask> getOrderTasksWithOrderByCastingId(Long castingId);
}
