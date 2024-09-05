package com.mfauzirh.beonlineshop.dto;

import com.mfauzirh.beonlineshop.validator.FileExtension;
import com.mfauzirh.beonlineshop.validator.FileSize;
import com.mfauzirh.beonlineshop.validator.PhoneNumber;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class CustomerCreateRequest {
    @NotBlank(message = "Customer name is required")
    @Size(min = 1, max = 255, message = "Customer name must be between 1 and 255 characters")
    private String customerName;

    @NotBlank(message = "Customer address is required")
    private String customerAddress;

    @NotBlank(message = "Customer phone is required")
    @PhoneNumber
    private String customerPhone;

    @Nullable
    @FileExtension(extensions = {"jpg", "jpeg", "png"}, message = "Only .jpg, .jpeg, and .png files are allowed")
    @FileSize(max = 2, message = "File size must not exceed 1 MB")
    private MultipartFile pic;
}
