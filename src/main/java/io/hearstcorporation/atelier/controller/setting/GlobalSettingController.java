package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.GlobalSettingDto;
import io.hearstcorporation.atelier.service.setting.GlobalSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.setting.GlobalSettingController.BASE_URL;


@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class GlobalSettingController {

    public static final String BASE_URL = "/api/v1/settings/global";

    private final GlobalSettingService globalSettingService;

    @GetMapping
    public GlobalSettingDto getGlobalSetting() {
        return globalSettingService.getGlobalSetting();
    }
}
