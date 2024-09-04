package com.mfauzirh.beonlineshop.controller;

import com.mfauzirh.beonlineshop.dto.BaseResponse;
import com.mfauzirh.beonlineshop.dto.CustomerCreateRequest;
import com.mfauzirh.beonlineshop.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<BaseResponse<String>> createCustomer(
            @Valid @ModelAttribute CustomerCreateRequest request
    ) {
        String result = customerService.createCustomer(request);
        return ResponseEntity.ok(new BaseResponse<>(result, HttpStatus.OK));
    }
}
