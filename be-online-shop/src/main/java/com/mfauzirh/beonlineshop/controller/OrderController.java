package com.mfauzirh.beonlineshop.controller;

import com.mfauzirh.beonlineshop.dto.*;
import com.mfauzirh.beonlineshop.service.OrderService;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import kotlin.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<BaseResponse<String>> createOrder(
            @Valid @RequestBody OrderCreateRequest request
    ) {
        String result = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(result, HttpStatus.OK));
    }

    @GetMapping
    public ResponseEntity<BaseResponse<List<OrderPreviewResponse>>> getAllOrders(
            @Valid @Nullable @ModelAttribute OrderFilterRequest filter
    ) {
        Pair<List<OrderPreviewResponse>, Integer> pair = orderService.getAllOrders(filter);

        return ResponseEntity.ok(
                new BaseResponse<>(pair.getFirst(), "Success retrieve order datas", HttpStatus.OK, pair.getSecond()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<OrderResponse>> getOrderById(
            @PathVariable @NotNull @PositiveOrZero(message = "Id must greater or equal zero")
            long id
    ) {
        OrderResponse item = orderService.getOrderById(id);

        return ResponseEntity.ok(
                new BaseResponse<>(item, "Success retrieve order data", HttpStatus.OK));
    }
}
