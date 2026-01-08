package io.hearstcorporation.atelier.dto.mapper.order.diamond;

import io.hearstcorporation.atelier.dto.mapper.inventory.diamond.DiamondMapper;
import io.hearstcorporation.atelier.dto.mapper.order.OrderMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondQualityIssueRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondTotalDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamondTotal;
import io.hearstcorporation.atelier.model.user.User;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@UtilityClass
public class OrderDiamondMapper {

    public static OrderDiamond toOrderDiamond(OrderDiamondRequestDto dto, Order order, User employee, Diamond diamond) {
        OrderDiamond entity = new OrderDiamond();
        entity.setOrder(order);
        entity.setDiamond(diamond);
        entity.setMarkupPercentage(DiamondMapper.toSupplierMarkupPercentage(diamond));
        mapOrderDiamond(entity, dto, employee);
        return entity;
    }

    public static OrderDiamond toOrderDiamond(OrderDiamondQualityIssueRequestDto dto, Order order, Diamond diamond) {
        OrderDiamond entity = new OrderDiamond();
        entity.setOrder(order);
        entity.setDiamond(diamond);
        entity.setQuantity(dto.getQuantity());
        entity.setMarkupPercentage(DiamondMapper.toSupplierMarkupPercentage(diamond));
        return entity;
    }

    public static void mapOrderDiamond(OrderDiamond entity, OrderDiamondUpdateDto dto, User employee) {
        entity.setQuantity(dto.getQuantity());
        entity.setDate(dto.getDate());
        entity.setEmployee(employee);
    }

    public static OrderDiamondDto toOrderDiamondDto(OrderDiamond entity, UserWithImageDto userWithImages) {
        if (entity == null) {
            return null;
        }
        Diamond diamond = entity.getDiamond();
        BigDecimal stoneWeight = diamond.getStoneCarat();
        BigDecimal stonePrice = diamond.getStonePrice();
        BigDecimal quantity = new BigDecimal(entity.getQuantity());
        BigDecimal totalPrice = stonePrice.multiply(quantity);
        BigDecimal totalMarkupPrice = Optional.ofNullable(entity.getMarkupPercentageValue())
                .map(totalPrice::multiply)
                .orElse(totalPrice);
        return OrderDiamondDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .quantity(entity.getQuantity())
                .date(entity.getDate())
                .diamond(DiamondMapper.toDiamondDto(diamond, null))
                .employee(userWithImages)
                .order(OrderMapper.toModelNameDto(entity.getOrder()))
                .totalWeight(stoneWeight.multiply(quantity))
                .totalPrice(totalPrice)
                .totalMarkupPrice(totalMarkupPrice)
                .build();
    }

    public static SearchDto<OrderDiamondDto> toOrderDiamondDtoPage(Page<OrderDiamond> orderDiamondPage,
                                                                   Map<Long, UserWithImageDto> employeeImagesMap) {
        return new SearchDto<>(
                orderDiamondPage.getContent().stream()
                        .map(od -> getOrderDiamondDto(od, employeeImagesMap))
                        .toList(),
                orderDiamondPage.getNumber(),
                orderDiamondPage.getSize(),
                orderDiamondPage.getTotalPages(),
                orderDiamondPage.getTotalElements()
        );
    }

    private static OrderDiamondDto getOrderDiamondDto(OrderDiamond orderDiamond, Map<Long, UserWithImageDto> employeeImagesMap) {
        if (orderDiamond == null) {
            return null;
        }
        User employee = orderDiamond.getEmployee();
        UserWithImageDto userWithImageDto = null;
        if (employee != null) {
            userWithImageDto = employeeImagesMap.get(employee.getId());
        }
        return toOrderDiamondDto(orderDiamond, userWithImageDto);
    }

    public static OrderDiamondTotalDto toOrderDiamondTotalDto(OrderDiamondTotal orderDiamondTotal) {
        if (orderDiamondTotal == null) {
            return null;
        }
        return new OrderDiamondTotalDto(orderDiamondTotal.getTotalQuantity(), orderDiamondTotal.getTotalWeight(),
                orderDiamondTotal.getTotalWeightGrams(), orderDiamondTotal.getTotalPrice(),
                orderDiamondTotal.getTotalMarkupPrice());
    }
}
