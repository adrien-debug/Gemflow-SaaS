package io.hearstcorporation.atelier.dto.mapper.order.metal;

import io.hearstcorporation.atelier.dto.mapper.setting.MetalMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.MetalPurityMapper;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalFullTotalDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalTotalDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalFullTotal;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalTotal;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import lombok.experimental.UtilityClass;

import java.math.RoundingMode;
import java.util.List;

@UtilityClass
public class OrderMetalTotalMapper {

    public static OrderMetalTotal toOrderMetalTotal(Order order, Metal metal, MetalPurity metalPurity) {
        OrderMetalTotal orderMetalTotal = new OrderMetalTotal();
        orderMetalTotal.setOrder(order);
        orderMetalTotal.setMetal(metal);
        orderMetalTotal.setMetalPurity(metalPurity);
        return orderMetalTotal;
    }

    public static OrderMetalTotalDto toOrderMetalTotalDto(OrderMetalTotal orderMetalTotal) {
        return OrderMetalTotalDto.builder()
                .id(orderMetalTotal.getId())
                .totalCost(orderMetalTotal.getTotalCost())
                .priceGram(orderMetalTotal.getPriceGram().setScale(2, RoundingMode.HALF_UP))
                .weightIn(orderMetalTotal.getWeightIn())
                .weightOut(orderMetalTotal.getWeightOut())
                .orderId(orderMetalTotal.getOrder().getId())
                .metal(MetalMapper.toMetalDto(orderMetalTotal.getMetal()))
                .metalPurity(MetalPurityMapper.toMetalPurityDto(orderMetalTotal.getMetalPurity()))
                .build();
    }

    public static List<OrderMetalTotalDto> toOrderMetalTotalDtoList(List<OrderMetalTotal> orderMetalTotals) {
        return orderMetalTotals.stream()
                .map(OrderMetalTotalMapper::toOrderMetalTotalDto)
                .toList();
    }

    public static OrderMetalFullTotalDto toOrderMetalFullTotalDto(OrderMetalFullTotal orderMetalFullTotal) {
        return OrderMetalFullTotalDto.builder()
                .orderId(orderMetalFullTotal.getOrderId())
                .totalCost(orderMetalFullTotal.getTotalCost())
                .totalWeightIn(orderMetalFullTotal.getTotalWeightIn())
                .totalWeightOut(orderMetalFullTotal.getTotalWeightOut())
                .build();
    }
}
