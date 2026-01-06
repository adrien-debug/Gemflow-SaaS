package io.hearstcorporation.atelier.service.order.stock.impl;

import io.hearstcorporation.atelier.dto.mapper.SearchRequestMapper;
import io.hearstcorporation.atelier.dto.mapper.order.stock.OrderStockMapper;
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
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.order.OrderSearchCriteria;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.model.order.stock.OrderStockStatus;
import io.hearstcorporation.atelier.model.order.stock.OrderStockTotal;
import io.hearstcorporation.atelier.model.setting.Location;
import io.hearstcorporation.atelier.repository.order.OrderStockTotalRepository;
import io.hearstcorporation.atelier.repository.order.stock.OrderStockRepository;
import io.hearstcorporation.atelier.service.administration.ClientService;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.stock.OrderStockService;
import io.hearstcorporation.atelier.service.setting.LocationService;
import io.hearstcorporation.atelier.specification.order.OrderSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderStockServiceImpl implements OrderStockService {

    private final OrderStockRepository orderStockRepository;
    private final OrderStockTotalRepository orderStockTotalRepository;
    private final OrderService orderService;
    private final LocationService locationService;
    private final ClientService clientService;

    @Override
    @Transactional
    public OrderStock createOrderStock(OrderProductionFinishRequestDto orderProductionFinishRequest,
                                       OrderLabourSummaryDto orderLabourSummary, InventoryTotalDto orderGemstonesTotal,
                                       OrderDiamondTotalDto orderDiamondsTotal, OrderMetalFullTotalDto orderMetalFullTotal,
                                       OrderProfitDto orderProfit) {
        Location location = locationService.getLocation(orderProductionFinishRequest.getLocationId());
        OrderStock orderStock = OrderStockMapper.toOrderStock(location, orderLabourSummary, orderGemstonesTotal,
                orderDiamondsTotal, orderMetalFullTotal, orderProfit);
        return orderStockRepository.save(orderStock);
    }

    @Override
    @Transactional
    public void soldOrderStock(Long orderId, OrderStockSoldRequestDto orderStockSoldRequestDto) {
        OrderStockStatus soldStatus = OrderStockStatus.SOLD;
        orderService.updateOrderClient(orderId, orderStockSoldRequestDto.getClientId());
        OrderStock orderStock = getOrderStock(orderId, soldStatus.getPreviousStatuses());
        orderStock.setSaleDate(orderStockSoldRequestDto.getSaleDate());
        updateOrderStockStatus(orderStock, soldStatus);
    }

    @Override
    @Transactional
    public void memoOutOrderStock(Long orderId, OrderStockMemoOutRequestDto orderStockMemoOutRequestDto) {
        OrderStockStatus memoOutStatus = OrderStockStatus.MEMO_OUT;
        Client issueClient = clientService.getClient(orderStockMemoOutRequestDto.getIssueClientId());
        OrderStock orderStock = getOrderStock(orderId, memoOutStatus.getPreviousStatuses());
        orderStock.setIssueDate(orderStockMemoOutRequestDto.getIssueDate());
        orderStock.setIssueClient(issueClient);
        orderStock.setReturnDate(null);
        updateOrderStockStatus(orderStock, memoOutStatus);
    }

    @Override
    @Transactional
    public void returnOrderStock(Long orderId, OrderStockReturnRequestDto orderStockReturnRequestDto) {
        OrderStockStatus availableStatus = OrderStockStatus.AVAILABLE;
        OrderStock orderStock = getOrderStock(orderId, availableStatus.getPreviousStatuses());
        orderStock.setReturnDate(orderStockReturnRequestDto.getReturnDate());
        updateOrderStockStatus(orderStock, availableStatus);
    }

    private void updateOrderStockStatus(OrderStock orderStock, OrderStockStatus orderStockStatus) {
        orderStock.setStatus(orderStockStatus);
        orderStockRepository.save(orderStock);
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<OrderListDto> searchStockOrders(SearchRequestDto<OrderStockSearchCriteriaDto> orderStockSearchQueryDto) {
        OrderSearchCriteria orderSearchCriteria = OrderStockMapper.toOrderSearchCriteria(orderStockSearchQueryDto.getSearchCriteria());
        return orderService.searchOrders(SearchRequestMapper.mapSearchRequestDto(orderStockSearchQueryDto, orderSearchCriteria));
    }

    @Override
    public OrderStockTotalDto getOrderStockTotalDto(OrderStockSearchCriteriaDto orderStockSearchQueryDto) {
        OrderSearchCriteria orderSearchCriteria = OrderStockMapper.toOrderSearchCriteria(orderStockSearchQueryDto);
        OrderStockTotal orderStockTotal = orderStockTotalRepository.calculateTotal(OrderSpecification.create(orderSearchCriteria));
        return OrderStockMapper.toOrderStockTotalDto(orderStockTotal);
    }

    @Override
    public OrderStock getOrderStock(Long orderId, List<OrderStockStatus> statuses) {
        return orderStockRepository.findByOrderIdAndStatusIn(orderId, statuses).orElseThrow(
                () -> new NotFoundException("Order Stock in statuses %s for order with id %d and was not found"
                        .formatted(statuses, orderId))
        );
    }
}
