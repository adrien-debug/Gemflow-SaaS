package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class FileDeleteException extends ServiceException {

    public FileDeleteException(String message) {
        super(ErrorCode.FILE_DELETE_ERROR, message);
    }
}
