package com.mfauzirh.beonlineshop.dto;

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
public class ItemPreviewResponse {
    private Long itemId;
    private String itemName;
    private Integer stock;
    private Long price;
    private Boolean isAvailable;
}
