package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.CustomerCreateRequest;
import com.mfauzirh.beonlineshop.dto.CustomerFilterRequest;
import com.mfauzirh.beonlineshop.dto.CustomerResponse;
import kotlin.Pair;

import java.util.List;

public interface CustomerService {
    String createCustomer(CustomerCreateRequest request);
    Pair<List<CustomerResponse>, Integer> getAllCustomers(CustomerFilterRequest request);
}
