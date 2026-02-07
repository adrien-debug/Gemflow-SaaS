package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.SupplyTypeDto;
import io.hearstcorporation.atelier.service.setting.SupplyTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.SupplyTypeController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class SupplyTypeController {

    public static final String BASE_URL = "/api/v1/settings/supply-types";

    private final SupplyTypeService supplyTypeService;

    @GetMapping
    public List<SupplyTypeDto> getSupplyTypes() {
        return supplyTypeService.getSupplyTypeDtoList();
    }

    @GetMapping("/{id}")
    public SupplyTypeDto getSupplyType(@PathVariable Long id) {
        return supplyTypeService.getSupplyTypeDto(id);
    }
}
