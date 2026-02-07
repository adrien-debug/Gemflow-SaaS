package io.hearstcorporation.atelier.service.order;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderImageType;

import java.util.List;
import java.util.Map;

public interface OrderImageService {

    // Business logic methods

    void updateOrderImages(OrderImageType type, List<ImageRequestDto> images, Order order);

    void copyOrderImages(OrderImageType orderImageType, Order order, Order fromOrder);

    boolean isOrderImagesExists(Long orderId, OrderImageType orderImageType);

    // Get Dto methods

    List<ImageDto> getImageDtoList(Long orderId, OrderImageType type);

    Map<Long, List<ImageDto>> getImageDtoListGroupedByOrderId(List<Long> orderIds, OrderImageType type);

    List<ImageRequestDto> getImageRequestDtoList(Long orderId, OrderImageType type);
}
