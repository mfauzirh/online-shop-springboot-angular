package com.mfauzirh.beonlineshop.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {
    private String pattern;

    @Override
    public void initialize(PhoneNumber constraintAnnotation) {
        this.pattern = constraintAnnotation.pattern();
    }

    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
        if(phoneNumber == null || phoneNumber.isEmpty()) { return true; } // Assume handle by other validator if empty

        return phoneNumber.matches(pattern);
    }
}
