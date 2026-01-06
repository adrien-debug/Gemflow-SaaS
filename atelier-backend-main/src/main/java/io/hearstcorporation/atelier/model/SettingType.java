package io.hearstcorporation.atelier.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SettingType {

    CUT_DOWN_PAVE("Cut-down pavé"),
    CLAW("Claw"),
    CENTER("Center"),
    SHOULDER("Shoulder"),
    RUBOVER("Rubover"),
    CHANNEL("Channel");

    private final String description;
}
