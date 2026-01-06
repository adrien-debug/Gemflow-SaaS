package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.LabourHourlyRateRequestDto;
import io.hearstcorporation.atelier.dto.model.setting.LabourSettingCostRequestDto;
import io.hearstcorporation.atelier.dto.model.setting.LabourSettingDto;
import io.hearstcorporation.atelier.service.setting.LabourSettingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.setting.LabourSettingController.BASE_URL;


@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class LabourSettingController {

    public static final String BASE_URL = "/api/v1/settings/labours";
    public static final String HOURLY_RATE = "/hourly-rate";
    public static final String COSTS = "/costs";

    private final LabourSettingService labourSettingService;

    @GetMapping
    public LabourSettingDto getLabourSettings() {
        return labourSettingService.getLabourSettingDto();
    }

    @PutMapping(HOURLY_RATE)
    public LabourSettingDto updateHourlyRate(@RequestBody @Valid LabourHourlyRateRequestDto hourlyRateRequestDto) {
        return labourSettingService.updateHourlyRate(hourlyRateRequestDto);
    }

    @PutMapping(COSTS)
    public LabourSettingDto updateSettingCost(@RequestBody @Valid LabourSettingCostRequestDto labourSettingCostRequestDto) {
        return labourSettingService.updateSettingCost(labourSettingCostRequestDto);
    }
}
