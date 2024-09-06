package com.mfauzirh.beonlineshop.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerFilterRequest {
    @Nullable
    @PositiveOrZero(message = "Customer id must be positive number")
    private Long customerId;

    @Nullable
    private String customerName;

    @Nullable
    private String customerAddress;

//    @Nullable
//    @Size(min = 1, max = 36, message = "Customer code must be between 1 and 36 characters")
//    private UUID customerCode;

//    @Nullable
//    @Size(min = 1, max = 20, message = "Customer name must be between 1 and 20 characters")
//    private String customerPhone;

    @Nullable
    private String sortBy = "customerName,asc";

    @Nullable
    @PositiveOrZero(message = "Page size must be positive number")
    private Integer pageSize = 10;

    @Nullable
    @PositiveOrZero(message = "Page number must be positive number")
    private Integer pageNumber = 1;
}
