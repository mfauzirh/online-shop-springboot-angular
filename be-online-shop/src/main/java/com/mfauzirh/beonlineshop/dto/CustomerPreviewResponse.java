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
public class CustomerPreviewResponse {
    private Long customerId;
    private String customerName;
    private String customerAddress;
    private UUID customerCode = UUID.randomUUID();
}
