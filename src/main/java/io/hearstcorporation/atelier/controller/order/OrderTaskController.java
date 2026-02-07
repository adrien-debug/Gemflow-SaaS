package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.LogTimeRequestDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CadCompleteRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CastingStartRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CastingWeightRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.task.PartBrokenRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.Printing3dCompleteRequestDto;
import io.hearstcorporation.atelier.service.order.task.OrderTaskFlowService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.order.OrderTaskController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderTaskController {

    public static final String BASE_URL = "/api/v1/order-tasks";

    private final OrderTaskService orderTaskService;
    private final OrderTaskFlowService orderTaskFlowService;

    @PatchMapping("/{orderTaskId}/cad/start")
    public void startCad(@PathVariable Long orderTaskId) {
        orderTaskFlowService.startCad(orderTaskId);
    }

    @PatchMapping("/{orderTaskId}/cad/review")
    public void startCadReview(@PathVariable Long orderTaskId,
                               @RequestBody @Valid LogTimeRequestDto logTime) {
        orderTaskFlowService.startCadReview(orderTaskId, logTime);
    }

    @PatchMapping("/{orderTaskId}/cad/complete")
    public void completeCad(@PathVariable Long orderTaskId,
                            @RequestBody @Valid CadCompleteRequestDto cadCompleteRequest) {
        orderTaskFlowService.completeCad(orderTaskId, cadCompleteRequest);
    }

    @PatchMapping("/{orderTaskId}/cad/restart")
    public void restartCad(@PathVariable Long orderTaskId) {
        orderTaskFlowService.restartCad(orderTaskId);
    }

    @PatchMapping("/{orderTaskId}/3d-printing/start")
    public void start3dPrinting(@PathVariable Long orderTaskId) {
        orderTaskFlowService.start3dPrinting(orderTaskId);
    }

    @PatchMapping("/{orderTaskId}/3d-printing/complete")
    public void complete3dPrinting(@PathVariable Long orderTaskId,
                                   @RequestBody @Valid Printing3dCompleteRequestDto printing3dCompleteRequest) {
        orderTaskFlowService.complete3dPrinting(orderTaskId, printing3dCompleteRequest);
    }

    @PatchMapping("/{orderTaskId}/casting/start")
    public void startCasting(@PathVariable Long orderTaskId,
                             @RequestBody @Valid CastingStartRequestDto castingStartRequest) {
        orderTaskFlowService.startCasting(orderTaskId, castingStartRequest);
    }

    @PatchMapping("/{orderTaskId}/casting/complete")
    public void startCasting(@PathVariable Long orderTaskId,
                             @RequestBody @Valid CastingWeightRequestDto castingCompleteRequest) {
        orderTaskFlowService.completeCasting(orderTaskId, castingCompleteRequest);
    }

    @PatchMapping("/{orderTaskId}/part-broken")
    public void partBroken(@PathVariable Long orderTaskId,
                           @RequestBody @Valid PartBrokenRequestDto partBrokenRequest) {
        orderTaskFlowService.partBroken(orderTaskId, partBrokenRequest);
    }

    @PostMapping("/search")
    public SearchDto<OrderTaskDto> searchOrderTasks(@RequestBody @Valid SearchRequestDto<OrderTaskSearchCriteriaDto> searchQuery) {
        return orderTaskService.searchOrderTasks(searchQuery);
    }

    @GetMapping("/{orderTaskId}")
    public OrderTaskDto getOrderTask(@PathVariable Long orderTaskId) {
        return orderTaskService.getOrderTaskDto(orderTaskId);
    }

    @PatchMapping("/{orderTaskId}/casting/weight")
    public void updateWeight(@PathVariable Long orderTaskId,
                             @RequestBody @Valid CastingWeightRequestDto castingWeightRequest) {
        orderTaskService.updateOrderTaskWeight(orderTaskId, castingWeightRequest.getWeight());
    }
}
