package io.hearstcorporation.atelier.controller.advice;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.dto.model.error.ErrorDescription;
import io.hearstcorporation.atelier.dto.model.error.ValidationError;
import io.hearstcorporation.atelier.dto.model.error.ValidationErrorCode;
import io.hearstcorporation.atelier.exception.AlreadyExistsException;
import io.hearstcorporation.atelier.exception.CannotDeleteException;
import io.hearstcorporation.atelier.exception.EmailException;
import io.hearstcorporation.atelier.exception.FileDeleteException;
import io.hearstcorporation.atelier.exception.FileUploadException;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.exception.IncorrectPasswordException;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.KeycloakException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.exception.ServiceException;
import io.hearstcorporation.atelier.exception.TokenExpiredException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthenticationException.class)
    public ErrorDescription handleAuthenticationException(final AuthenticationException ex) {
        log.error("Authentication exception", ex);
        return generateErrorDescription(ex, ErrorCode.UNAUTHORIZED);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccessDeniedException.class)
    public ErrorDescription handleAccessDeniedException(final AccessDeniedException ex) {
        log.error("Access denied exception", ex);
        return generateErrorDescription(ex, ErrorCode.ACCESS_DENIED);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoResourceFoundException.class)
    public ErrorDescription handleNoResourceFoundException(final NoResourceFoundException ex) {
        log.error("No resource found exception", ex);
        return generateErrorDescription(ex, ErrorCode.NO_RESOURCE_FOUND);
    }

    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ErrorDescription handleHttpRequestMethodNotSupportedException(final HttpRequestMethodNotSupportedException ex) {
        log.error("No resource found exception", ex);
        return generateErrorDescription(ex, ErrorCode.METHOD_NOT_ALLOWED);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(TokenExpiredException.class)
    public ErrorDescription handleTokenExpiredException(final TokenExpiredException ex) {
        log.error("Token expired exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(IncorrectPasswordException.class)
    public ErrorDescription handleIncorrectPasswordException(final IncorrectPasswordException ex) {
        log.error("Incorrect password exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ErrorDescription handleHttpMessageNotReadableException(final HttpMessageNotReadableException ex) {
        log.error("Http message not readable exception", ex);
        ErrorCode errorCode = ErrorCode.INVALID_REQUEST;
        if (ex.getCause() instanceof InvalidFormatException) {
            errorCode = ErrorCode.INVALID_PARAMETERS;
        }
        return generateErrorDescription(ex, errorCode);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ErrorDescription handleMissingServletRequestParameterException(final MissingServletRequestParameterException ex) {
        log.error("Missing servlet request parameter exception", ex);
        return generateErrorDescription(ex, ErrorCode.INVALID_PARAMETERS);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ErrorDescription handleMaxUploadSizeExceededException(final MaxUploadSizeExceededException ex) {
        log.error("Max upload size exceeded exception", ex);
        return generateErrorDescription(ex, ErrorCode.INVALID_PARAMETERS);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ErrorDescription handleMethodArgumentTypeMismatchException(final MethodArgumentTypeMismatchException ex) {
        log.error("Method argument type mismatch exception", ex);
        return generateErrorDescription(ex, ErrorCode.INVALID_PARAMETERS);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorDescription handleMethodArgumentNotValidException(final MethodArgumentNotValidException ex) {
        log.error("Method argument not valid exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(AlreadyExistsException.class)
    public ErrorDescription handleAlreadyExistsException(final AlreadyExistsException ex) {
        log.error("Already exists exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CannotDeleteException.class)
    public ErrorDescription handleCannotDeleteException(final CannotDeleteException ex) {
        log.error("Cannot delete exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidDataException.class)
    public ErrorDescription handleInvalidDataException(final InvalidDataException ex) {
        log.error("Invalid data exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalStateException.class)
    public ErrorDescription handleIllegalStateException(final IllegalStateException ex) {
        log.error("Illegal state exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public ErrorDescription handleNotFoundException(final NotFoundException ex) {
        log.error("Not found exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(FileUploadException.class)
    public ErrorDescription handleFileUploadException(final FileUploadException ex) {
        log.error("File upload exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(FileDeleteException.class)
    public ErrorDescription handleFileDeleteException(final FileDeleteException ex) {
        log.error("File delete exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(EmailException.class)
    public ErrorDescription handleEmailException(final EmailException ex) {
        log.error("Email exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(KeycloakException.class)
    public ErrorDescription handleKeycloakException(final KeycloakException ex) {
        log.error("Keycloak exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ServiceException.class)
    public ErrorDescription handleUnexpectedServiceException(final ServiceException ex) {
        log.error("Service exception", ex);
        return generateErrorDescription(ex);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorDescription handleUnexpectedException(final Exception ex) {
        log.error("Exception", ex);
        return generateErrorDescription(ex, ErrorCode.INTERNAL_SERVER_ERROR);
    }

    private ErrorDescription generateErrorDescription(final ServiceException ex) {
        return ErrorDescription.builder()
                .errorCode(ex.getErrorCode())
                .message(ex.getErrorCode().getMessage())
                .developerMessage(ex.getMessage())
                .timestamp(Instant.now())
                .build();
    }

    private ErrorDescription generateErrorDescription(final Exception ex, final ErrorCode errorCode) {
        return ErrorDescription.builder()
                .errorCode(errorCode)
                .message(errorCode.getMessage())
                .developerMessage(ex.getMessage())
                .timestamp(Instant.now())
                .build();
    }

    private ErrorDescription generateErrorDescription(final MethodArgumentNotValidException ex) {
        List<ValidationError> validationErrors = new ArrayList<>(toFieldValidationErrors(ex.getFieldErrors()));
        validationErrors.addAll(toValidationErrors(ex.getGlobalErrors()));
        return ErrorDescription.builder()
                .errorCode(ErrorCode.INVALID_PARAMETERS)
                .message(ErrorCode.INVALID_PARAMETERS.getMessage())
                .developerMessage(ex.getMessage())
                .timestamp(Instant.now())
                .validationErrors(validationErrors)
                .build();
    }

    private List<ValidationError> toFieldValidationErrors(final List<FieldError> fieldErrors) {
        return fieldErrors.stream()
                .map(fieldError -> ValidationError.builder()
                        .errorCode(ValidationErrorCode.INVALID_PARAMETER)
                        .message(ValidationErrorCode.INVALID_PARAMETER.getMessage())
                        .developerMessage(fieldError.getDefaultMessage())
                        .field(fieldError.getField())
                        .build())
                .toList();
    }

    private List<ValidationError> toValidationErrors(final List<ObjectError> globalErrors) {
        return globalErrors.stream()
                .map(globalError -> ValidationError.builder()
                        .errorCode(ValidationErrorCode.INVALID_REQUEST)
                        .message(ValidationErrorCode.INVALID_REQUEST.getMessage())
                        .developerMessage(globalError.getDefaultMessage())
                        .build())
                .toList();
    }
}
