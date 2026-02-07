package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class AlreadyExistsException extends ServiceException {

    public AlreadyExistsException(String message) {
        super(ErrorCode.ALREADY_EXISTS, message);
    }
}
