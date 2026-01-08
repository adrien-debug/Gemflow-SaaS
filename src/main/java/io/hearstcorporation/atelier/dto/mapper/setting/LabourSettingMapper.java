package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.LabourHourlyRateRequestDto;
import io.hearstcorporation.atelier.dto.model.setting.LabourSettingCostRequestDto;
import io.hearstcorporation.atelier.dto.model.setting.LabourSettingDto;
import io.hearstcorporation.atelier.model.setting.LabourSetting;
import lombok.experimental.UtilityClass;

@UtilityClass
public class LabourSettingMapper {

    public static LabourSettingDto toLabourSettingDto(LabourSetting entity) {
        if (entity == null) {
            return null;
        }
        return LabourSettingDto.builder()
                .hourlyRate(entity.getHourlyRate())
                .cutDownPaveCost(entity.getCutDownPaveCost())
                .clawCost(entity.getClawCost())
                .centerCost(entity.getCenterCost())
                .shoulderCost(entity.getShoulderCost())
                .ruboverCost(entity.getRuboverCost())
                .channelCost(entity.getChannelCost())
                .build();
    }

    public static void mapLabourSetting(LabourSetting entity, LabourHourlyRateRequestDto dto) {
        entity.setHourlyRate(dto.getHourlyRate());
    }

    public static void mapLabourSetting(LabourSetting entity, LabourSettingCostRequestDto dto) {
        entity.setCutDownPaveCost(dto.getCutDownPaveCost());
        entity.setClawCost(dto.getClawCost());
        entity.setCenterCost(dto.getCenterCost());
        entity.setShoulderCost(dto.getShoulderCost());
        entity.setRuboverCost(dto.getRuboverCost());
        entity.setChannelCost(dto.getChannelCost());
    }
}
