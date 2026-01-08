package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderListDto;
import io.hearstcorporation.atelier.dto.model.order.OrderStockSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockMemoOutRequestDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockReturnRequestDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockSoldRequestDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockTotalDto;
import io.hearstcorporation.atelier.service.order.stock.OrderStockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.order.OrderController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderStockController {

    public static final String BASE_URL = "/api/v1/orders";

    private final OrderStockService orderStockService;

    @PostMapping("/stock/search")
    public SearchDto<OrderListDto> searchStockOrders(@RequestBody @Valid SearchRequestDto<OrderStockSearchCriteriaDto> orderStockSearchQueryDto) {
        return orderStockService.searchStockOrders(orderStockSearchQueryDto);
    }

    @PostMapping("/stock/total")
    public OrderStockTotalDto getOrderStockTotalDto(@RequestBody @Valid OrderStockSearchCriteriaDto orderStockSearchCriteriaDto) {
        return orderStockService.getOrderStockTotalDto(orderStockSearchCriteriaDto);
    }

    @PatchMapping("/{orderId}/stock/sold")
    public void soldOrderStock(@PathVariable Long orderId,
                               @RequestBody @Valid OrderStockSoldRequestDto orderStockSoldRequestDto) {
        orderStockService.soldOrderStock(orderId, orderStockSoldRequestDto);
    }

    @PatchMapping("/{orderId}/stock/memo-out")
    public void memoOutOrderStock(@PathVariable Long orderId,
                                  @RequestBody @Valid OrderStockMemoOutRequestDto orderStockMemoOutRequestDto) {
        orderStockService.memoOutOrderStock(orderId, orderStockMemoOutRequestDto);
    }

    @PatchMapping("/{orderId}/stock/return")
    public void memoOutOrderStock(@PathVariable Long orderId,
                                  @RequestBody @Valid OrderStockReturnRequestDto orderStockReturnRequestDto) {
        orderStockService.returnOrderStock(orderId, orderStockReturnRequestDto);
    }
}
