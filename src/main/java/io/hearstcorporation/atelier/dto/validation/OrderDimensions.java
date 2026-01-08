package io.hearstcorporation.atelier.dto.validation;

import io.hearstcorporation.atelier.dto.validation.validator.OrderDimensionsValidator;
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
@Constraint(validatedBy = OrderDimensionsValidator.class)
@Target({ElementType.TYPE})
@ReportAsSingleViolation
public @interface OrderDimensions {

    String message() default "Invalid order dimensions based on item category";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
