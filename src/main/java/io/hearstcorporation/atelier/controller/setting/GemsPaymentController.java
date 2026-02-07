package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.GemsPaymentDto;
import io.hearstcorporation.atelier.service.setting.GemsPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.GemsPaymentController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class GemsPaymentController {

    public static final String BASE_URL = "/api/v1/settings/gems/payments";

    private final GemsPaymentService gemsPaymentService;

    @GetMapping
    public List<GemsPaymentDto> getGemsPayments() {
        return gemsPaymentService.getGemsPaymentDtoList();
    }

    @GetMapping("/{id}")
    public GemsPaymentDto getGemsPayment(@PathVariable Long id) {
        return gemsPaymentService.getGemsPaymentDto(id);
    }
}
