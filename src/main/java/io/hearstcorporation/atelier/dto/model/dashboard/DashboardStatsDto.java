package io.hearstcorporation.atelier.dto.model.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {

    private long totalOrders;
    private long ordersInProgress;
    private long ordersFinished;
    private long ordersInvoiced;
    private long ordersOverdue;
    private double averageDelayDays;
    
    private List<StatusCountDto> ordersByStatus;
    private List<PriorityCountDto> ordersByPriority;
    private List<OrderAlertDto> alerts;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatusCountDto {
        private String status;
        private String statusLabel;
        private long count;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PriorityCountDto {
        private String priority;
        private long count;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderAlertDto {
        private Long orderId;
        private String orderName;
        private String alertType; // OVERDUE, AT_RISK, HIGH_PRIORITY_DELAYED
        private String message;
        private int daysOverdue;
    }
}
