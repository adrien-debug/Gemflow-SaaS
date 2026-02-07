package io.hearstcorporation.atelier.dto.model.order.diamond;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamondStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class OrderDiamondDto {

    private Long id;
    private OrderDiamondStatus status;
    private DiamondDto diamond;
    private Integer quantity;
    private BigDecimal totalWeight;
    private BigDecimal totalPrice;
    private BigDecimal totalMarkupPrice;
    private UserWithImageDto employee;
    private LocalDate date;
    private ModelNameDto order;
}
