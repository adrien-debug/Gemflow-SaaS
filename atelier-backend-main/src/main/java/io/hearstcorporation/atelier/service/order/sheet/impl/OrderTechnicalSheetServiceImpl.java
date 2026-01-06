package io.hearstcorporation.atelier.service.order.sheet.impl;

import io.hearstcorporation.atelier.dto.mapper.order.sheet.OrderTechnicalSheetMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.order.sheet.OrderTechnicalSheetDto;
import io.hearstcorporation.atelier.dto.model.order.sheet.OrderTechnicalSheetUpdateDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheet;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheetImageType;
import io.hearstcorporation.atelier.repository.order.sheet.OrderTechnicalSheetRepository;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.sheet.OrderTechnicalSheetImageService;
import io.hearstcorporation.atelier.service.order.sheet.OrderTechnicalSheetService;
import io.hearstcorporation.atelier.util.PatchHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OrderTechnicalSheetServiceImpl implements OrderTechnicalSheetService {

    private final OrderTechnicalSheetRepository orderTechnicalSheetRepository;
    private final OrderTechnicalSheetImageService orderTechnicalSheetImageService;
    private final OrderService orderService;


    @Override
    @Transactional
    public void updateOrderTechnicalSheet(Long orderTechnicalSheetId, OrderTechnicalSheetUpdateDto updateDto) {
        OrderTechnicalSheet technicalSheet = getOrderTechnicalSheet(orderTechnicalSheetId);
        OrderTechnicalSheetMapper.mapOrderTechnicalSheet(technicalSheet, updateDto);
        orderTechnicalSheetRepository.save(technicalSheet);
        if (Objects.nonNull(updateDto.getMounting1Images())) {
            orderTechnicalSheetImageService.updateOrderTechnicalSheetImages(OrderTechnicalSheetImageType.MOUNTING_1,
                    PatchHelper.getOrEmptyList(updateDto.getMounting1Images()), technicalSheet);
        }
        if (Objects.nonNull(updateDto.getMounting2Images())) {
            orderTechnicalSheetImageService.updateOrderTechnicalSheetImages(OrderTechnicalSheetImageType.MOUNTING_2,
                    PatchHelper.getOrEmptyList(updateDto.getMounting2Images()), technicalSheet);
        }
        if (Objects.nonNull(updateDto.getMounting3Images())) {
            orderTechnicalSheetImageService.updateOrderTechnicalSheetImages(OrderTechnicalSheetImageType.MOUNTING_3,
                    PatchHelper.getOrEmptyList(updateDto.getMounting3Images()), technicalSheet);
        }
        if (Objects.nonNull(updateDto.getMounting4Images())) {
            orderTechnicalSheetImageService.updateOrderTechnicalSheetImages(OrderTechnicalSheetImageType.MOUNTING_4,
                    PatchHelper.getOrEmptyList(updateDto.getMounting4Images()), technicalSheet);
        }
    }

    @Override
    @Transactional
    public OrderTechnicalSheetDto getOrderTechnicalSheetDto(Long orderTechnicalSheetId) {
        OrderTechnicalSheet technicalSheet = getOrderTechnicalSheet(orderTechnicalSheetId);
        return getOrderTechnicalSheetDtoWithImages(orderTechnicalSheetId, technicalSheet);
    }

    @Override
    @Transactional
    public OrderTechnicalSheetDto getOrderTechnicalSheetDtoByOrder(Long orderId) {
        OrderTechnicalSheet technicalSheet = getOrderTechnicalSheetByOrder(orderId);
        return getOrderTechnicalSheetDtoWithImages(technicalSheet.getId(), technicalSheet);
    }

    @Override
    @Transactional
    public OrderTechnicalSheet getOrderTechnicalSheetByOrder(Long orderId) {
        return orderTechnicalSheetRepository.findByOrderId(orderId).orElseGet(() -> {
            OrderTechnicalSheet technicalSheet = new OrderTechnicalSheet();
            Order order = orderService.getOrder(orderId);
            technicalSheet.setOrder(order);
            return orderTechnicalSheetRepository.save(technicalSheet);
        });
    }

    private OrderTechnicalSheet getOrderTechnicalSheet(Long orderTechnicalSheetId) {
        return orderTechnicalSheetRepository.findById(orderTechnicalSheetId).orElseThrow(
                () -> new NotFoundException("Order technical sheet with id %d was not found.".formatted(orderTechnicalSheetId))
        );
    }

    private OrderTechnicalSheetDto getOrderTechnicalSheetDtoWithImages(Long orderTechnicalSheetId, OrderTechnicalSheet technicalSheet) {
        List<ImageDto> mounting1Images = orderTechnicalSheetImageService.getImageDtoList(orderTechnicalSheetId, OrderTechnicalSheetImageType.MOUNTING_1);
        List<ImageDto> mounting2Images = orderTechnicalSheetImageService.getImageDtoList(orderTechnicalSheetId, OrderTechnicalSheetImageType.MOUNTING_2);
        List<ImageDto> mounting3Images = orderTechnicalSheetImageService.getImageDtoList(orderTechnicalSheetId, OrderTechnicalSheetImageType.MOUNTING_3);
        List<ImageDto> mounting4Images = orderTechnicalSheetImageService.getImageDtoList(orderTechnicalSheetId, OrderTechnicalSheetImageType.MOUNTING_4);
        return OrderTechnicalSheetMapper.toOrderTechnicalSheetDto(technicalSheet, mounting1Images, mounting2Images, mounting3Images, mounting4Images);
    }
}
