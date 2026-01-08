package io.hearstcorporation.atelier.model.order;

import io.hearstcorporation.atelier.model.order.stock.OrderStockStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderSearchCriteria {

    private String searchInput;
    private List<OrderStatus> statuses;
    private List<OrderStockStatus> stockStatuses;

    /**
     * null - Show all orders
     * true - Show only orders in stock
     * false - Show only orders not in stock
     */
    private Boolean inStock;
}
