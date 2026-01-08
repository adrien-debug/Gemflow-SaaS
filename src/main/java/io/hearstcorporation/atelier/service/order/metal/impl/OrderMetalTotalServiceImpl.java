package io.hearstcorporation.atelier.service.order.metal.impl;

import io.hearstcorporation.atelier.dto.mapper.order.metal.OrderMetalTotalMapper;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalFullTotalDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalTotalDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalFullTotal;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalTotal;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalTotalReduce;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.repository.order.metal.OrderMetalTotalRepository;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalTotalService;
import io.hearstcorporation.atelier.service.setting.MetalPurityService;
import io.hearstcorporation.atelier.service.setting.MetalService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderMetalTotalServiceImpl implements OrderMetalTotalService {

    private final OrderMetalTotalRepository orderMetalTotalRepository;
    private final OrderService orderService;
    private final MetalService metalService;
    private final MetalPurityService metalPurityService;

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void addWeightAndCost(Long orderId, Long metalId, Long metalPurityId, BigDecimal weight, BigDecimal cost) {
        OrderMetalTotal orderMetalTotal = getOrderMetalTotalOpt(orderId, metalId, metalPurityId)
                .orElseGet(() -> {
                    Order order = orderService.getOrder(orderId);
                    Metal metal = metalService.getMetal(metalId);
                    MetalPurity metalPurity = metalPurityService.getMetalPurity(metalPurityId);
                    return OrderMetalTotalMapper.toOrderMetalTotal(order, metal, metalPurity);
                });
        orderMetalTotal.setTotalCost(orderMetalTotal.getTotalCost().add(cost));
        orderMetalTotal.setWeightIn(orderMetalTotal.getWeightIn().add(weight));
        orderMetalTotalRepository.save(orderMetalTotal);
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public OrderMetalTotalReduce reduceWeightAndCost(Long orderId, Long metalId, Long metalPurityId, BigDecimal weight) {
        OrderMetalTotal orderMetalTotal = getOrderMetalTotal(orderId, metalId, metalPurityId);
        BigDecimal weightIn = orderMetalTotal.getWeightIn();
        BigDecimal newWeightIn = weightIn.subtract(weight);
        validateNewWeightIn(orderId, metalId, metalPurityId, weight, weightIn, newWeightIn);
        BigDecimal priceGram = orderMetalTotal.getPriceGram();
        BigDecimal cost = priceGram.multiply(weight);
        orderMetalTotal.setTotalCost(orderMetalTotal.getTotalCost().subtract(cost));
        orderMetalTotal.setWeightIn(newWeightIn);
        orderMetalTotalRepository.save(orderMetalTotal);
        return new OrderMetalTotalReduce(priceGram, cost);
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void updateWeightOut(Long orderMetalTotalId, BigDecimal weightOut) {
        OrderMetalTotal orderMetalTotal = getOrderMetalTotal(orderMetalTotalId);
        orderMetalTotal.setWeightOut(weightOut);
        orderMetalTotalRepository.save(orderMetalTotal);
    }

    private void validateNewWeightIn(Long orderId, Long metalId, Long metalPurityId, BigDecimal weight,
                                     BigDecimal weightIn, BigDecimal newWeightIn) {
        if (newWeightIn.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidDataException(ErrorCode.ORDER_METAL_NOT_ENOUGH, String.format("Not enough weight of metal " +
                            "with id %d and metal purity with id %d in order with id %d. Expected weight %s, actual weight %s.",
                    metalId, metalPurityId, orderId, weight, weightIn));
        }
    }

    @Override
    public List<OrderMetalTotalDto> getOrderMetalTotalDtoList(Long orderId) {
        return OrderMetalTotalMapper.toOrderMetalTotalDtoList(orderMetalTotalRepository.findAllByOrderId(orderId));
    }

    @Override
    public OrderMetalFullTotalDto getOrderMetalFullTotalDto(Long orderId) {
        OrderMetalFullTotal orderMetalFullTotal = orderMetalTotalRepository.getOrderMetalFullTotal(orderId);
        return OrderMetalTotalMapper.toOrderMetalFullTotalDto(orderMetalFullTotal);
    }

    @Override
    public OrderMetalTotal getOrderMetalTotal(Long orderMetalTotalId) {
        return orderMetalTotalRepository.findById(orderMetalTotalId)
                .orElseThrow(() -> new NotFoundException("Order metal total with id %d was not found"));
    }

    @Override
    public OrderMetalTotal getOrderMetalTotal(Long orderId, Long metalId, Long metalPurityId) {
        return getOrderMetalTotalOpt(orderId, metalId, metalPurityId)
                .orElseThrow(() -> new NotFoundException(String.format("Order metal total by metal with id %d and " +
                        "metal purity with id %d for order with id %d was not found", metalId, metalPurityId, orderId)));
    }

    @Override
    public Optional<OrderMetalTotal> getOrderMetalTotalOpt(Long orderId, Long metalId, Long metalPurityId) {
        return orderMetalTotalRepository.findByOrderIdAndMetalIdAndMetalPurityId(orderId, metalId, metalPurityId);
    }
}
