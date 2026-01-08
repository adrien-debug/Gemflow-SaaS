package io.hearstcorporation.atelier.service.order.sheet;

import io.hearstcorporation.atelier.dto.model.order.sheet.OrderTechnicalSheetDto;
import io.hearstcorporation.atelier.dto.model.order.sheet.OrderTechnicalSheetUpdateDto;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheet;

public interface OrderTechnicalSheetService {

    // Business logic methods

    void updateOrderTechnicalSheet(Long orderTechnicalSheetId, OrderTechnicalSheetUpdateDto updateDto);

    // Get Dto methods

    OrderTechnicalSheetDto getOrderTechnicalSheetDto(Long orderTechnicalSheetId);

    OrderTechnicalSheetDto getOrderTechnicalSheetDtoByOrder(Long orderId);

    // Get Entity methods

    OrderTechnicalSheet getOrderTechnicalSheetByOrder(Long orderId);
}
