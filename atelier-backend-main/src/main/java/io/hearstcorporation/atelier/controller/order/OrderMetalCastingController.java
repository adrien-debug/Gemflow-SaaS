package io.hearstcorporation.atelier.controller.order;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingSearchCriteriaDto;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalCastingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.order.OrderMetalCastingController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class OrderMetalCastingController {

    public static final String BASE_URL = "/api/v1/order-metal-castings";

    private final OrderMetalCastingService orderMetalCastingService;

    @PostMapping("/search")
    public SearchDto<OrderMetalCastingDto> searchOrderMetalCastings(@RequestBody @Valid SearchRequestDto<OrderMetalCastingSearchCriteriaDto> orderMetalCastingSearchQueryDto) {
        return orderMetalCastingService.searchOrderMetalCastings(orderMetalCastingSearchQueryDto);
    }
}
