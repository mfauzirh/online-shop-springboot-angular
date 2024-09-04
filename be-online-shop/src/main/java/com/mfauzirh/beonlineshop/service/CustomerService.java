package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.CustomerCreateRequest;

public interface CustomerService {
    String createCustomer(CustomerCreateRequest request);
}
