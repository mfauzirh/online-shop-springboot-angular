package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.CustomerCreateRequest;
import com.mfauzirh.beonlineshop.entity.Customer;
import com.mfauzirh.beonlineshop.repository.CustomerRepository;
import com.mfauzirh.beonlineshop.util.MinioUtil;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final MinioUtil minioUtil;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, MinioUtil minioUtil) {
        this.customerRepository = customerRepository;
        this.minioUtil = minioUtil;
    }

    @Override
    @SneakyThrows
    public String createCustomer(CustomerCreateRequest request) {
        var customer = new Customer()
                .customerName(request.getCustomerName())
                .customerAddress(request.getCustomerAddress())
                .customerPhone(request.getCustomerPhone());

        if (request.getPic() != null) {
            String timestamp = String.valueOf(Instant.now().toEpochMilli());;
            String fileName = request.getPic().getOriginalFilename() + "_" +timestamp;
            minioUtil.uploadImage(request.getPic(), fileName);
            customer.pic(fileName);
        }

        customer.pic("example.png");

        customerRepository.save(customer);

        return "Customer created successfully";
    }
}
