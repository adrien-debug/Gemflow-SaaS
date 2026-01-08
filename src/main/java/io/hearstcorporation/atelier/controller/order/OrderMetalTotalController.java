package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalTotalWeightOutRequestDto;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalTotalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.order.OrderMetalTotalController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderMetalTotalController {

    public static final String BASE_URL = "/api/v1/order-metal-totals";

    private final OrderMetalTotalService orderMetalTotalService;

    @PatchMapping("/{orderMetalTotalId}/weight-out")
    public void updateWeightOut(@PathVariable Long orderMetalTotalId,
                                @RequestBody @Valid OrderMetalTotalWeightOutRequestDto weightOutRequestDto) {
        orderMetalTotalService.updateWeightOut(orderMetalTotalId, weightOutRequestDto.getWeightOut());
    }
}
