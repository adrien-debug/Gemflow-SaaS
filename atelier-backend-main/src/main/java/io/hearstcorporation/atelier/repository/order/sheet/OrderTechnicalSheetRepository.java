package io.hearstcorporation.atelier.repository.order.sheet;

import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderTechnicalSheetRepository extends JpaRepository<OrderTechnicalSheet, Long> {

    Optional<OrderTechnicalSheet> findByOrderId(Long orderId);
}
