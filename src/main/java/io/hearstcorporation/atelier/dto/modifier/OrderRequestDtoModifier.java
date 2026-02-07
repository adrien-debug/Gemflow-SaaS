package io.hearstcorporation.atelier.dto.modifier;

import io.hearstcorporation.atelier.dto.model.order.OrderRequestDto;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStage;
import lombok.experimental.UtilityClass;

import java.util.Set;

@UtilityClass
public class OrderRequestDtoModifier {

    @SuppressWarnings("all")
    public static void modifyByOrderTaskStages(OrderRequestDto orderRequestDto, Set<OrderTaskStage> orderTaskStages) {
        if (OrderTaskStage.isNotOnlyStage(OrderTaskStage.CAD, orderTaskStages)) {
            orderRequestDto.setMaterials(null);
        }
    }
}
