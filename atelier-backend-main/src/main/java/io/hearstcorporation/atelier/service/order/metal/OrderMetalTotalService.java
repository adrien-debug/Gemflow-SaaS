package io.hearstcorporation.atelier.service.order.metal;

import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalFullTotalDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalTotalDto;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalTotal;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalTotalReduce;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface OrderMetalTotalService {

    // Business logic methods

    void addWeightAndCost(Long orderId, Long metalId, Long metalPurityId, BigDecimal weight, BigDecimal cost);

    OrderMetalTotalReduce reduceWeightAndCost(Long orderId, Long metalId, Long metalPurityId, BigDecimal weight);

    void updateWeightOut(Long orderMetalTotalId, BigDecimal weightOut);

    // Get Dto methods

    List<OrderMetalTotalDto> getOrderMetalTotalDtoList(Long orderId);

    OrderMetalFullTotalDto getOrderMetalFullTotalDto(Long orderId);

    // Get Entity methods

    OrderMetalTotal getOrderMetalTotal(Long orderMetalTotalId);

    OrderMetalTotal getOrderMetalTotal(Long orderId, Long metalId, Long metalPurityId);

    Optional<OrderMetalTotal> getOrderMetalTotalOpt(Long orderId, Long metalId, Long metalPurityId);
}
