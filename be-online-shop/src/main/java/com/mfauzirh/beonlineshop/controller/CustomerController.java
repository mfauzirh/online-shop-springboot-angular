package com.mfauzirh.beonlineshop.controller;

import com.mfauzirh.beonlineshop.dto.BaseResponse;
import com.mfauzirh.beonlineshop.dto.CustomerCreateRequest;
import com.mfauzirh.beonlineshop.dto.CustomerFilterRequest;
import com.mfauzirh.beonlineshop.dto.CustomerResponse;
import com.mfauzirh.beonlineshop.service.CustomerService;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import kotlin.Pair;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@Slf4j
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

    @GetMapping
    public ResponseEntity<BaseResponse<List<CustomerResponse>>> getAllCustomers(
            @Valid @Nullable @ModelAttribute CustomerFilterRequest filter
    ) {
        Pair<List<CustomerResponse>, Integer> pair = customerService.getAllCustomers(filter);

        return ResponseEntity.ok(
                new BaseResponse<>(pair.getFirst(), "Success retrieve customer datas", HttpStatus.OK, pair.getSecond())
        );
    }
}
