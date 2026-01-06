package io.hearstcorporation.atelier.model.order.task;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@Getter
@RequiredArgsConstructor
public enum OrderTaskStage {
    CAD("CAD", 1),
    PRINTING_3D("3D Printing", 2),
    CASTING("Casting", 3),
    COMPLETED("Complete", 4);

    private final String description;
    private final int order;

    public static boolean isNotOnlyStage(OrderTaskStage stage, Set<OrderTaskStage> stages) {
        return stages.size() > 1 || !stages.contains(stage);
    }
}
