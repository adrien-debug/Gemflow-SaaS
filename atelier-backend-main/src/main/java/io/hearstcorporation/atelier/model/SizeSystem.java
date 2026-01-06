package io.hearstcorporation.atelier.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SizeSystem {

    EUROPEAN("European"),
    BRITISH("British");

    private final String description;
}
