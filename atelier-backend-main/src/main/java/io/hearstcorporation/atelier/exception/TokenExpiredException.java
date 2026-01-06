package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import lombok.Getter;

import java.util.UUID;

@Getter
public class TokenExpiredException extends ServiceException {

    private final UUID tokenValue;

    public TokenExpiredException(UUID tokenValue) {
        super(ErrorCode.TOKEN_EXPIRED, "Token expired");
        this.tokenValue = tokenValue;
    }
}
