package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.CustomerCreateRequest;
import com.mfauzirh.beonlineshop.entity.Customer;
import com.mfauzirh.beonlineshop.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public String createCustomer(CustomerCreateRequest request) {
        var customer = new Customer()
                .customerName(request.getCustomerName())
                .customerAddress(request.getCustomerAddress())
                .customerPhone(request.getCustomerPhone());

        // Todo Upload MinIO
        customer.pic("example.png");

        customerRepository.save(customer);

        return "Customer created successfully";
    }
}
