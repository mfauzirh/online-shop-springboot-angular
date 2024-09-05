package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.OrderCreateRequest;
import com.mfauzirh.beonlineshop.dto.OrderFilterRequest;
import com.mfauzirh.beonlineshop.dto.OrderPreviewResponse;
import com.mfauzirh.beonlineshop.dto.OrderResponse;
import kotlin.Pair;

import java.util.List;

public interface OrderService {
    String createOrder(OrderCreateRequest request);
    Pair<List<OrderPreviewResponse>, Integer> getAllOrders(OrderFilterRequest request);
    OrderResponse getOrderById(long orderId);
}
