package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.OrderCreateRequest;
import com.mfauzirh.beonlineshop.dto.OrderFilterRequest;
import com.mfauzirh.beonlineshop.dto.OrderPreviewResponse;
import kotlin.Pair;

import java.util.List;

public interface OrderService {
    String createOrder(OrderCreateRequest request);
    Pair<List<OrderPreviewResponse>, Integer> getAllOrders(OrderFilterRequest request);
}
