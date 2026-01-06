package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class KeycloakException extends ServiceException {

    public KeycloakException(String message) {
        super(ErrorCode.KEYCLOAK_ERROR, message);
    }
}
