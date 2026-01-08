package io.hearstcorporation.atelier.repository.order.labour;

import io.hearstcorporation.atelier.model.order.labour.OrderLabourTracker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderLabourTrackerRepository extends JpaRepository<OrderLabourTracker, Long> {

    Optional<OrderLabourTracker> findByEmployeeIdAndEndDateNull(Long userId);

    Optional<OrderLabourTracker> findByEmployeeIdAndOrderIdAndEndDateNull(Long userId, Long orderId);
}
