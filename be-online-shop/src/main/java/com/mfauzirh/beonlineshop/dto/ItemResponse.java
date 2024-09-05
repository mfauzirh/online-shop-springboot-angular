package com.mfauzirh.beonlineshop.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {
    private Long itemId;
    private String itemName;
    private UUID itemCode;
    private Integer stock;
    private Long price;
    private Boolean isAvailable;
    private LocalDateTime lastReStock;
}
