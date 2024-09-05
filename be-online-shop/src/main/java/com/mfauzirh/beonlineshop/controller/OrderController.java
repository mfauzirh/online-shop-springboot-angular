package com.mfauzirh.beonlineshop.controller;

import com.mfauzirh.beonlineshop.dto.BaseResponse;
import com.mfauzirh.beonlineshop.dto.OrderCreateRequest;
import com.mfauzirh.beonlineshop.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    
}
