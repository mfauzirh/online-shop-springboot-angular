package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.OrderCreateRequest;

public interface OrderService {
    String createOrder(OrderCreateRequest request);
}
