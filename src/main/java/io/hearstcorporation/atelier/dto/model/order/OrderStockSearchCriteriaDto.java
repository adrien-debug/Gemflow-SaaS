package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.model.order.stock.OrderStockStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderStockSearchCriteriaDto {

    private String searchInput;
    private List<OrderStockStatus> statuses;
}
