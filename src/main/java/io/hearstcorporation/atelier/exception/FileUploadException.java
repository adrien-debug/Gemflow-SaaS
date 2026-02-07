package io.hearstcorporation.atelier.exception;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;

public class FileUploadException extends ServiceException {

    public FileUploadException(String message) {
        super(ErrorCode.FILE_UPLOAD_ERROR, message);
    }
}
