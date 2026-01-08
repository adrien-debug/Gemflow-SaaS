package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourTrackerDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourTrackerStartDto;
import io.hearstcorporation.atelier.service.order.labour.OrderLabourTrackerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.order.OrderLabourTrackerController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderLabourTrackerController {

    public static final String BASE_URL = "/api/v1/order-labour-trackers";

    private final OrderLabourTrackerService orderLabourTrackerService;

    @PostMapping("/start")
    public void startTracker(@RequestBody @Valid OrderLabourTrackerStartDto startDto) {
        orderLabourTrackerService.startTracking(startDto);
    }

    @PostMapping("/stop")
    public void stopTracker() {
        orderLabourTrackerService.stopTracking();
    }

    @GetMapping("/active")
    public OrderLabourTrackerDto getActiveTracker() {
        return orderLabourTrackerService.getActiveTracker();
    }

    @GetMapping
    public List<OrderLabourTrackerDto> getTrackers(@RequestParam("orderId") Long orderId) {
        return orderLabourTrackerService.getTrackers(orderId);
    }
}
