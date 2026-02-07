package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.LocationDto;
import io.hearstcorporation.atelier.service.setting.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.LocationController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class LocationController {

    public static final String BASE_URL = "/api/v1/settings/locations";

    private final LocationService locationService;

    @GetMapping
    public List<LocationDto> getLocations() {
        return locationService.getLocationDtoList();
    }

    @GetMapping("/{id}")
    public LocationDto getLocation(@PathVariable Long id) {
        return locationService.getLocationDto(id);
    }
}
