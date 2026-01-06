package io.hearstcorporation.atelier.service.order.impl;

import io.hearstcorporation.atelier.dto.mapper.order.OrderProfitMapper;
import io.hearstcorporation.atelier.dto.model.order.OrderProfitDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProfitPatchDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderProfit;
import io.hearstcorporation.atelier.repository.order.OrderProfitRepository;
import io.hearstcorporation.atelier.service.order.OrderProfitService;
import io.hearstcorporation.atelier.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderProfitServiceImpl implements OrderProfitService {

    private final OrderProfitRepository orderProfitRepository;
    private final OrderService orderService;

    @Override
    @Transactional
    public void patchDiamondProfit(Long orderId, OrderProfitPatchDto patchDto) {
        OrderProfit orderProfit = getOrderProfitByOrder(orderId);
        orderProfit.setDiamondProfitPercentage(patchDto.getProfitPercentage());
        orderProfitRepository.save(orderProfit);
    }

    @Override
    @Transactional
    public void patchGemstoneProfit(Long orderId, OrderProfitPatchDto patchDto) {
        OrderProfit orderProfit = getOrderProfitByOrder(orderId);
        orderProfit.setGemstoneProfitPercentage(patchDto.getProfitPercentage());
        orderProfitRepository.save(orderProfit);
    }

    @Override
    @Transactional
    public void patchLabourProfit(Long orderId, OrderProfitPatchDto patchDto) {
        OrderProfit orderProfit = getOrderProfitByOrder(orderId);
        orderProfit.setLabourProfitPercentage(patchDto.getProfitPercentage());
        orderProfitRepository.save(orderProfit);
    }

    @Override
    @Transactional
    public void patchMetalProfit(Long orderId, OrderProfitPatchDto patchDto) {
        OrderProfit orderProfit = getOrderProfitByOrder(orderId);
        orderProfit.setMetalProfitPercentage(patchDto.getProfitPercentage());
        orderProfitRepository.save(orderProfit);
    }

    @Override
    @Transactional
    public OrderProfitDto getOrderProfitDtoByOrder(Long orderId) {
        OrderProfit orderProfit = getOrderProfitByOrder(orderId);
        return OrderProfitMapper.toOrderProfitDto(orderProfit);
    }

    @Override
    @Transactional
    public OrderProfit getOrderProfitByOrder(Long orderId) {
        return orderProfitRepository.findByOrderId(orderId).orElseGet(() -> {
            OrderProfit orderProfit = new OrderProfit();
            Order order = orderService.getOrder(orderId);
            orderProfit.setOrder(order);
            return orderProfitRepository.save(orderProfit);
        });
    }
}
