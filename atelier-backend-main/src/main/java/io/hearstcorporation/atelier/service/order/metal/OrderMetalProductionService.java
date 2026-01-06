package io.hearstcorporation.atelier.service.order.metal;

import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionReturnRequestDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionUsageRequestDto;

import java.util.List;

public interface OrderMetalProductionService {

    // Business logic methods

    void createUsage(Long orderId, OrderMetalProductionUsageRequestDto request);

    void createReturn(Long orderId, OrderMetalProductionReturnRequestDto request);

    // Get Dto methods

    List<OrderMetalProductionSummaryDto> getOrderMetalProductionSummaryDtoList(Long orderId);
}
