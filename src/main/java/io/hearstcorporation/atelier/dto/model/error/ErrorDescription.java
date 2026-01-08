package io.hearstcorporation.atelier.dto.model.error;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Getter
@Builder
public class ErrorDescription {

    private ErrorCode errorCode;
    private String message;
    private String developerMessage;
    private Instant timestamp;
    private List<ValidationError> validationErrors;
}
