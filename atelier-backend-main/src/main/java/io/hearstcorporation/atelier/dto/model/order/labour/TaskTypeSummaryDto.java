package io.hearstcorporation.atelier.dto.model.order.labour;

import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Getter
@Setter
public class TaskTypeSummaryDto {

    private static final BigDecimal SECONDS_IN_HOUR = BigDecimal.valueOf(3600);

    private LabourTaskType taskType;
    private Long totalSpentSeconds;
    private BigDecimal totalCost;

    public TaskTypeSummaryDto(OrderLabourTaskTypeSummary taskTypeSummary, BigDecimal hourlyRate) {
        Long summaryTotalSpentSeconds = taskTypeSummary.getTotalTimeSpent();

        setTaskType(taskTypeSummary.getTaskType());
        setTotalSpentSeconds(summaryTotalSpentSeconds);
        BigDecimal spentSeconds = BigDecimal.valueOf(summaryTotalSpentSeconds);
        setTotalCost(spentSeconds.multiply(hourlyRate).divide(SECONDS_IN_HOUR, 2, RoundingMode.HALF_UP));
    }
}
