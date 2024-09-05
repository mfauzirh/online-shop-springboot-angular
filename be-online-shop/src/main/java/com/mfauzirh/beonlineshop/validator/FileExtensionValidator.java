package com.mfauzirh.beonlineshop.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

public class FileExtensionValidator implements ConstraintValidator<FileExtension, MultipartFile> {
    private List<String> allowedExtensions;

    @Override
    public void initialize(FileExtension constraintAnnotation) {
        this.allowedExtensions = Arrays.asList(constraintAnnotation.extensions());
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext constraintValidatorContext) {
        if(file == null || file.isEmpty()) { return true; }; // Empty file handle by other annotation

        String fileName = file.getOriginalFilename();
        if (fileName == null) { return false; } // File doesn't have filename or extension

        String extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        return allowedExtensions.contains(extension);
    }
}
