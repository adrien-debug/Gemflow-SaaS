package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.order.sheet.OrderTechnicalSheetDto;
import io.hearstcorporation.atelier.dto.model.order.sheet.OrderTechnicalSheetUpdateDto;
import io.hearstcorporation.atelier.service.order.sheet.OrderTechnicalSheetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.order.OrderTechnicalSheetController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderTechnicalSheetController {

    public static final String BASE_URL = "/api/v1/order-technical-sheets";
    public static final String ORDER_TECHNICAL_SHEET_ID = "/{orderTechnicalSheetId}";

    private final OrderTechnicalSheetService orderTechnicalSheetService;

    @GetMapping("/{orderId}")
    public OrderTechnicalSheetDto getOrderTechnicalSheet(@PathVariable Long orderId) {
        return orderTechnicalSheetService.getOrderTechnicalSheetDtoByOrder(orderId);
    }

    @PutMapping(ORDER_TECHNICAL_SHEET_ID)
    public OrderTechnicalSheetDto updateOrderTechnicalSheet(@PathVariable Long orderTechnicalSheetId,
                                                            @RequestBody @Valid OrderTechnicalSheetUpdateDto updateDto) {
        orderTechnicalSheetService.updateOrderTechnicalSheet(orderTechnicalSheetId, updateDto);
        return orderTechnicalSheetService.getOrderTechnicalSheetDto(orderTechnicalSheetId);
    }
}
