package io.hearstcorporation.atelier.dto.mapper.order.task;

import io.hearstcorporation.atelier.dto.mapper.casting.CastingMapper;
import io.hearstcorporation.atelier.dto.mapper.order.OrderMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTasksSummaryDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStage;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;
import io.hearstcorporation.atelier.model.setting.Metal;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

@UtilityClass
public class OrderTaskMapper {

    public static OrderTask toOrderTask(Order order, List<Metal> metals, Integer stlCount, OrderTaskStatus status) {
        OrderTask orderTask = status == null ? new OrderTask() : new OrderTask(status);
        mapOrderTask(orderTask, metals, stlCount);
        orderTask.setOrder(order);
        return orderTask;
    }

    public static void mapOrderTask(OrderTask orderTask, List<Metal> metals, Integer stlCount) {
        orderTask.setMetals(metals);
        orderTask.setStlCount(stlCount);
    }

    public static OrderTaskDto toOrderTaskDto(OrderTask orderTask, List<ImageDto> orderTaskImages, List<MetalDto> metals) {
        if (orderTask == null) {
            return null;
        }
        return OrderTaskDto.builder()
                .id(orderTask.getId())
                .createdAt(orderTask.getCreatedAt())
                .stlCount(orderTask.getStlCount())
                .weight(orderTask.getWeight())
                .status(orderTask.getStatus())
                .castingId(CastingMapper.toCastingId(orderTask.getCasting()))
                .order(OrderMapper.toModelNameDto(orderTask.getOrder()))
                .cylinder(CastingMapper.toCylinderModelNameDto(orderTask.getCasting()))
                .metals(metals)
                .orderTaskImages(orderTaskImages)
                .build();
    }

    public static SearchDto<OrderTaskDto> toOrderTaskDtoPage(Page<OrderTask> orderTaskPage,
                                                             Map<Long, List<ImageDto>> orderTaskImagesGroupedByOrderTaskId,
                                                             Map<Long, List<MetalDto>> orderTaskMetalsGroupedByOrderTaskId) {
        return new SearchDto<>(
                orderTaskPage.getContent().stream()
                        .map(orderTask -> OrderTaskMapper.toOrderTaskDto(orderTask,
                                orderTaskImagesGroupedByOrderTaskId.get(orderTask.getId()),
                                orderTaskMetalsGroupedByOrderTaskId.get(orderTask.getId()))
                        ).toList(),
                orderTaskPage.getNumber(),
                orderTaskPage.getSize(),
                orderTaskPage.getTotalPages(),
                orderTaskPage.getTotalElements()
        );
    }

    public static OrderTasksSummaryDto toOrderTaskSummaryDto(OrderTaskStage minStage, OrderTaskStage maxStage,
                                                             Map<OrderTaskStage, Long> summaryMap) {
        OrderTasksSummaryDto orderTasksSummaryDto = new OrderTasksSummaryDto();
        orderTasksSummaryDto.setMinStage(minStage);
        orderTasksSummaryDto.setMaxStage(maxStage);
        summaryMap.forEach(orderTasksSummaryDto::addSummaryRow);
        return orderTasksSummaryDto;
    }

    public static OrderTaskCastingDto toOrderTaskCastingDto(OrderTask orderTask, List<ImageDto> orderTaskImages) {
        if (orderTask == null) {
            return null;
        }
        return OrderTaskCastingDto.builder()
                .id(orderTask.getId())
                .createdAt(orderTask.getCreatedAt())
                .weight(orderTask.getWeight())
                .stlCount(orderTask.getStlCount())
                .status(orderTask.getStatus())
                .castingId(CastingMapper.toCastingId(orderTask.getCasting()))
                .order(OrderMapper.toModelNameDto(orderTask.getOrder()))
                .orderTaskImages(orderTaskImages)
                .build();
    }

    public static List<OrderTaskCastingDto> toOrderTaskCastingDtoList(List<OrderTask> orderTasks,
                                                                      Map<Long, List<ImageDto>> orderTaskImagesGroupedByOrderTaskId) {
        return orderTasks.stream()
                .map(orderTask -> OrderTaskMapper.toOrderTaskCastingDto(orderTask,
                        orderTaskImagesGroupedByOrderTaskId.get(orderTask.getId())))
                .toList();
    }

    public static Long toOrderId(OrderTask orderTask) {
        if (orderTask == null) {
            return null;
        }
        return OrderMapper.toOrderId(orderTask.getOrder());
    }
}
