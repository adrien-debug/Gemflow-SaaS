package io.hearstcorporation.atelier.dto.mapper.order.metal;

import io.hearstcorporation.atelier.dto.mapper.inventory.alloyedmetal.AlloyedMetalMapper;
import io.hearstcorporation.atelier.dto.mapper.inventory.other.OtherMaterialMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.MetalMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.MetalPurityMapper;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.order.metal.MetalAndPurityKey;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionReturnRequestDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalProductionUsageRequestDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalProduction;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalProductionMaterialType;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalProductionOperation;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.model.user.User;
import lombok.experimental.UtilityClass;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@UtilityClass
public class OrderMetalProductionMapper {

    public static OrderMetalProduction toUsageOrderMetalProduction(OrderMetalProductionUsageRequestDto usageRequestDto,
                                                                   BigDecimal cost, Order order, AlloyedMetal alloyedMetal,
                                                                   User employee) {
        OrderMetalProduction orderMetalProduction = new OrderMetalProduction();
        orderMetalProduction.setMaterialType(OrderMetalProductionMaterialType.ALLOYED_METAL);
        orderMetalProduction.setOperation(OrderMetalProductionOperation.USAGE);
        orderMetalProduction.setWeight(usageRequestDto.getWeight());
        orderMetalProduction.setCost(cost);
        orderMetalProduction.setOrder(order);
        orderMetalProduction.setMetal(alloyedMetal.getMetal());
        orderMetalProduction.setMetalPurity(alloyedMetal.getMetalPurity());
        orderMetalProduction.setAlloyedMetal(alloyedMetal);
        orderMetalProduction.setEmployee(employee);
        return orderMetalProduction;
    }

    public static OrderMetalProduction toReturnOrderMetalProduction(OrderMetalProductionReturnRequestDto returnRequestDto,
                                                                    BigDecimal cost, Order order, Metal metal,
                                                                    MetalPurity metalPurity, AlloyedMetal alloyedMetal,
                                                                    User employee) {
        OrderMetalProduction orderMetalProduction = toReturnOrderMetalProduction(returnRequestDto, cost, order, metal, metalPurity, employee);
        orderMetalProduction.setAlloyedMetal(alloyedMetal);
        return orderMetalProduction;
    }

    public static OrderMetalProduction toReturnOrderMetalProduction(OrderMetalProductionReturnRequestDto returnRequestDto,
                                                                    BigDecimal cost, Order order, Metal metal,
                                                                    MetalPurity metalPurity, OtherMaterial otherMaterial,
                                                                    User employee) {
        OrderMetalProduction orderMetalProduction = toReturnOrderMetalProduction(returnRequestDto, cost, order, metal, metalPurity, employee);
        orderMetalProduction.setOtherMaterial(otherMaterial);
        return orderMetalProduction;
    }

    private static OrderMetalProduction toReturnOrderMetalProduction(OrderMetalProductionReturnRequestDto returnRequestDto,
                                                                     BigDecimal cost, Order order, Metal metal,
                                                                     MetalPurity metalPurity, User employee) {
        OrderMetalProduction orderMetalProduction = new OrderMetalProduction();
        orderMetalProduction.setMaterialType(returnRequestDto.getMaterialType());
        orderMetalProduction.setOperation(OrderMetalProductionOperation.RETURN);
        orderMetalProduction.setWeight(returnRequestDto.getWeight().negate());
        orderMetalProduction.setCost(cost.negate());
        orderMetalProduction.setOrder(order);
        orderMetalProduction.setMetal(metal);
        orderMetalProduction.setMetalPurity(metalPurity);
        orderMetalProduction.setEmployee(employee);
        return orderMetalProduction;
    }

    public static OrderMetalProductionDto toOrderMetalProductionDto(OrderMetalProduction production,
                                                                    UserWithImageDto employee) {
        if (production == null) {
            return null;
        }
        return OrderMetalProductionDto.builder()
                .id(production.getId())
                .orderId(production.getOrder().getId())
                .createdAt(production.getCreatedAt())
                .operation(production.getOperation())
                .materialType(production.getMaterialType())
                .weight(production.getWeight())
                .cost(production.getCost())
                .material(OrderMetalProductionMapper.toOrderMetalProductionMaterialModelNameDto(production))
                .metal(MetalMapper.toMetalDto(production.getMetal()))
                .metalPurity(MetalPurityMapper.toMetalPurityDto(production.getMetalPurity()))
                .employee(employee)
                .build();
    }

    public static List<OrderMetalProductionDto> toOrderMetalProductionDtoList(List<OrderMetalProduction> productions,
                                                                              Map<Long, UserWithImageDto> userWithImageDtoListMappedById) {
        return productions.stream()
                .map(production -> OrderMetalProductionMapper.toOrderMetalProductionDto(production,
                        userWithImageDtoListMappedById.get(production.getEmployee().getId())))
                .toList();
    }

    public static ModelNameDto toOrderMetalProductionMaterialModelNameDto(OrderMetalProduction production) {
        if (production == null) {
            return null;
        }
        return switch (production.getMaterialType()) {
            case ALLOYED_METAL -> AlloyedMetalMapper.toModelNameDto(production.getAlloyedMetal());
            case OTHER -> OtherMaterialMapper.toModelNameDto(production.getOtherMaterial());
        };
    }

    public static List<OrderMetalProductionSummaryDto> toOrderMetalProductionSummaryDtoList(Map<MetalAndPurityKey, List<OrderMetalProductionDto>> productionsMappedMyMetalAndPurity) {
        return productionsMappedMyMetalAndPurity.entrySet().stream()
                .map(entry -> new OrderMetalProductionSummaryDto(entry.getKey().metal(), entry.getKey().metalPurity(), entry.getValue()))
                .toList();
    }
}
