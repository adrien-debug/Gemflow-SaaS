package io.hearstcorporation.atelier.dto.validation;

import io.hearstcorporation.atelier.dto.validation.validator.ImageListValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ImageListValidator.class)
@Target({ElementType.FIELD, ElementType.TYPE_USE})
@ReportAsSingleViolation
public @interface ImageList {

    String message() default "Invalid image list";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
