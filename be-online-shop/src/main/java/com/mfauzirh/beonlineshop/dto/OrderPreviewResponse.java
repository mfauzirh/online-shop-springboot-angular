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
public class OrderPreviewResponse {
    private Long orderId;
    private UUID orderCode;
    private LocalDateTime orderDate;
    private Long totalPrice;
    private Integer quantity;
    private String customerName;
    private String itemName;
}
