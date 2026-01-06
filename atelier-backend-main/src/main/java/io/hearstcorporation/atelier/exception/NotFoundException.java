package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class NotFoundException extends ServiceException {

    public NotFoundException(String message) {
        super(ErrorCode.NOT_FOUND, message);
    }
}
