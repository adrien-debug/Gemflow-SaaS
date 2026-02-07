package io.hearstcorporation.atelier.service.order.impl;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneAssignRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProductionFinishRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProfitDto;
import io.hearstcorporation.atelier.dto.model.order.OrderRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondTotalDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalFullTotalDto;
import io.hearstcorporation.atelier.dto.modifier.OrderCadRequestDtoModifier;
import io.hearstcorporation.atelier.dto.modifier.OrderRequestDtoModifier;
import io.hearstcorporation.atelier.exception.CannotDeleteException;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStage;
import io.hearstcorporation.atelier.service.casting.CastingService;
import io.hearstcorporation.atelier.service.inventory.gemstone.GemstoneService;
import io.hearstcorporation.atelier.service.order.OrderCompositeService;
import io.hearstcorporation.atelier.service.order.OrderProfitService;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.diamond.OrderDiamondService;
import io.hearstcorporation.atelier.service.order.labour.OrderLabourService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalTotalService;
import io.hearstcorporation.atelier.service.order.stock.OrderStockService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskService;
import io.hearstcorporation.atelier.util.PatchHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderCompositeServiceImpl implements OrderCompositeService {

    private final OrderService orderService;
    private final OrderTaskService orderTaskService;
    private final GemstoneService gemstoneService;
    private final OrderDiamondService orderDiamondService;
    private final OrderLabourService orderLabourService;
    private final OrderStockService orderStockService;
    private final OrderProfitService orderProfitService;
    private final OrderMetalTotalService orderMetalTotalService;
    private final CastingService castingService;

    @Override
    @Transactional
    public Long createOrder(OrderRequestDto orderRequestDto) {
        Order order = orderService.createOrder(orderRequestDto);
        gemstoneService.updateOrderGemstones(order, PatchHelper.getOrEmptyList(orderRequestDto.getGemstoneIds()));
        List<Long> metalIds = orderService.getOrderMetalIds(order.getId());
        List<ImageRequestDto> productImages = PatchHelper.getOrEmptyList(orderRequestDto.getProductImages());
        orderTaskService.createOrderTask(order, metalIds, productImages);
        return order.getId();
    }

    @Override
    @Transactional
    public void updateOrder(Long orderId, OrderRequestDto orderRequestDto) {
        OrderRequestDtoModifier.modifyByOrderTaskStages(orderRequestDto, orderTaskService.getOrderTaskStages(orderId));
        orderService.updateOrder(orderId, orderRequestDto);
        Order order = orderService.getOrder(orderId);
        gemstoneService.updateOrderGemstones(order, PatchHelper.getOrEmptyList(orderRequestDto.getGemstoneIds()));
        List<Long> metalIds = orderService.getOrderMetalIds(order.getId());
        List<ImageRequestDto> productImages = PatchHelper.getOrEmptyList(orderRequestDto.getProductImages());
        orderTaskService.updateCadOrderTasks(order, metalIds, productImages);
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) {
        if (orderLabourService.isOrderLabourExists(orderId)) {
            throw new CannotDeleteException(ErrorCode.CANNOT_DELETE_ORDER_WITH_LABOUR_ERROR,
                    "Cannot delete order with id %d. Labour exists.".formatted(orderId));
        }
        gemstoneService.resetOrderGemstones(orderId);
        orderDiamondService.resetOrderDiamonds(orderId);
        orderService.deleteOrder(orderId);
    }

    @Override
    @Transactional
    public void updateOrderCad(Long orderId, OrderCadRequestDto orderCadRequestDto) {
        OrderCadRequestDtoModifier.modifyByOrderTaskStages(orderCadRequestDto, orderTaskService.getOrderTaskStages(orderId));
        orderService.updateOrderCad(orderId, orderCadRequestDto);
        Order order = orderService.getOrder(orderId);
        orderTaskService.updateCadOrderTasks(order);
    }

    @Override
    @Transactional
    public void copyCadFromOrder(Long orderId, Long fromOrderId) {
        if (OrderTaskStage.isNotOnlyStage(OrderTaskStage.CAD, orderTaskService.getOrderTaskStages(orderId))) {
            throw new IllegalStateException("Cannot copy CAD details because CAD stage is completed.");
        }
        orderService.copyCadFromOrder(orderId, fromOrderId);
        Order order = orderService.getOrder(orderId);
        orderTaskService.updateCadOrderTasks(order);
    }

    @Override
    @Transactional
    public void assignGemstone(Long orderId, GemstoneAssignRequestDto gemstoneAssignRequest) {
        Order order = orderService.getOrder(orderId);
        gemstoneService.assignGemstone(order, gemstoneAssignRequest.getGemstoneId());
    }

    @Override
    @Transactional
    public void unassignGemstone(Long orderId, Long gemstoneId) {
        gemstoneService.unassignGemstone(orderId, gemstoneId);
    }

    @Override
    @Transactional
    public void finishProduction(Long orderId, OrderProductionFinishRequestDto orderProductionFinishRequest) {
        //todo: add validation that if order is completed then cannot edit anything in it
        orderService.orderStockNotExistsOrThrow(orderId);

        if (OrderTaskStage.isNotOnlyStage(OrderTaskStage.COMPLETED, orderTaskService.getOrderTaskStages(orderId))) {
            throw new IllegalStateException(ErrorCode.CANNOT_MOVE_ORDER_TO_STOCK_TASKS_NOT_COMPLETED,
                    "Order with id %d has not completed tasks.".formatted(orderId));
        }

        if (castingService.openCastingExistsForOrder(orderId)) {
            throw new IllegalStateException(ErrorCode.CANNOT_MOVE_ORDER_TO_STOCK_CASTING_NOT_COMPLETED,
                    "Order with id %d has not completed casting.".formatted(orderId));
        }

        OrderProfitDto orderProfit = orderProfitService.getOrderProfitDtoByOrder(orderId);

        // Labour total
        OrderLabourSummaryDto orderLabourSummary = orderLabourService.getOrderLaboursSummary(orderId);

        // Gemstones total
        GemstoneSearchCriteriaDto gemstoneSearchCriteriaDto = new GemstoneSearchCriteriaDto();
        gemstoneSearchCriteriaDto.setOrderIds(List.of(orderId));
        InventoryTotalDto orderGemstonesTotal = gemstoneService.getGemstoneTotalDto(gemstoneSearchCriteriaDto);

        // Diamonds total
        OrderDiamondSearchCriteriaDto orderDiamondSearchCriteriaDto = new OrderDiamondSearchCriteriaDto();
        orderDiamondSearchCriteriaDto.setOrderIds(List.of(orderId));
        OrderDiamondTotalDto orderDiamondsTotal = orderDiamondService.getOrderDiamondTotalDto(orderDiamondSearchCriteriaDto);

        // Metals total
        OrderMetalFullTotalDto orderMetalFullTotal = orderMetalTotalService.getOrderMetalFullTotalDto(orderId);

        OrderStock orderStock = orderStockService.createOrderStock(orderProductionFinishRequest, orderLabourSummary,
                orderGemstonesTotal, orderDiamondsTotal, orderMetalFullTotal, orderProfit);
        orderService.finishProduction(orderId, orderStock);
    }
}
