package io.hearstcorporation.atelier.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Priority {

    LOW("Low"),
    NORM("Norm"),
    HIGH("High"),
    TOP("Top");

    private final String description;
}
