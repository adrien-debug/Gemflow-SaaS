package io.hearstcorporation.atelier.service.order;

import io.hearstcorporation.atelier.dto.model.PriorityRequestDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadDetailsDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderDto;
import io.hearstcorporation.atelier.dto.model.order.OrderListDto;
import io.hearstcorporation.atelier.dto.model.order.OrderRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderStatusRequestDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderSearchCriteria;
import io.hearstcorporation.atelier.model.order.OrderStatus;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    // Business logic methods

    Order createOrder(OrderRequestDto orderRequestDto);

    void updateOrder(Long orderId, OrderRequestDto orderRequestDto);

    void updateOrderCad(Long orderId, OrderCadRequestDto orderCadRequestDto);

    void copyCadFromOrder(Long orderId, Long fromOrderId);

    void orderCadExistsOrThrow(Long orderId);

    void updateOrderStatus(Long orderId, OrderStatusRequestDto orderStatusRequestDto);

    void updateOrderStatus(Long orderId, OrderStatus orderStatus);

    void updateOrderPriority(Long orderId, PriorityRequestDto priorityRequestDto);

    void updateAcceptanceDate(Long orderId, LocalDate acceptanceDate);

    void updateOrderClient(Long orderId, Long clientId);

    void orderStockNotExistsOrThrow(Long orderId);

    void finishProduction(Long orderId, OrderStock orderStock);

    void deleteOrder(Long orderId);

    // Get Dto methods

    SearchDto<OrderListDto> searchOrders(SearchRequestDto<OrderSearchCriteria> orderSearchQueryDto);

    OrderDto getOrderDto(Long orderId);

    OrderCadDto getOrderCadDto(Long orderId);

    OrderCadDetailsDto getOrderCadDetailsDto(Long orderId);

    // Get Entity methods

    Order getOrder(Long orderId);

    Order getFullOrder(Long orderId);

    List<Long> getOrderMetalIds(Long orderId);
}
