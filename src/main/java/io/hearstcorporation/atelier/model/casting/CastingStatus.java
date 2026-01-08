package io.hearstcorporation.atelier.model.casting;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CastingStatus {

    OPEN("Open"),
    FINISHED("Finished"),
    REJECTED("Rejected");

    private final String description;
}
