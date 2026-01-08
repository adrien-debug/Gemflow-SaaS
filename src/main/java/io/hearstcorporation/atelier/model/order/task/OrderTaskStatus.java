package io.hearstcorporation.atelier.model.order.task;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Getter
@RequiredArgsConstructor
public enum OrderTaskStatus {
    READY_FOR_CAD("Ready For CAD", OrderTaskStage.CAD),
    IN_CAD("CAD in Progress", OrderTaskStage.CAD),
    CAD_REVIEW("CAD Review", OrderTaskStage.CAD),

    READY_FOR_PROTOTYPING("To prototype", OrderTaskStage.PRINTING_3D),
    IN_PROTOTYPING("In prototyping", OrderTaskStage.PRINTING_3D),

    READY_FOR_CASTING("Ready for Casting", OrderTaskStage.CASTING),
    IN_CASTING("In Cylinder", OrderTaskStage.CASTING),

    COMPLETED("Completed", OrderTaskStage.COMPLETED);

    private final String description;
    private final OrderTaskStage stage;

    public static final List<OrderTaskStatus> WEIGHT_CHANGE_STATUS = List.of(IN_CASTING, COMPLETED);

    public static List<OrderTaskStatus> getByStage(OrderTaskStage stage) {
        return Arrays.stream(values())
                .filter(orderTaskStatus -> orderTaskStatus.getStage() == stage)
                .toList();
    }

    public List<OrderTaskStatus> getPreviousStatuses() {
        return switch (this) {
            case READY_FOR_CAD -> List.of(IN_CAD, CAD_REVIEW);
            case IN_CAD -> List.of(READY_FOR_CAD);
            case CAD_REVIEW -> List.of(IN_CAD);

            case READY_FOR_PROTOTYPING -> List.of(CAD_REVIEW, IN_PROTOTYPING, READY_FOR_CASTING, IN_CASTING);
            case IN_PROTOTYPING -> List.of(READY_FOR_PROTOTYPING);

            case READY_FOR_CASTING -> List.of(IN_PROTOTYPING, IN_CASTING, COMPLETED);
            case IN_CASTING -> List.of(READY_FOR_CASTING);

            case COMPLETED -> List.of(IN_CASTING);
        };
    }
}
