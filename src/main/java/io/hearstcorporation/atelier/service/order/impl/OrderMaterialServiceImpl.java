package io.hearstcorporation.atelier.service.order.impl;

import io.hearstcorporation.atelier.dto.mapper.order.OrderMaterialMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.order.OrderMaterialDto;
import io.hearstcorporation.atelier.dto.model.order.OrderMaterialUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.logo.HallmarkLogo;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderMaterial;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.repository.order.OrderMaterialRepository;
import io.hearstcorporation.atelier.service.logo.HallmarkLogoService;
import io.hearstcorporation.atelier.service.order.OrderMaterialService;
import io.hearstcorporation.atelier.service.setting.MetalService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class OrderMaterialServiceImpl implements OrderMaterialService {

    private final OrderMaterialRepository orderMaterialRepository;
    private final MetalService metalService;
    private final HallmarkLogoService hallmarkLogoService;

    @Override
    @Transactional
    public void updateOrderMaterials(Order order, BatchUpdateDto<OrderMaterialUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        List<OrderMaterialUpdateInBatchDto> requestDtoList = batchUpdateDto.getRequestDtoList();
        List<Long> metalIds = requestDtoList.stream()
                .flatMap(requestDto -> Stream.of(
                        requestDto.getMaterialMetalId(), requestDto.getClawMetalId()))
                .distinct()
                .toList();
        Map<Long, Metal> metalsMappedById = metalService.getMetalsMappedById(metalIds);
        List<Long> hallmarkLogoIds = requestDtoList.stream()
                .map(OrderMaterialUpdateInBatchDto::getHallmarkLogoId)
                .filter(Objects::nonNull)
                .toList();
        Map<Long, HallmarkLogo> hallmarkLogosMappedById = hallmarkLogoService.getHallmarkLogosMappedById(hallmarkLogoIds);
        requestDtoList.forEach(requestDto -> {
            OrderMaterial orderMaterial = Optional.ofNullable(requestDto.getId())
                    .map(orderMaterialId -> getOrderMaterial(orderMaterialId, order.getId()))
                    .orElseGet(OrderMaterial::new);
            OrderMaterialMapper.mapOrderMaterial(orderMaterial, order,
                    metalsMappedById.get(requestDto.getMaterialMetalId()),
                    metalsMappedById.get(requestDto.getClawMetalId()),
                    hallmarkLogosMappedById.get(requestDto.getHallmarkLogoId()));
            orderMaterialRepository.save(orderMaterial);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> orderMaterialRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Order materials %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }

    @Override
    public boolean orderMaterialExists(Long orderId) {
        return orderMaterialRepository.existsByOrderId(orderId);
    }

    @Override
    public void orderMaterialExistsOrThrow(Long orderId) {
        if (!orderMaterialExists(orderId)) {
            throw new IllegalStateException("Order %d must contain at least one material.".formatted(orderId));
        }
    }

    @Override
    public List<OrderMaterialDto> getOrderMaterialDtoList(Long orderId) {
        return OrderMaterialMapper.toOrderMaterialDtoList(
                orderMaterialRepository.findOrderMaterialsByOrderIdOrderByIdAsc(orderId));
    }

    @Override
    public OrderMaterialDto getOrderMaterialDto(Long id) {
        return OrderMaterialMapper.toOrderMaterialDto(getFullOrderMaterial(id));
    }

    @Override
    public List<Long> getOrderMetalIds(Long orderId) {
        List<OrderMaterial> orderMaterials = orderMaterialRepository.findAllByOrderId(orderId);
        return orderMaterials.stream()
                .flatMap(orderMaterial -> Stream.of(
                        orderMaterial.getMaterialMetal().getId(),
                        orderMaterial.getClawMetal().getId()))
                .distinct()
                .toList();
    }

    @Override
    public OrderMaterial getOrderMaterial(Long id, Long orderId) {
        return orderMaterialRepository.findByIdAndOrderId(id, orderId).orElseThrow(
                () -> new NotFoundException("Order material with id %d was not found for order with id %d."
                        .formatted(id, orderId)));
    }

    @Override
    public OrderMaterial getOrderMaterial(Long id) {
        return retrieveOrderMaterial(id, orderMaterialRepository.findById(id));
    }

    // Method must work without transactional, because collecting all with EntityGraph
    @Override
    public OrderMaterial getFullOrderMaterial(Long id) {
        return retrieveOrderMaterial(id, orderMaterialRepository.findOrderMaterialById(id));
    }

    private OrderMaterial retrieveOrderMaterial(Long orderMaterialId, Optional<OrderMaterial> orderMaterialOpt) {
        return orderMaterialOpt.orElseThrow(
                () -> new NotFoundException("Order material with id %d was not found.".formatted(orderMaterialId))
        );
    }
}
