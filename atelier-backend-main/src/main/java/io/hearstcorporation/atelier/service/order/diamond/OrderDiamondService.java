package io.hearstcorporation.atelier.service.order.diamond;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondQualityIssueRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondQuantityUpdateDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondTotalDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondUpdateDto;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond;

public interface OrderDiamondService {

    // Business logic methods

    Long createGoodQualityOrderDiamond(OrderDiamondRequestDto orderDiamondRequest);

    Long createBrokenOrderDiamond(OrderDiamondRequestDto orderDiamondRequest);

    Long createQualityIssueOrderDiamond(OrderDiamondQualityIssueRequestDto orderDiamondRequest);

    void updateGoodQualityOrderDiamond(Long orderDiamondId, OrderDiamondUpdateDto orderDiamondUpdate);

    void updateBrokenOrderDiamond(Long orderDiamondId, OrderDiamondUpdateDto orderDiamondUpdate);

    void updateQualityIssueOrderDiamond(Long orderDiamondId, OrderDiamondQuantityUpdateDto orderDiamondUpdate);

    void deleteOrderDiamond(Long orderDiamondId);

    void resetOrderDiamonds(Long orderId);

    // Get Dto methods

    OrderDiamondDto getOrderDiamondDto(Long orderDiamondId);

    SearchDto<OrderDiamondDto> searchOrderDiamonds(SearchRequestDto<OrderDiamondSearchCriteriaDto> searchQuery);

    OrderDiamondTotalDto getOrderDiamondTotalDto(OrderDiamondSearchCriteriaDto searchQueryDto);

    // Get Entity methods

    OrderDiamond getOrderDiamond(Long orderDiamondId);

    OrderDiamond getFullOrderDiamond(Long orderDiamondId);
}
