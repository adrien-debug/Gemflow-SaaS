package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class CannotDeleteException extends ServiceException {

    public CannotDeleteException(String message) {
        super(ErrorCode.CANNOT_DELETE, message);
    }

    public CannotDeleteException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
