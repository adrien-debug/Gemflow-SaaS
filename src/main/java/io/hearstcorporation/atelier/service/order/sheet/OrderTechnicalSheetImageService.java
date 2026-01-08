package io.hearstcorporation.atelier.service.order.sheet;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheet;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheetImageType;

import java.util.List;

public interface OrderTechnicalSheetImageService {

    // Business logic methods

    void updateOrderTechnicalSheetImages(OrderTechnicalSheetImageType type, List<ImageRequestDto> images, OrderTechnicalSheet orderTechnicalSheet);

    // Get Dto methods

    List<ImageDto> getImageDtoList(Long orderTechnicalSheetId, OrderTechnicalSheetImageType type);
}
