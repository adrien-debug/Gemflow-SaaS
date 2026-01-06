package io.hearstcorporation.atelier.repository.order;

import io.hearstcorporation.atelier.model.order.OrderProfit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderProfitRepository extends JpaRepository<OrderProfit, Long> {

    Optional<OrderProfit> findByOrderId(Long orderId);
}
