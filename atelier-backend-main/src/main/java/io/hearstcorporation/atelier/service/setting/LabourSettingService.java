package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.setting.LabourHourlyRateRequestDto;
import io.hearstcorporation.atelier.dto.model.setting.LabourSettingCostRequestDto;
import io.hearstcorporation.atelier.dto.model.setting.LabourSettingDto;
import io.hearstcorporation.atelier.model.setting.LabourSetting;

import java.util.Optional;

public interface LabourSettingService {

    LabourSettingDto updateHourlyRate(LabourHourlyRateRequestDto hourlyRateRequestDto);

    LabourSettingDto updateSettingCost(LabourSettingCostRequestDto labourSettingCostRequestDto);

    LabourSettingDto getLabourSettingDto();

    LabourSetting getLabourSetting();

    Optional<LabourSetting> findLabourSetting();
}
