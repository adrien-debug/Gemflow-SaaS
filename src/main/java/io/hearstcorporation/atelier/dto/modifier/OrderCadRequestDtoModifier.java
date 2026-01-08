package io.hearstcorporation.atelier.dto.modifier;

import io.hearstcorporation.atelier.dto.model.order.OrderCadRequestDto;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStage;
import lombok.experimental.UtilityClass;

import java.util.Set;

@UtilityClass
public class OrderCadRequestDtoModifier {

    @SuppressWarnings("all")
    public static void modifyByOrderTaskStages(OrderCadRequestDto orderCadRequestDto, Set<OrderTaskStage> orderTaskStages) {
        if (OrderTaskStage.isNotOnlyStage(OrderTaskStage.CAD, orderTaskStages)) {
            orderCadRequestDto.setCadImages(null);
            orderCadRequestDto.setCastingPartsImages(null);
            orderCadRequestDto.setDiamondMapImages(null);
            orderCadRequestDto.setStlCount(null);
        }
    }
}
