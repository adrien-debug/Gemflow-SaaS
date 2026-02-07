package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.mapper.SearchRequestMapper;
import io.hearstcorporation.atelier.dto.mapper.order.OrderMapper;
import io.hearstcorporation.atelier.dto.model.PriorityRequestDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneAssignRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadDetailsDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderDto;
import io.hearstcorporation.atelier.dto.model.order.OrderListDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProductionFinishRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.OrderStatusRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionReturnRequestDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionUsageRequestDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalTotalDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTasksSummaryDto;
import io.hearstcorporation.atelier.model.order.OrderSearchCriteria;
import io.hearstcorporation.atelier.service.order.OrderCompositeService;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.labour.OrderLabourService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalCastingService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalProductionService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalTotalService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.order.OrderController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderController {

    public static final String BASE_URL = "/api/v1/orders";

    private final OrderCompositeService orderCompositeService;
    private final OrderService orderService;
    private final OrderTaskService orderTaskService;
    private final OrderLabourService orderLabourService;
    private final OrderMetalCastingService orderMetalCastingService;
    private final OrderMetalTotalService orderMetalTotalService;
    private final OrderMetalProductionService orderMetalProductionService;

    @PostMapping
    public OrderDto createOrder(@RequestBody @Valid OrderRequestDto orderRequestDto) {
        Long orderId = orderCompositeService.createOrder(orderRequestDto);
        return orderService.getOrderDto(orderId);
    }

    @PutMapping("/{orderId}")
    public OrderDto updateOrder(@PathVariable Long orderId,
                                @RequestBody @Valid OrderRequestDto orderRequestDto) {
        orderCompositeService.updateOrder(orderId, orderRequestDto);
        return orderService.getOrderDto(orderId);
    }

    @PutMapping("/{orderId}/cad")
    public OrderCadDto updateOrderCad(@PathVariable Long orderId,
                                      @RequestBody @Valid OrderCadRequestDto orderCadRequestDto) {
        orderCompositeService.updateOrderCad(orderId, orderCadRequestDto);
        return orderService.getOrderCadDto(orderId);
    }

    @PutMapping("/{orderId}/cad/{fromOrderId}/copy")
    public OrderCadDto copyCadFromOrder(@PathVariable Long orderId, @PathVariable Long fromOrderId) {
        orderCompositeService.copyCadFromOrder(orderId, fromOrderId);
        return orderService.getOrderCadDto(orderId);
    }

    @PatchMapping("/{orderId}/status")
    public void updateOrderStatus(@PathVariable Long orderId,
                                  @RequestBody @Valid OrderStatusRequestDto orderStatusRequestDto) {
        orderService.updateOrderStatus(orderId, orderStatusRequestDto);
    }

    @PatchMapping("/{orderId}/priority")
    public void updateOrderPriority(@PathVariable Long orderId,
                                    @RequestBody @Valid PriorityRequestDto orderPriorityRequestDto) {
        orderService.updateOrderPriority(orderId, orderPriorityRequestDto);
    }

    @PatchMapping("/{orderId}/gemstones")
    public void assignGemstone(@PathVariable Long orderId,
                               @RequestBody @Valid GemstoneAssignRequestDto gemstoneAssignRequest) {
        orderCompositeService.assignGemstone(orderId, gemstoneAssignRequest);
    }

    @DeleteMapping("/{orderId}/gemstones/{gemstoneId}")
    public void unassignGemstone(@PathVariable Long orderId, @PathVariable Long gemstoneId) {
        orderCompositeService.unassignGemstone(orderId, gemstoneId);
    }

    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable Long orderId) {
        orderCompositeService.deleteOrder(orderId);
    }

    @PostMapping("/search")
    public SearchDto<OrderListDto> searchOrders(@RequestBody @Valid SearchRequestDto<OrderSearchCriteriaDto> orderSearchQueryDto) {
        OrderSearchCriteria orderSearchCriteria = OrderMapper.toOrderSearchCriteria(orderSearchQueryDto.getSearchCriteria());
        return orderService.searchOrders(SearchRequestMapper.mapSearchRequestDto(orderSearchQueryDto, orderSearchCriteria));
    }

    @GetMapping("/{orderId}")
    public OrderDto getOrder(@PathVariable Long orderId) {
        return orderService.getOrderDto(orderId);
    }

    @GetMapping("/{orderId}/cad")
    public OrderCadDto getOrderCad(@PathVariable Long orderId) {
        return orderService.getOrderCadDto(orderId);
    }

    @GetMapping("/{orderId}/cad/details")
    public OrderCadDetailsDto getOrderCadDetails(@PathVariable Long orderId) {
        return orderService.getOrderCadDetailsDto(orderId);
    }

    @GetMapping("/{orderId}/tasks/summary")
    public OrderTasksSummaryDto getOrderTasksSummary(@PathVariable Long orderId) {
        return orderTaskService.getOrderTasksSummary(orderId);
    }

    @GetMapping("/{orderId}/labours/summary")
    public OrderLabourSummaryDto getOrderLaboursSummary(@PathVariable Long orderId) {
        return orderLabourService.getOrderLaboursSummary(orderId);
    }

    @PostMapping("/{orderId}/finish")
    public OrderDto finishProduction(@PathVariable Long orderId,
                                     @RequestBody @Valid OrderProductionFinishRequestDto orderProductionFinishRequest) {
        orderCompositeService.finishProduction(orderId, orderProductionFinishRequest);
        return orderService.getOrderDto(orderId);
    }

    @GetMapping("/{orderId}/metal-castings")
    public List<OrderMetalCastingDto> getOrderMetalCastings(@PathVariable Long orderId) {
        return orderMetalCastingService.getOrderMetalCastingsByOrderId(orderId);
    }

    @GetMapping("/{orderId}/metal-totals")
    public List<OrderMetalTotalDto> getOrderMetalTotals(@PathVariable Long orderId) {
        return orderMetalTotalService.getOrderMetalTotalDtoList(orderId);
    }

    @GetMapping("/{orderId}/metal-productions/summaries")
    public List<OrderMetalProductionSummaryDto> getOrderMetalProductionSummaryDtoList(@PathVariable Long orderId) {
        return orderMetalProductionService.getOrderMetalProductionSummaryDtoList(orderId);
    }

    @PostMapping("/{orderId}/usage")
    public void createUsage(@PathVariable Long orderId,
                            @RequestBody @Valid OrderMetalProductionUsageRequestDto request) {
        orderMetalProductionService.createUsage(orderId, request);
    }

    @PostMapping("/{orderId}/return")
    public void createReturn(@PathVariable Long orderId,
                             @RequestBody @Valid OrderMetalProductionReturnRequestDto request) {
        orderMetalProductionService.createReturn(orderId, request);
    }
}
