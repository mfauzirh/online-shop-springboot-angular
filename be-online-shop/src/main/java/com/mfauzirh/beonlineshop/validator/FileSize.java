package com.mfauzirh.beonlineshop.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = FileSizeValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface FileSize {
    String message() default "File size exceeds the maximum limit";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    int max() default 2; // Default max 2 MB
}
