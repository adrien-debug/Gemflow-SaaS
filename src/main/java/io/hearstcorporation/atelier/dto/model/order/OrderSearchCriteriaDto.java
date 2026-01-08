package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.model.order.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderSearchCriteriaDto {

    private String searchInput;
    private List<OrderStatus> statuses;
}
