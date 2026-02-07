package io.hearstcorporation.atelier.repository.order.stock;

import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.model.order.stock.OrderStockStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderStockRepository extends JpaRepository<OrderStock, Long> {

    Optional<OrderStock> findByOrderIdAndStatusIn(Long orderId, List<OrderStockStatus> statuses);
}
