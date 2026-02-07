package io.hearstcorporation.atelier.dto.model.error;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ValidationError {

    private ValidationErrorCode errorCode;
    private String field;
    private String message;
    private String developerMessage;
}
