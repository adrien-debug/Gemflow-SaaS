package io.hearstcorporation.atelier.service.order;

import io.hearstcorporation.atelier.dto.model.order.OrderProfitDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProfitPatchDto;
import io.hearstcorporation.atelier.model.order.OrderProfit;

public interface OrderProfitService {

    // Business logic methods

    void patchDiamondProfit(Long orderId, OrderProfitPatchDto updateDto);

    void patchGemstoneProfit(Long orderId, OrderProfitPatchDto updateDto);

    void patchLabourProfit(Long orderId, OrderProfitPatchDto updateDto);

    void patchMetalProfit(Long orderId, OrderProfitPatchDto updateDto);

    // Get Dto methods

    OrderProfitDto getOrderProfitDtoByOrder(Long orderId);

    // Get Entity methods

    OrderProfit getOrderProfitByOrder(Long orderId);
}
