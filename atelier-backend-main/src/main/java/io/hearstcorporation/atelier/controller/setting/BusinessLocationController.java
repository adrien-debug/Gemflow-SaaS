package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.BusinessLocationDto;
import io.hearstcorporation.atelier.service.setting.BusinessLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.BusinessLocationController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class BusinessLocationController {

    public static final String BASE_URL = "/api/v1/settings/business/locations";

    private final BusinessLocationService businessLocationService;

    @GetMapping
    public List<BusinessLocationDto> getBusinessLocations() {
        return businessLocationService.getBusinessLocationDtoList();
    }

    @GetMapping("/{id}")
    public BusinessLocationDto getBusinessLocation(@PathVariable Long id) {
        return businessLocationService.getBusinessLocationDto(id);
    }
}
