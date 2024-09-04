package com.mfauzirh.beonlineshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
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
