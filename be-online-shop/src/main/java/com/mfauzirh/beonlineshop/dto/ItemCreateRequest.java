package com.mfauzirh.beonlineshop.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ItemCreateRequest {
    @NotBlank(message = "Item name is required")
    @Size(min = 1, max = 255, message = "Item name must be between 1 and 255 characters")
    private String itemName;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock can't be lower than 0")
    private Integer stock;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price can't be lower than 0")
    private Long price;

    @NotNull(message = "Is available can't be empty")
    private Boolean isAvailable;
}
