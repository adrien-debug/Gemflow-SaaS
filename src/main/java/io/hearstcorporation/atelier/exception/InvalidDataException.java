package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class InvalidDataException extends ServiceException {

    public InvalidDataException(String message) {
        super(ErrorCode.INVALID_DATA, message);
    }

    public InvalidDataException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
