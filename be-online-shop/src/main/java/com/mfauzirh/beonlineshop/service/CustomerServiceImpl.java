package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.*;
import com.mfauzirh.beonlineshop.entity.Customer;
import com.mfauzirh.beonlineshop.repository.CustomerRepository;
import com.mfauzirh.beonlineshop.util.MinioUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import kotlin.Pair;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        var customer = Customer.builder()
                .customerName(request.getCustomerName())
                .customerAddress(request.getCustomerAddress())
                .customerPhone(request.getCustomerPhone())
                .build();

        if (request.getPic() != null) {
            String timestamp = String.valueOf(Instant.now().toEpochMilli());;
            String fileName = timestamp + "_" + request.getPic().getOriginalFilename();
            minioUtil.uploadImage(request.getPic(), fileName);
            customer.setPic(fileName);
        }

        customerRepository.save(customer);

        return "Customer created successfully";
    }

    @Override
    public Pair<List<CustomerPreviewResponse>, Integer> getAllCustomers(CustomerFilterRequest request) {
        Pageable pageable = constructPageable(request.getPageNumber(), request.getPageSize(), request.getSortBy());
        Specification<Customer> spec = constructSpecification(request);

        int total = (int) customerRepository.count(spec);
        Page<Customer> customerPage = customerRepository.findAll(spec, pageable);
        List<CustomerPreviewResponse> customers = customerPage.getContent()
                .stream()
                    .map(this::convertToCustomerPreviewResponse)
                    .toList();
        return new Pair<>(customers, total);
    }

    @Override
    public CustomerResponse getCustomerById(long customerId) {
        Customer customer = customerRepository.findByCustomerIdAndIsActiveTrue(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer with id " + customerId + " is not exists."));
        return convertToCustomerResponse(customer);
    }

    @SneakyThrows
    @Override
    public String updateCustomer(long customerId, CustomerUpdateRequest request) {
        Customer customer = customerRepository.findByCustomerIdAndIsActiveTrue(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer with id " + customerId + " is not exists."));

        if (request.getPic() != null) {
            minioUtil.removeImage(customer.getPic());
            String timestamp = String.valueOf(Instant.now().toEpochMilli());;
            String fileName = timestamp + "_" + request.getPic().getOriginalFilename();
            minioUtil.uploadImage(request.getPic(), fileName);
            customer.setPic(fileName);
        }

        customer.setCustomerName(request.getCustomerName());
        customer.setCustomerAddress(request.getCustomerAddress());
        customer.setCustomerPhone(request.getCustomerPhone());

        customerRepository.save(customer);

        return "Successfully updated customer";
    }

    @Override
    public String deleteCustomer(long customerId) {
        Customer customer = customerRepository.findByCustomerIdAndIsActiveTrue(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer with id " + customerId + " is not exists."));

        customer.setIsActive(false);
        customerRepository.save(customer);

        return "Successfully deleted (soft) customer";
    }

    private Sort extractSortCriteria(String sortBy) {
        String[] sort = sortBy.split(",");
        String field = sort[0];
        String direction = sort.length > 1 ? sort[1] : "asc";

        return Sort.by(direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, field);
    }

    private Pageable constructPageable(Integer pageNumberOpt, Integer pageSizeOpt, String sortByString) {
        int pageNumber = Optional.ofNullable(pageNumberOpt).orElse(1) - 1;
        int pageSize = Optional.ofNullable(pageSizeOpt).orElse(10);
        Sort sortBy = extractSortCriteria(Optional.ofNullable(sortByString).orElse("customerName,asc"));

        return PageRequest.of(
                pageNumber,
                pageSize,
                sortBy
        );
    }

    private Specification<Customer> constructSpecification(CustomerFilterRequest request) {
        log.warn("Customer Id : {}", request.getCustomerId());
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(cb.equal(root.get("isActive"), true));
            Optional.ofNullable(request.getCustomerId())
                    .ifPresent(id -> predicates.add(cb.equal(root.get("customerId"), id)));
            Optional.ofNullable(request.getCustomerName())
                    .ifPresent(name -> predicates.add(cb.like(cb.lower(root.get("customerName")), "%" + name.toLowerCase() + "%")));
            Optional.ofNullable(request.getCustomerAddress())
                    .ifPresent(address -> predicates.add(cb.like(cb.lower(root.get("customerAddress")), "%" + address.toLowerCase() + "%")));
//            Optional.ofNullable(request.getCustomerPhone())
//                    .ifPresent(phoneNumber -> predicates.add(cb.like(cb.lower(root.get("customerPhone")), "%" + phoneNumber.toLowerCase() + "%")));
            //Optional.ofNullable(request.customerCode())
            //        .ifPresent(code -> predicates.add(cb.like(cb.lower(root.get("customerCode")), "%" + code.toLowerCase() + "%")));

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private CustomerPreviewResponse convertToCustomerPreviewResponse(Customer customer) {
        return  CustomerPreviewResponse.builder()
                .customerId(customer.getCustomerId())
                .customerName(customer.getCustomerName())
                .customerAddress(customer.getCustomerAddress())
                .customerCode(customer.getCustomerCode())
                .build();
    }

    private CustomerResponse convertToCustomerResponse(Customer customer) {
        return  CustomerResponse.builder()
                .customerId(customer.getCustomerId())
                .customerName(customer.getCustomerName())
                .customerAddress(customer.getCustomerAddress())
                .customerCode(customer.getCustomerCode())
                .customerPhone(customer.getCustomerPhone())
                .isActive(customer.getIsActive())
                .lastOrderDate(customer.getLastOrderDate())
                .pic(minioUtil.getImageUrl(customer.getPic()))
                .build();
    }
}
