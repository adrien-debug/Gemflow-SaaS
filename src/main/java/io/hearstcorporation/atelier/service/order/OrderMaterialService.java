package io.hearstcorporation.atelier.service.order;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.order.OrderMaterialDto;
import io.hearstcorporation.atelier.dto.model.order.OrderMaterialUpdateInBatchDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderMaterial;

import java.util.List;

public interface OrderMaterialService {

    // Business logic methods

    void updateOrderMaterials(Order order, BatchUpdateDto<OrderMaterialUpdateInBatchDto, Long> batchUpdateDto);

    boolean orderMaterialExists(Long orderId);

    void orderMaterialExistsOrThrow(Long orderId);

    // Get Dto methods

    List<OrderMaterialDto> getOrderMaterialDtoList(Long orderId);

    OrderMaterialDto getOrderMaterialDto(Long id);

    List<Long> getOrderMetalIds(Long orderId);

    // Get Entity methods

    OrderMaterial getOrderMaterial(Long id, Long orderId);

    OrderMaterial getOrderMaterial(Long id);

    OrderMaterial getFullOrderMaterial(Long id);
}
