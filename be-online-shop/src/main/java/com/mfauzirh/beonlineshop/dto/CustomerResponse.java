package com.mfauzirh.beonlineshop.dto;

import lombok.*;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerResponse {
    private Long customerId;
    private String customerName;
    private String customerAddress;
    private UUID customerCode = UUID.randomUUID();
    private String customerPhone;
    private Boolean isActive;
    private LocalDateTime lastOrderDate;
    private String pic;
}
