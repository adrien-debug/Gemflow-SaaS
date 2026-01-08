package io.hearstcorporation.atelier.dto.model.order.task;

import io.hearstcorporation.atelier.model.order.task.OrderTaskStage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderTasksSummaryDto {

    private OrderTaskStage minStage;
    private OrderTaskStage maxStage;
    private List<OrderTaskStageCountDto> summary = new ArrayList<>();

    public void addSummaryRow(OrderTaskStage stage, long count) {
        summary.add(new OrderTaskStageCountDto(stage, count));
    }

    @Getter
    @AllArgsConstructor
    public static class OrderTaskStageCountDto {
        private OrderTaskStage stage;
        private long count;
    }
}
