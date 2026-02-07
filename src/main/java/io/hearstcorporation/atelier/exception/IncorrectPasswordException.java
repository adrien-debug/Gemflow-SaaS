package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class IncorrectPasswordException extends ServiceException {

    public IncorrectPasswordException() {
        super(ErrorCode.INCORRECT_PASSWORD, "The password is incorrect.");
    }
}
