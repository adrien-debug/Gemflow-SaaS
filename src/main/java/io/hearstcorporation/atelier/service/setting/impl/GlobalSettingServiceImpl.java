package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.config.frontend.property.FrontendProperties;
import io.hearstcorporation.atelier.dto.model.setting.GlobalSettingDto;
import io.hearstcorporation.atelier.service.setting.GlobalSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.TextStyle;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class GlobalSettingServiceImpl implements GlobalSettingService {

    private final FrontendProperties frontendProperties;

    @Override
    public GlobalSettingDto getGlobalSetting() {
        return new GlobalSettingDto(frontendProperties.getTimezone().getDisplayName(TextStyle.NARROW, Locale.US));
    }
}
