package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import lombok.Getter;
import org.springframework.core.NestedRuntimeException;

@Getter
public class ServiceException extends NestedRuntimeException {

    private ErrorCode errorCode = ErrorCode.INTERNAL_SERVER_ERROR;

    public ServiceException(String message) {
        super(message);
    }

    public ServiceException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public ServiceException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public ServiceException(ErrorCode errorCode, String msg, Throwable cause) {
        super(msg, cause);
        this.errorCode = errorCode;
    }
}
