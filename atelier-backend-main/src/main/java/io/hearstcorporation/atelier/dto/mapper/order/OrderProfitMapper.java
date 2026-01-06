package io.hearstcorporation.atelier.dto.mapper.order;

import io.hearstcorporation.atelier.dto.model.order.OrderProfitDto;
import io.hearstcorporation.atelier.model.order.OrderProfit;
import lombok.experimental.UtilityClass;

@UtilityClass
public class OrderProfitMapper {

    public static OrderProfitDto toOrderProfitDto(OrderProfit entity) {
        if (entity == null) {
            return null;
        }
        return OrderProfitDto.builder()
                .id(entity.getId())
                .diamondProfitPercentage(entity.getDiamondProfitPercentage())
                .gemstoneProfitPercentage(entity.getGemstoneProfitPercentage())
                .labourProfitPercentage(entity.getLabourProfitPercentage())
                .metalProfitPercentage(entity.getMetalProfitPercentage())
                .orderId(entity.getOrder().getId())
                .build();
    }
}
