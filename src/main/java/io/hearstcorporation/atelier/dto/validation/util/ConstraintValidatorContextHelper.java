package io.hearstcorporation.atelier.dto.validation.util;

import jakarta.validation.ConstraintValidatorContext;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ConstraintValidatorContextHelper {

    public static void setValidationErrorMessage(String message, ConstraintValidatorContext constraintValidatorContext) {
        constraintValidatorContext.disableDefaultConstraintViolation();
        constraintValidatorContext.buildConstraintViolationWithTemplate(message).addConstraintViolation();
    }
}
