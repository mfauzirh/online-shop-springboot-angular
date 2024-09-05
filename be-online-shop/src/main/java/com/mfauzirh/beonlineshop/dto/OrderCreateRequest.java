package com.mfauzirh.beonlineshop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderCreateRequest {
    @NotNull(message = "Customer id is required")
    @PositiveOrZero(message = "Customer id can't be lower than 0")
    private Long customerId;

    @NotNull(message = "Item id is required")
    @PositiveOrZero(message = "Customer id can't be lower than 0")
    private Long itemId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity can't be lower than 1")
    private Integer quantity;
}
