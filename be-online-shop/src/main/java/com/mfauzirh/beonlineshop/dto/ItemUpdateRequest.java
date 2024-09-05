package com.mfauzirh.beonlineshop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemUpdateRequest {
    @NotBlank(message = "Item name is required")
    @Size(min = 1, max = 255, message = "Item name must be between 1 and 255 characters")
    private String itemName;

    @Min(value = 0, message = "Stock can't be lower than 0")
    private Integer stock;

    @Min(value = 0, message = "Price can't be lower than 0")
    private Long price;

    @NotNull(message = "Is available can't be empty")
    private Boolean isAvailable;
}
