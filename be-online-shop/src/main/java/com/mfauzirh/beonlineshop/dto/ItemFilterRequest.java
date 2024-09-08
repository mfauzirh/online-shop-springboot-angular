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
public class ItemFilterRequest {
    @Nullable
    @PositiveOrZero(message = "Item id must be positive number")
    private Long itemId;

    @Nullable
    private String itemName;

    @Nullable
    private String stock;

    @Nullable
    private String price;

    @Nullable
    private Boolean isAvailable;

    @Nullable
    private String sortBy = "itemName,asc";

    @Nullable
    @PositiveOrZero(message = "Page size must be positive number")
    private Integer pageSize = 10;

    @Nullable
    @PositiveOrZero(message = "Page number must be positive number")
    private Integer pageNumber = 1;

//    @Nullable
//    @Size(min = 1, max = 36, message = "Customer code must be between 1 and 36 characters")
//    private UUID itemCode;
}
