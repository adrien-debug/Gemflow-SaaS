package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.order.OrderProfitDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProfitPatchDto;
import io.hearstcorporation.atelier.service.order.OrderProfitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.order.OrderProfitController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderProfitController {

    public static final String BASE_URL = "/api/v1/order-profits";

    private final OrderProfitService orderProfitService;

    @PatchMapping("/{orderId}/diamond")
    public void patchDiamondProfit(@PathVariable Long orderId,
                                   @RequestBody @Valid OrderProfitPatchDto patchDto) {
        orderProfitService.patchDiamondProfit(orderId, patchDto);
    }

    @PatchMapping("/{orderId}/gemstone")
    public void patchGemstoneProfit(@PathVariable Long orderId,
                                    @RequestBody @Valid OrderProfitPatchDto patchDto) {
        orderProfitService.patchGemstoneProfit(orderId, patchDto);
    }

    @PatchMapping("/{orderId}/labour")
    public void patchLabourProfit(@PathVariable Long orderId,
                                  @RequestBody @Valid OrderProfitPatchDto patchDto) {
        orderProfitService.patchLabourProfit(orderId, patchDto);
    }

    @PatchMapping("/{orderId}/metal")
    public void patchMetalProfit(@PathVariable Long orderId,
                                 @RequestBody @Valid OrderProfitPatchDto patchDto) {
        orderProfitService.patchMetalProfit(orderId, patchDto);
    }

    @GetMapping("/{orderId}")
    public OrderProfitDto getOrderSummaryProfit(@PathVariable Long orderId) {
        return orderProfitService.getOrderProfitDtoByOrder(orderId);
    }
}
