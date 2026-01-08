package io.hearstcorporation.atelier.dto.model.order.labour;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderLabourSummaryDto {

    private List<TaskTypeSummaryDto> taskTypeSummaries = new ArrayList<>();
    private Long totalSpentSeconds = 0L;
    private BigDecimal totalCost = BigDecimal.ZERO;

    public void addTaskTypeSummary(TaskTypeSummaryDto taskTypeSummaryDto) {
        taskTypeSummaries.add(taskTypeSummaryDto);
        totalSpentSeconds = totalSpentSeconds + taskTypeSummaryDto.getTotalSpentSeconds();
        totalCost = totalCost.add(taskTypeSummaryDto.getTotalCost());
    }
}
