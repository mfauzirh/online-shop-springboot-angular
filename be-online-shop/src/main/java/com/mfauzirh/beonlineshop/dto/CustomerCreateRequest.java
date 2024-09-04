package com.mfauzirh.beonlineshop.dto;

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
    private String customerPhone;

    @Nullable
    // To do make file extension anotation
    private MultipartFile pic;
}
