package io.hearstcorporation.atelier.service.order;

import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneAssignRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProductionFinishRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderRequestDto;

public interface OrderCompositeService {

    Long createOrder(OrderRequestDto orderRequestDto);

    void updateOrder(Long orderId, OrderRequestDto orderRequestDto);

    void deleteOrder(Long orderId);

    void updateOrderCad(Long orderId, OrderCadRequestDto orderCadRequestDto);

    void copyCadFromOrder(Long orderId, Long fromOrderId);

    void assignGemstone(Long orderId, GemstoneAssignRequestDto gemstoneAssignRequest);

    void unassignGemstone(Long orderId, Long gemstoneId);

    void finishProduction(Long orderId, OrderProductionFinishRequestDto orderProductionFinishRequest);
}
