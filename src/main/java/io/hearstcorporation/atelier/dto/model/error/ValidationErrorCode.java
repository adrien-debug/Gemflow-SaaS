package io.hearstcorporation.atelier.dto.model.error;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ValidationErrorCode {

    INVALID_PARAMETER("Specified parameter is incorrect."),
    INVALID_REQUEST("Specified request is incorrect.");

    private final String message;

    @JsonValue
    private String getCode() {
        return this.name();
    }

}
