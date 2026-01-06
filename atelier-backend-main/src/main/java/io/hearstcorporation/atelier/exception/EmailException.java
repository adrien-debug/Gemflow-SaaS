package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class EmailException extends ServiceException {

    public EmailException(String message) {
        super(ErrorCode.EMAIL_ERROR, message);
    }
}
