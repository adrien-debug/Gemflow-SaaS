package io.hearstcorporation.atelier.service.dashboard.impl;

import io.hearstcorporation.atelier.dto.model.dashboard.DashboardStatsDto;
import io.hearstcorporation.atelier.dto.model.dashboard.DashboardStatsDto.OrderAlertDto;
import io.hearstcorporation.atelier.dto.model.dashboard.DashboardStatsDto.PriorityCountDto;
import io.hearstcorporation.atelier.dto.model.dashboard.DashboardStatsDto.StatusCountDto;
import io.hearstcorporation.atelier.model.Priority;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderStatus;
import io.hearstcorporation.atelier.repository.order.OrderRepository;
import io.hearstcorporation.atelier.service.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final OrderRepository orderRepository;

    private static final Set<OrderStatus> FINISHED_STATUSES = EnumSet.of(
            OrderStatus.FINISHED,
            OrderStatus.INVOICED,
            OrderStatus.RECYCLED
    );

    private static final Set<OrderStatus> IN_PROGRESS_STATUSES = EnumSet.complementOf(
            EnumSet.of(OrderStatus.FINISHED, OrderStatus.INVOICED, OrderStatus.RECYCLED, OrderStatus.REJECTED)
    );

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
        log.debug("Fetching dashboard statistics");
        
        List<Order> allOrders = orderRepository.findAll();
        LocalDate today = LocalDate.now();

        long totalOrders = allOrders.size();
        long ordersInProgress = countByStatuses(allOrders, IN_PROGRESS_STATUSES);
        long ordersFinished = countByStatus(allOrders, OrderStatus.FINISHED);
        long ordersInvoiced = countByStatus(allOrders, OrderStatus.INVOICED);

        // Calculate overdue orders (due date passed and not finished/invoiced)
        List<Order> overdueOrders = allOrders.stream()
                .filter(o -> o.getDueDate() != null)
                .filter(o -> o.getDueDate().isBefore(today))
                .filter(o -> IN_PROGRESS_STATUSES.contains(o.getStatus()))
                .toList();

        long ordersOverdue = overdueOrders.size();

        // Calculate average delay
        double averageDelayDays = overdueOrders.stream()
                .mapToLong(o -> ChronoUnit.DAYS.between(o.getDueDate(), today))
                .average()
                .orElse(0.0);

        // Orders by status
        List<StatusCountDto> ordersByStatus = calculateOrdersByStatus(allOrders);

        // Orders by priority
        List<PriorityCountDto> ordersByPriority = calculateOrdersByPriority(allOrders);

        // Generate alerts
        List<OrderAlertDto> alerts = generateAlerts(allOrders, today);

        return DashboardStatsDto.builder()
                .totalOrders(totalOrders)
                .ordersInProgress(ordersInProgress)
                .ordersFinished(ordersFinished)
                .ordersInvoiced(ordersInvoiced)
                .ordersOverdue(ordersOverdue)
                .averageDelayDays(Math.round(averageDelayDays * 10.0) / 10.0)
                .ordersByStatus(ordersByStatus)
                .ordersByPriority(ordersByPriority)
                .alerts(alerts)
                .build();
    }

    private long countByStatus(List<Order> orders, OrderStatus status) {
        return orders.stream()
                .filter(o -> o.getStatus() == status)
                .count();
    }

    private long countByStatuses(List<Order> orders, Set<OrderStatus> statuses) {
        return orders.stream()
                .filter(o -> statuses.contains(o.getStatus()))
                .count();
    }

    private List<StatusCountDto> calculateOrdersByStatus(List<Order> orders) {
        Map<OrderStatus, Long> countByStatus = orders.stream()
                .collect(Collectors.groupingBy(Order::getStatus, Collectors.counting()));

        return Arrays.stream(OrderStatus.values())
                .filter(status -> countByStatus.getOrDefault(status, 0L) > 0)
                .map(status -> StatusCountDto.builder()
                        .status(status.name())
                        .statusLabel(status.getDescription())
                        .count(countByStatus.get(status))
                        .build())
                .toList();
    }

    private List<PriorityCountDto> calculateOrdersByPriority(List<Order> orders) {
        Map<Priority, Long> countByPriority = orders.stream()
                .filter(o -> IN_PROGRESS_STATUSES.contains(o.getStatus()))
                .collect(Collectors.groupingBy(Order::getPriority, Collectors.counting()));

        return Arrays.stream(Priority.values())
                .map(priority -> PriorityCountDto.builder()
                        .priority(priority.name())
                        .count(countByPriority.getOrDefault(priority, 0L))
                        .build())
                .toList();
    }

    private List<OrderAlertDto> generateAlerts(List<Order> orders, LocalDate today) {
        List<OrderAlertDto> alerts = new ArrayList<>();

        for (Order order : orders) {
            if (!IN_PROGRESS_STATUSES.contains(order.getStatus())) {
                continue;
            }

            if (order.getDueDate() == null) {
                continue;
            }

            long daysUntilDue = ChronoUnit.DAYS.between(today, order.getDueDate());

            // Overdue orders
            if (daysUntilDue < 0) {
                int daysOverdue = (int) Math.abs(daysUntilDue);
                alerts.add(OrderAlertDto.builder()
                        .orderId(order.getId())
                        .orderName(order.getName())
                        .alertType("OVERDUE")
                        .message(String.format("En retard de %d jour(s)", daysOverdue))
                        .daysOverdue(daysOverdue)
                        .build());
            }
            // At risk (due within 3 days)
            else if (daysUntilDue <= 3 && daysUntilDue >= 0) {
                alerts.add(OrderAlertDto.builder()
                        .orderId(order.getId())
                        .orderName(order.getName())
                        .alertType("AT_RISK")
                        .message(daysUntilDue == 0 
                                ? "Due date aujourd'hui!" 
                                : String.format("Due date dans %d jour(s)", (int) daysUntilDue))
                        .daysOverdue(0)
                        .build());
            }
            // High priority with approaching deadline (within 7 days)
            else if (order.getPriority() == Priority.HIGH && daysUntilDue <= 7) {
                alerts.add(OrderAlertDto.builder()
                        .orderId(order.getId())
                        .orderName(order.getName())
                        .alertType("HIGH_PRIORITY")
                        .message(String.format("Priorité haute - Due dans %d jour(s)", (int) daysUntilDue))
                        .daysOverdue(0)
                        .build());
            }
        }

        // Sort by severity: OVERDUE first, then AT_RISK, then HIGH_PRIORITY
        alerts.sort((a, b) -> {
            int priorityA = getAlertPriority(a.getAlertType());
            int priorityB = getAlertPriority(b.getAlertType());
            if (priorityA != priorityB) {
                return priorityA - priorityB;
            }
            return b.getDaysOverdue() - a.getDaysOverdue();
        });

        // Limit to top 10 alerts
        return alerts.stream().limit(10).toList();
    }

    private int getAlertPriority(String alertType) {
        return switch (alertType) {
            case "OVERDUE" -> 0;
            case "AT_RISK" -> 1;
            case "HIGH_PRIORITY" -> 2;
            default -> 3;
        };
    }
}
