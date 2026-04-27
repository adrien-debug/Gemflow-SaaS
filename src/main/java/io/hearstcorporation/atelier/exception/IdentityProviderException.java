package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class IdentityProviderException extends ServiceException {

    public IdentityProviderException(String message) {
        super(ErrorCode.IDENTITY_PROVIDER_ERROR, message);
    }

    public IdentityProviderException(String message, Throwable cause) {
        super(ErrorCode.IDENTITY_PROVIDER_ERROR, message, cause);
    }
}
