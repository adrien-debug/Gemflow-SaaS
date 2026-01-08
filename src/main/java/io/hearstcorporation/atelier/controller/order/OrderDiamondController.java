package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondQualityIssueRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondQuantityUpdateDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondRequestDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondTotalDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondUpdateDto;
import io.hearstcorporation.atelier.service.order.diamond.OrderDiamondService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.order.OrderDiamondController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderDiamondController {

    public static final String BASE_URL = "/api/v1/order-diamonds";
    public static final String ORDER_DIAMOND_ID = "/{orderDiamondId}";
    public static final String GOOD_QUALITY_POSTFIX = "/good-quality";
    public static final String BROKEN_POSTFIX = "/broken";
    public static final String QUALITY_ISSUE_POSTFIX = "/quality-issue";

    private final OrderDiamondService orderDiamondService;

    @GetMapping(ORDER_DIAMOND_ID)
    public OrderDiamondDto getOrderDiamond(@PathVariable Long orderDiamondId) {
        return orderDiamondService.getOrderDiamondDto(orderDiamondId);
    }

    @PostMapping(GOOD_QUALITY_POSTFIX)
    public OrderDiamondDto createGoodQualityOrderDiamond(@RequestBody @Valid OrderDiamondRequestDto orderDiamondRequestDto) {
        Long orderDiamondId = orderDiamondService.createGoodQualityOrderDiamond(orderDiamondRequestDto);
        return orderDiamondService.getOrderDiamondDto(orderDiamondId);
    }

    @PostMapping(BROKEN_POSTFIX)
    public OrderDiamondDto createBrokenOrderDiamond(@RequestBody @Valid OrderDiamondRequestDto orderDiamondRequestDto) {
        Long orderDiamondId = orderDiamondService.createBrokenOrderDiamond(orderDiamondRequestDto);
        return orderDiamondService.getOrderDiamondDto(orderDiamondId);
    }

    @PostMapping(QUALITY_ISSUE_POSTFIX)
    public OrderDiamondDto createQualityIssueOrderDiamond(@RequestBody @Valid OrderDiamondQualityIssueRequestDto orderDiamondRequest) {
        Long orderDiamondId = orderDiamondService.createQualityIssueOrderDiamond(orderDiamondRequest);
        return orderDiamondService.getOrderDiamondDto(orderDiamondId);
    }

    @PutMapping(ORDER_DIAMOND_ID + GOOD_QUALITY_POSTFIX)
    public OrderDiamondDto updateGoodQualityOrderDiamond(@PathVariable Long orderDiamondId,
                                                         @RequestBody @Valid OrderDiamondUpdateDto orderDiamondUpdateDto) {
        orderDiamondService.updateGoodQualityOrderDiamond(orderDiamondId, orderDiamondUpdateDto);
        return orderDiamondService.getOrderDiamondDto(orderDiamondId);
    }

    @PutMapping(ORDER_DIAMOND_ID + BROKEN_POSTFIX)
    public OrderDiamondDto updateBrokenOrderDiamond(@PathVariable Long orderDiamondId,
                                                    @RequestBody @Valid OrderDiamondUpdateDto orderDiamondUpdateDto) {
        orderDiamondService.updateBrokenOrderDiamond(orderDiamondId, orderDiamondUpdateDto);
        return orderDiamondService.getOrderDiamondDto(orderDiamondId);
    }

    @PutMapping(ORDER_DIAMOND_ID + QUALITY_ISSUE_POSTFIX)
    public OrderDiamondDto updateQualityIssueOrderDiamond(@PathVariable Long orderDiamondId,
                                                          @RequestBody @Valid OrderDiamondQuantityUpdateDto orderDiamondUpdateDto) {
        orderDiamondService.updateQualityIssueOrderDiamond(orderDiamondId, orderDiamondUpdateDto);
        return orderDiamondService.getOrderDiamondDto(orderDiamondId);
    }

    @DeleteMapping(ORDER_DIAMOND_ID)
    public void deleteOrderDiamond(@PathVariable Long orderDiamondId) {
        orderDiamondService.deleteOrderDiamond(orderDiamondId);
    }

    @PostMapping("/search")
    public SearchDto<OrderDiamondDto> searchOrderDiamond(@RequestBody @Valid SearchRequestDto<OrderDiamondSearchCriteriaDto> searchQuery) {
        return orderDiamondService.searchOrderDiamonds(searchQuery);
    }

    @PostMapping("/total")
    public OrderDiamondTotalDto getOrderDiamondTotalDto(@RequestBody @Valid OrderDiamondSearchCriteriaDto searchQueryDto) {
        return orderDiamondService.getOrderDiamondTotalDto(searchQueryDto);
    }
}
