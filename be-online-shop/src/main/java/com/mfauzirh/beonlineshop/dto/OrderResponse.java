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
public class OrderResponse {
    private Long orderId;
    private UUID orderCode;
    private LocalDateTime orderDate;
    private Long totalPrice;
    private Integer quantity;
    private Long customerId;
    private String customerName;
    private String customerAddress;
    private String customerPic;
    private String customerPhone;
    private Long itemId;
    private String itemName;
    private Integer stock;
    private Long price;
}
