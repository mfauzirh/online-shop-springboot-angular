package com.mfauzirh.beonlineshop.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderFilterRequest {
    @Nullable
    @Size(min = 1, max = 255, message = "Customer name must be between 1 and 255 characters")
    private String customerName;

    @Nullable
    @Size(min = 1, max = 255, message = "Item name must be between 1 and 255 characters")
    private String itemName;

    @Nullable
    private String sortBy = "orderDate,desc";

    @Nullable
    @PositiveOrZero(message = "Page size must be positive number")
    private Integer pageSize = 10;

    @Nullable
    @PositiveOrZero(message = "Page number must be positive number")
    private Integer pageNumber = 1;
}
