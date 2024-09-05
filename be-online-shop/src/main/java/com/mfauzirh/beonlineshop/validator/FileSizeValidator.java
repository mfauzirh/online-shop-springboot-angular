package com.mfauzirh.beonlineshop.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class FileSizeValidator implements ConstraintValidator<FileSize, MultipartFile> {
    private long maxSizeInBytes;

    @Override
    public void initialize(FileSize constraintAnnotation) {
        int maxInMB = constraintAnnotation.max();
        this.maxSizeInBytes = maxInMB * 1024L * 1024L; // Convert MB to bytes
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if(file == null || file.isEmpty()) { return true; } // Assume handled by other validator if empty

        return file.getSize() <= maxSizeInBytes;
    }
}
