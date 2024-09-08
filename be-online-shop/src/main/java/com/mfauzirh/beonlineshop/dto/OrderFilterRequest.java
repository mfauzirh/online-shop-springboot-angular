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
    private String customerName;

    @Nullable
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
