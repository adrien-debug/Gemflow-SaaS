package io.hearstcorporation.atelier.dto.mapper.order.labour;

import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourTrackerDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourTrackerStartDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTracker;
import io.hearstcorporation.atelier.model.user.User;
import lombok.experimental.UtilityClass;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@UtilityClass
public class OrderLabourTrackerMapper {

    public static OrderLabourTracker toOrderLabourTracker(OrderLabourTrackerStartDto startDto, Order order,
                                                          User employee) {
        OrderLabourTracker orderLabourTracker = new OrderLabourTracker();
        orderLabourTracker.setTaskType(startDto.getTaskType());
        orderLabourTracker.setStartDate(Instant.now());
        orderLabourTracker.setOrder(order);
        orderLabourTracker.setEmployee(employee);
        return orderLabourTracker;
    }

    public static OrderLabourTrackerDto toOrderLabourTrackerDto(OrderLabourTracker startedTracker,
                                                                OrderLabourTaskTypeSummary taskTypeSummary) {
        long trackerSpentSeconds = ChronoUnit.SECONDS.between(startedTracker.getStartDate(), Instant.now());
        long taskTypeSummarySeconds = taskTypeSummary != null ? taskTypeSummary.getTotalTimeSpent() : 0L;
        return OrderLabourTrackerDto.builder()
                .taskType(startedTracker.getTaskType())
                .orderId(startedTracker.getOrder().getId())
                .totalSeconds(trackerSpentSeconds + taskTypeSummarySeconds)
                .build();
    }

    public static OrderLabourTrackerDto toOrderLabourTrackerDto(Long orderId, OrderLabourTaskTypeSummary taskTypeSummary) {
        return OrderLabourTrackerDto.builder()
                .taskType(taskTypeSummary.getTaskType())
                .orderId(orderId)
                .totalSeconds(taskTypeSummary.getTotalTimeSpent())
                .build();
    }
}
