package io.hearstcorporation.atelier.repository.order;

import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.stock.OrderStockTotal;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

public interface OrderStockTotalRepository {

    OrderStockTotal calculateTotal(@NonNull Specification<Order> specification);
}
