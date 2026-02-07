package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.model.order.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderStatusRequestDto {

    private OrderStatus status;
}
