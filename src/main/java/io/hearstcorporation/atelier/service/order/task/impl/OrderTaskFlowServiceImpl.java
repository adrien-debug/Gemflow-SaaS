package io.hearstcorporation.atelier.service.order.task.impl;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.LogTimeRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CadCompleteRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CastingStartRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CastingWeightRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.PartBrokenRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.Printing3dCompleteRequestDto;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.order.OrderImageType;
import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.service.casting.CastingService;
import io.hearstcorporation.atelier.service.order.OrderImageService;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.labour.OrderLabourService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskFlowService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskMetalService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderTaskFlowServiceImpl implements OrderTaskFlowService {

    private final OrderService orderService;
    private final OrderImageService orderImageService;
    private final OrderTaskService orderTaskService;
    private final OrderLabourService orderLabourService;
    private final OrderTaskMetalService orderTaskMetalService;
    private final CastingService castingService;

    @Override
    @Transactional
    public void startCad(Long orderTaskId) {
        orderTaskService.updateOrderTaskStatus(orderTaskId, OrderTaskStatus.IN_CAD);
    }

    @Override
    @Transactional
    public void startCadReview(Long orderTaskId, LogTimeRequestDto logTime) {
        orderTaskService.updateOrderTaskStatus(orderTaskId, OrderTaskStatus.CAD_REVIEW);
        Long orderId = orderTaskService.getOrderId(orderTaskId);
        orderService.orderCadExistsOrThrow(orderId);
        orderLabourService.createOrderLabour(orderId, logTime, LabourTaskType.CAD);
    }

    @Override
    @Transactional
    public void completeCad(Long orderTaskId, CadCompleteRequestDto cadCompleteRequest) {
        orderTaskService.updateOrderTaskStatus(orderTaskId, OrderTaskStatus.READY_FOR_PROTOTYPING);
        Long orderId = orderTaskService.getOrderId(orderTaskId);
        orderService.orderCadExistsOrThrow(orderId);
        orderService.updateAcceptanceDate(orderId, cadCompleteRequest.getAcceptanceDate());
        List<ImageRequestDto> cadOrderImages = orderImageService.getImageRequestDtoList(orderId, OrderImageType.CAD);
        orderTaskService.updateOrderTaskImages(orderTaskId, cadOrderImages);
    }

    @Override
    @Transactional
    public void restartCad(Long orderTaskId) {
        orderTaskService.updateOrderTaskStatus(orderTaskId, OrderTaskStatus.READY_FOR_CAD);
    }

    @Override
    @Transactional
    public void start3dPrinting(Long orderTaskId) {
        orderTaskService.updateOrderTaskStatus(orderTaskId, OrderTaskStatus.IN_PROTOTYPING);
    }

    @Override
    @Transactional
    public void complete3dPrinting(Long orderTaskId, Printing3dCompleteRequestDto printing3dCompleteRequest) {
        orderTaskService.splitOrderTaskAndResetCasting(orderTaskId, printing3dCompleteRequest.getMetalId(),
                printing3dCompleteRequest.getStlCount(), printing3dCompleteRequest.getOrderTaskImages(),
                OrderTaskStatus.READY_FOR_CASTING);
    }

    @Override
    @Transactional
    public void startCasting(Long orderTaskId, CastingStartRequestDto castingStartRequest) {
        Metal orderTaskMetal = orderTaskMetalService.getSingleMetalByOrderTaskId(orderTaskId);
        Casting casting = castingService.getOpenCastingByCylinderIdAndMetalId(
                castingStartRequest.getCylinderId(), orderTaskMetal.getId());
        orderTaskService.updateOrderTask(orderTaskId, casting, OrderTaskStatus.IN_CASTING);
    }

    @Override
    @Transactional
    public void completeCasting(Long orderTaskId, CastingWeightRequestDto castingCompleteRequest) {
        orderTaskService.updateOrderTaskStatus(orderTaskId, OrderTaskStatus.COMPLETED);
        orderTaskService.updateOrderTaskWeight(orderTaskId, castingCompleteRequest.getWeight());
    }

    @Override
    @Transactional
    public void partBroken(Long orderTaskId, PartBrokenRequestDto partBrokenRequest) {
        orderTaskService.splitOrderTaskAndResetCasting(orderTaskId, partBrokenRequest.getStlCount(),
                partBrokenRequest.getOrderTaskImages(), OrderTaskStatus.READY_FOR_PROTOTYPING);
    }
}
