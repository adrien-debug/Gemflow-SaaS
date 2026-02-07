package io.hearstcorporation.atelier.service.order.metal;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingSearchCriteriaDto;
import io.hearstcorporation.atelier.model.casting.Casting;

import java.math.BigDecimal;
import java.util.List;

public interface OrderMetalCastingService {

    // Business logic methods

    void createOrderMetalCastings(BigDecimal priceGram, Casting casting);

    // Get Dto methods

    SearchDto<OrderMetalCastingDto> searchOrderMetalCastings(SearchRequestDto<OrderMetalCastingSearchCriteriaDto> orderMetalCastingSearchQueryDto);

    List<OrderMetalCastingDto> getOrderMetalCastingsByOrderId(Long orderId);
}
