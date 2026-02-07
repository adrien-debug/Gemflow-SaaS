package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourUpdateDto;
import io.hearstcorporation.atelier.service.order.labour.OrderLabourService;
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

import static io.hearstcorporation.atelier.controller.order.OrderLabourController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderLabourController {

    public static final String BASE_URL = "/api/v1/order-labours";
    public static final String LABOUR_ID = "/{labourId}";

    private final OrderLabourService orderLabourService;

    @GetMapping(LABOUR_ID)
    public OrderLabourDto getLabour(@PathVariable Long labourId) {
        return orderLabourService.getOrderLabourDto(labourId);
    }

    @PostMapping
    public OrderLabourDto createLabour(@RequestBody @Valid OrderLabourRequestDto orderLabourRequestDto) {
        Long labourId = orderLabourService.createOrderLabour(orderLabourRequestDto);
        return orderLabourService.getOrderLabourDto(labourId);
    }

    @PutMapping(LABOUR_ID)
    public OrderLabourDto updateLabour(@PathVariable Long labourId, @RequestBody @Valid OrderLabourUpdateDto orderLabourRequestDto) {
        orderLabourService.updateOrderLabour(labourId, orderLabourRequestDto);
        return orderLabourService.getOrderLabourDto(labourId);
    }

    @DeleteMapping(LABOUR_ID)
    public void deleteLabour(@PathVariable Long labourId) {
        orderLabourService.deleteOrderLabour(labourId);
    }

    @PostMapping("/search")
    public SearchDto<OrderLabourDto> searchLabour(@RequestBody @Valid SearchRequestDto<OrderLabourSearchCriteriaDto> searchQuery) {
        return orderLabourService.searchOrderLabours(searchQuery);
    }
}
