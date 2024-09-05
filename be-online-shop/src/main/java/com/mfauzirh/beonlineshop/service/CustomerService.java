package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.*;
import kotlin.Pair;

import java.util.List;

public interface CustomerService {
    String createCustomer(CustomerCreateRequest request);
    Pair<List<CustomerPreviewResponse>, Integer> getAllCustomers(CustomerFilterRequest request);
    CustomerResponse getCustomerById(long customerId);
    String updateCustomer(long customerId, CustomerUpdateRequest request);
}
