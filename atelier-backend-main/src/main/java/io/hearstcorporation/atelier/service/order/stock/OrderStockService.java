package io.hearstcorporation.atelier.service.order.stock;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.dto.model.order.OrderListDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProductionFinishRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProfitDto;
import io.hearstcorporation.atelier.dto.model.order.OrderStockSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondTotalDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalFullTotalDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockMemoOutRequestDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockReturnRequestDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockSoldRequestDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockTotalDto;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.model.order.stock.OrderStockStatus;

import java.util.List;

public interface OrderStockService {

    // Business logic methods

    OrderStock createOrderStock(OrderProductionFinishRequestDto orderProductionFinishRequest,
                                OrderLabourSummaryDto orderLabourSummary, InventoryTotalDto orderGemstonesTotal,
                                OrderDiamondTotalDto orderDiamondsTotal, OrderMetalFullTotalDto orderMetalFullTotal,
                                OrderProfitDto orderProfit);

    void soldOrderStock(Long orderId, OrderStockSoldRequestDto orderStockSoldRequestDto);

    void memoOutOrderStock(Long orderId, OrderStockMemoOutRequestDto orderStockMemoOutRequestDto);

    void returnOrderStock(Long orderId, OrderStockReturnRequestDto orderStockReturnRequestDto);

    // Get Dto methods

    SearchDto<OrderListDto> searchStockOrders(SearchRequestDto<OrderStockSearchCriteriaDto> orderStockSearchQueryDto);

    OrderStockTotalDto getOrderStockTotalDto(OrderStockSearchCriteriaDto orderStockSearchQueryDto);

    // Get Entity methods

    OrderStock getOrderStock(Long orderId, List<OrderStockStatus> statuses);
}
