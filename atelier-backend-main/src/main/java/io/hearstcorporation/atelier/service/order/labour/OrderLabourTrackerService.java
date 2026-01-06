package io.hearstcorporation.atelier.service.order.labour;

import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourTrackerDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourTrackerStartDto;

import java.util.List;

public interface OrderLabourTrackerService {

    // Business logic methods

    void startTracking(OrderLabourTrackerStartDto startDto);

    void stopTracking();

    // Get Dto methods

    OrderLabourTrackerDto getActiveTracker();

    List<OrderLabourTrackerDto> getTrackers(Long orderId);
}
