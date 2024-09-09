package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.*;
import kotlin.Pair;

import java.util.List;

public interface OrderService {
    String createOrder(OrderCreateRequest request);
    Pair<List<OrderPreviewResponse>, Integer> getAllOrders(OrderFilterRequest request);
    OrderResponse getOrderById(long orderId);
    String updateOrder(long orderId, OrderUpdateRequest request);
    String deleteOrder(long orderId);
    byte[] generateOrderReport();
}
