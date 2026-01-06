package io.hearstcorporation.atelier.service.order.diamond.impl;

import io.hearstcorporation.atelier.dto.mapper.order.diamond.OrderDiamondMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondQualityIssueRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondQuantityUpdateDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondTotalDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamondStatus;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamondTotal;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.order.diamond.OrderDiamondRepository;
import io.hearstcorporation.atelier.repository.order.diamond.OrderDiamondTotalRepository;
import io.hearstcorporation.atelier.service.inventory.diamond.DiamondService;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.diamond.OrderDiamondService;
import io.hearstcorporation.atelier.service.user.UserService;
import io.hearstcorporation.atelier.specification.order.diamond.OrderDiamondSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderDiamondServiceImpl implements OrderDiamondService {

    private final OrderDiamondRepository orderDiamondRepository;
    private final OrderDiamondTotalRepository orderDiamondTotalRepository;
    private final DiamondService diamondService;
    private final OrderService orderService;
    private final UserService userService;
    private final PaginationResolver orderDiamondPaginationResolver;

    @Override
    @Transactional(readOnly = true)
    public OrderDiamondDto getOrderDiamondDto(Long orderDiamondId) {
        OrderDiamond orderDiamond = getFullOrderDiamond(orderDiamondId);
        UserWithImageDto userWithImageDto = userService.getUserWithImageDto(orderDiamond.getEmployee());
        return OrderDiamondMapper.toOrderDiamondDto(orderDiamond, userWithImageDto);
    }

    @Override
    @Transactional
    public Long createGoodQualityOrderDiamond(OrderDiamondRequestDto orderDiamondRequest) {
        return createOrderDiamond(orderDiamondRequest, OrderDiamondStatus.GOOD_QUALITY);
    }

    @Override
    @Transactional
    public Long createBrokenOrderDiamond(OrderDiamondRequestDto orderDiamondRequest) {
        return createOrderDiamond(orderDiamondRequest, OrderDiamondStatus.BROKEN);
    }

    @Override
    @Transactional
    public Long createQualityIssueOrderDiamond(OrderDiamondQualityIssueRequestDto orderDiamondRequest) {
        Diamond diamond = diamondService.getDiamond(orderDiamondRequest.getDiamondId());
        diamondService.reduceDiamondQuantity(diamond.getId(), orderDiamondRequest.getQuantity());

        Order order = orderService.getOrder(orderDiamondRequest.getOrderId());
        OrderDiamond orderDiamond = OrderDiamondMapper.toOrderDiamond(orderDiamondRequest, order, diamond);
        orderDiamond.setStatus(OrderDiamondStatus.QUALITY_ISSUE);
        orderDiamond = orderDiamondRepository.save(orderDiamond);
        return orderDiamond.getId();
    }

    @Override
    @Transactional
    public void updateGoodQualityOrderDiamond(Long orderDiamondId, OrderDiamondUpdateDto orderDiamondUpdate) {
        OrderDiamond orderDiamond = getOrderDiamond(orderDiamondId);
        if (orderDiamond.getStatus() == OrderDiamondStatus.GOOD_QUALITY) {
            updateOrderDiamond(orderDiamond, orderDiamondUpdate);
        } else {
            throw new IllegalStateException("Order diamond hasn't status GOOD_QUALITY");
        }
    }

    @Override
    @Transactional
    public void updateBrokenOrderDiamond(Long orderDiamondId, OrderDiamondUpdateDto orderDiamondUpdate) {
        OrderDiamond orderDiamond = getOrderDiamond(orderDiamondId);
        if (orderDiamond.getStatus() == OrderDiamondStatus.BROKEN) {
            updateOrderDiamond(orderDiamond, orderDiamondUpdate);
        } else {
            throw new IllegalStateException("Order diamond hasn't status BROKEN");
        }
    }

    @Override
    @Transactional
    public void updateQualityIssueOrderDiamond(Long orderDiamondId, OrderDiamondQuantityUpdateDto orderDiamondUpdate) {
        OrderDiamond orderDiamond = getOrderDiamond(orderDiamondId);
        if (orderDiamond.getStatus() == OrderDiamondStatus.QUALITY_ISSUE) {
            processDiamondQuantity(orderDiamond, orderDiamondUpdate.getQuantity());
            orderDiamond.setQuantity(orderDiamondUpdate.getQuantity());
            orderDiamondRepository.save(orderDiamond);
        } else {
            throw new IllegalStateException("Order diamond hasn't status QUALITY_ISSUE");
        }
    }

    @Override
    @Transactional
    public void deleteOrderDiamond(Long orderDiamondId) {
        OrderDiamond orderDiamond = getOrderDiamond(orderDiamondId);
        diamondService.addDiamondQuantity(orderDiamond.getDiamond().getId(), orderDiamond.getQuantity());
        ExceptionWrapper.onDelete(() -> orderDiamondRepository.deleteById(orderDiamond.getId()),
                "Order diamond %d cannot be deleted.".formatted(orderDiamond.getId()));
    }

    @Override
    @Transactional
    public void resetOrderDiamonds(Long orderId) {
        orderDiamondRepository.findOrderDiamondIdsByOrderId(orderId).forEach(this::deleteOrderDiamond);
    }

    @Override
    public OrderDiamond getOrderDiamond(Long orderDiamondId) {
        return retrieveOrderDiamond(orderDiamondId, orderDiamondRepository.findById(orderDiamondId));
    }

    @Override
    public OrderDiamond getFullOrderDiamond(Long orderDiamondId) {
        return retrieveOrderDiamond(orderDiamondId, orderDiamondRepository.findOrderDiamondById(orderDiamondId));
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<OrderDiamondDto> searchOrderDiamonds(SearchRequestDto<OrderDiamondSearchCriteriaDto> searchQuery) {
        Pageable pageable = orderDiamondPaginationResolver.createPageable(
                searchQuery.getPage(),
                searchQuery.getSize(),
                searchQuery.getSorts()
        );
        Specification<OrderDiamond> specification = OrderDiamondSpecification.create(searchQuery.getSearchCriteria());
        Page<OrderDiamond> result = orderDiamondRepository.findAll(specification, pageable);
        List<Long> userIds = result.getContent().stream().map(OrderDiamond::getEmployee).filter(Objects::nonNull).map(User::getId).toList();
        Map<Long, UserWithImageDto> userWithImageDtoListMappedById = userService.getUserWithImageDtoListMappedById(userIds);
        return OrderDiamondMapper.toOrderDiamondDtoPage(result, userWithImageDtoListMappedById);
    }

    @Override
    public OrderDiamondTotalDto getOrderDiamondTotalDto(OrderDiamondSearchCriteriaDto searchQueryDto) {
        OrderDiamondTotal orderDiamondTotal = orderDiamondTotalRepository.calculateTotal(OrderDiamondSpecification.create(searchQueryDto));
        return OrderDiamondMapper.toOrderDiamondTotalDto(orderDiamondTotal);
    }

    private Long createOrderDiamond(OrderDiamondRequestDto orderDiamondRequest, OrderDiamondStatus status) {
        Diamond diamond = diamondService.getDiamond(orderDiamondRequest.getDiamondId());
        diamondService.reduceDiamondQuantity(diamond.getId(), orderDiamondRequest.getQuantity());

        User employee = userService.getUser(orderDiamondRequest.getEmployeeId());
        Order order = orderService.getOrder(orderDiamondRequest.getOrderId());
        OrderDiamond orderDiamond = OrderDiamondMapper.toOrderDiamond(orderDiamondRequest, order, employee, diamond);
        orderDiamond.setStatus(status);
        orderDiamond = orderDiamondRepository.save(orderDiamond);
        return orderDiamond.getId();
    }

    private void updateOrderDiamond(OrderDiamond orderDiamond, OrderDiamondUpdateDto orderDiamondUpdate) {
        processDiamondQuantity(orderDiamond, orderDiamondUpdate.getQuantity());
        User employee = userService.getUser(orderDiamondUpdate.getEmployeeId());
        OrderDiamondMapper.mapOrderDiamond(orderDiamond, orderDiamondUpdate, employee);
        orderDiamondRepository.save(orderDiamond);
    }

    private void processDiamondQuantity(OrderDiamond orderDiamond, Integer newQuantity) {
        Integer currentQuantity = orderDiamond.getQuantity();
        Long diamondId = orderDiamond.getDiamond().getId();
        if (currentQuantity > newQuantity) {
            diamondService.addDiamondQuantity(diamondId, currentQuantity - newQuantity);
        } else if (currentQuantity < newQuantity) {
            diamondService.reduceDiamondQuantity(diamondId, newQuantity - currentQuantity);
        }
    }

    private OrderDiamond retrieveOrderDiamond(Long orderDiamondId, Optional<OrderDiamond> orderDiamondOpt) {
        return orderDiamondOpt.orElseThrow(
                () -> new NotFoundException("Order diamond with id %d was not found.".formatted(orderDiamondId))
        );
    }
}
