package io.hearstcorporation.atelier.service.order.metal.impl;

import io.hearstcorporation.atelier.dto.mapper.order.metal.OrderMetalProductionMapper;
import io.hearstcorporation.atelier.dto.model.order.metal.MetalAndPurityKey;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionReturnRequestDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionUsageRequestDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalProduction;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalTotalReduce;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.repository.order.metal.OrderMetalProductionRepository;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyService;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalPurchaseService;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalService;
import io.hearstcorporation.atelier.service.inventory.other.OtherMaterialService;
import io.hearstcorporation.atelier.service.inventory.other.OtherMaterialTransactionService;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalProductionService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalTotalService;
import io.hearstcorporation.atelier.service.setting.MetalPurityService;
import io.hearstcorporation.atelier.service.setting.MetalService;
import io.hearstcorporation.atelier.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderMetalProductionServiceImpl implements OrderMetalProductionService {

    private final OrderMetalProductionRepository orderMetalProductionRepository;
    private final OrderService orderService;
    private final AlloyedMetalService alloyedMetalService;
    private final OtherMaterialService otherMaterialService;
    private final AlloyService alloyService;
    private final MetalService metalService;
    private final MetalPurityService metalPurityService;
    private final AlloyedMetalPurchaseService alloyedMetalPurchaseService;
    private final OtherMaterialTransactionService otherMaterialTransactionService;
    private final OrderMetalTotalService orderMetalTotalService;
    private final UserService userService;

    @Override
    @Transactional
    public void createUsage(Long orderId, OrderMetalProductionUsageRequestDto request) {
        Order order = orderService.getOrder(orderId);
        AlloyedMetal alloyedMetal = alloyedMetalService.getAlloyedMetal(request.getAlloyedMetalId());
        User employee = userService.getUser(request.getEmployeeId());
        BigDecimal cost = alloyedMetalPurchaseService.reduceWeightByAlloyedMetalId(alloyedMetal.getId(), request.getWeight());
        OrderMetalProduction orderMetalProduction = OrderMetalProductionMapper.toUsageOrderMetalProduction(request, cost,
                order, alloyedMetal, employee);
        orderMetalProductionRepository.save(orderMetalProduction);
        orderMetalTotalService.addWeightAndCost(orderId, alloyedMetal.getMetal().getId(),
                alloyedMetal.getMetalPurity().getId(), request.getWeight(), cost);
    }

    @Override
    @Transactional
    public void createReturn(Long orderId, OrderMetalProductionReturnRequestDto request) {
        Order order = orderService.getOrder(orderId);
        User employee = userService.getUser(request.getEmployeeId());
        Metal metal = metalService.getMetal(request.getMetalId());
        MetalPurity metalPurity = metalPurityService.getMetalPurity(request.getMetalPurityId());

        OrderMetalProduction orderMetalProduction = switch (request.getMaterialType()) {
            case ALLOYED_METAL -> createAlloyedMetalReturn(request, order, employee, metal, metalPurity);
            case OTHER -> createOtherMaterialReturn(request, order, employee, metal, metalPurity);
        };

        orderMetalProductionRepository.save(orderMetalProduction);
    }

    private OrderMetalProduction createAlloyedMetalReturn(OrderMetalProductionReturnRequestDto request, Order order,
                                                          User employee, Metal metal, MetalPurity metalPurity) {
        Alloy alloy = alloyService.getAlloyByIdAndMetalId(request.getAlloyId(), request.getMetalId());
        AlloyedMetal alloyedMetal = alloyedMetalService.getAlloyedMetalByIdAndMetalIdAndMetalPurityId(
                request.getMaterialId(), request.getMetalId(), request.getMetalPurityId());
        OrderMetalTotalReduce reduce = orderMetalTotalService.reduceWeightAndCost(order.getId(), alloyedMetal.getMetal().getId(),
                alloyedMetal.getMetalPurity().getId(), request.getWeight());
        OrderMetalProduction orderMetalProduction = OrderMetalProductionMapper.toReturnOrderMetalProduction(request, reduce.cost(),
                order, metal, metalPurity, alloyedMetal, employee);
        alloyedMetalPurchaseService.createAlloyedMetalPurchase(alloy.getId(), alloyedMetal.getId(), LocalDate.now(),
                request.getWeight(), reduce.priceGram());
        return orderMetalProduction;
    }

    private OrderMetalProduction createOtherMaterialReturn(OrderMetalProductionReturnRequestDto request, Order order,
                                                           User employee, Metal metal, MetalPurity metalPurity) {
        OtherMaterial otherMaterial = otherMaterialService.getOtherMaterial(request.getMaterialId());
        OrderMetalTotalReduce reduce = orderMetalTotalService.reduceWeightAndCost(order.getId(), metal.getId(), metalPurity.getId(),
                request.getWeight());
        OrderMetalProduction orderMetalProduction = OrderMetalProductionMapper.toReturnOrderMetalProduction(request, reduce.cost(),
                order, metal, metalPurity, otherMaterial, employee);
        otherMaterialTransactionService.addOtherMaterialTransactionWeight(LocalDate.now(), otherMaterial.getId(),
                request.getWeight(), order.getId(), "Returned material");
        return orderMetalProduction;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderMetalProductionSummaryDto> getOrderMetalProductionSummaryDtoList(Long orderId) {
        List<OrderMetalProduction> productions = orderMetalProductionRepository.findAllByOrderId(orderId);
        List<Long> userIds = productions.stream().map(OrderMetalProduction::getEmployee).map(User::getId).toList();
        Map<Long, UserWithImageDto> userWithImageDtoListMappedById = userService.getUserWithImageDtoListMappedById(userIds);
        Map<MetalAndPurityKey, List<OrderMetalProductionDto>> productionsMappedMyMetalAndPurity =
                OrderMetalProductionMapper.toOrderMetalProductionDtoList(productions, userWithImageDtoListMappedById).stream()
                        .collect(Collectors.groupingBy(production ->
                                new MetalAndPurityKey(production.getMetal(), production.getMetalPurity())));
        return OrderMetalProductionMapper.toOrderMetalProductionSummaryDtoList(productionsMappedMyMetalAndPurity);
    }
}
