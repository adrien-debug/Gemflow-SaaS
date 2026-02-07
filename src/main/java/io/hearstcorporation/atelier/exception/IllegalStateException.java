package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class IllegalStateException extends ServiceException {

    public IllegalStateException(String message) {
        super(ErrorCode.ILLEGAL_STATE, message);
    }

    public IllegalStateException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
