package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.LabourSettingMapper;
import io.hearstcorporation.atelier.dto.model.setting.LabourHourlyRateRequestDto;
import io.hearstcorporation.atelier.dto.model.setting.LabourSettingCostRequestDto;
import io.hearstcorporation.atelier.dto.model.setting.LabourSettingDto;
import io.hearstcorporation.atelier.exception.ServiceException;
import io.hearstcorporation.atelier.model.setting.LabourSetting;
import io.hearstcorporation.atelier.repository.setting.LabourSettingRepository;
import io.hearstcorporation.atelier.service.setting.LabourSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LabourSettingServiceImpl implements LabourSettingService {

    private final LabourSettingRepository labourSettingRepository;

    @Override
    @Transactional
    public LabourSettingDto updateHourlyRate(LabourHourlyRateRequestDto hourlyRateRequestDto) {
        LabourSetting labourSetting = getLabourSetting();
        LabourSettingMapper.mapLabourSetting(labourSetting, hourlyRateRequestDto);
        return LabourSettingMapper.toLabourSettingDto(labourSettingRepository.save(labourSetting));
    }

    @Override
    @Transactional
    public LabourSettingDto updateSettingCost(LabourSettingCostRequestDto labourSettingCostRequestDto) {
        LabourSetting labourSetting = getLabourSetting();
        LabourSettingMapper.mapLabourSetting(labourSetting, labourSettingCostRequestDto);
        return LabourSettingMapper.toLabourSettingDto(labourSettingRepository.save(labourSetting));
    }

    @Override
    public LabourSettingDto getLabourSettingDto() {
        return LabourSettingMapper.toLabourSettingDto(getLabourSetting());
    }

    @Override
    public LabourSetting getLabourSetting() {
        return findLabourSetting().orElseGet(LabourSetting::new);
    }

    @Override
    public Optional<LabourSetting> findLabourSetting() {
        Page<LabourSetting> labourSettingPage = labourSettingRepository.findAll(Pageable.ofSize(2));
        List<LabourSetting> labourSettings = labourSettingPage.getContent();
        if (labourSettings.isEmpty()) {
            return Optional.empty();
        }
        if (labourSettingPage.getTotalElements() > 1) {
            throw new ServiceException("More than one labour setting exists.");
        }
        return Optional.of(labourSettings.getFirst());
    }
}
