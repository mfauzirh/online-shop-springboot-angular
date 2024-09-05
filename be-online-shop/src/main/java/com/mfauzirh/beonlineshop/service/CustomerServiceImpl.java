package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.CustomerCreateRequest;
import com.mfauzirh.beonlineshop.dto.CustomerFilterRequest;
import com.mfauzirh.beonlineshop.dto.CustomerResponse;
import com.mfauzirh.beonlineshop.entity.Customer;
import com.mfauzirh.beonlineshop.repository.CustomerRepository;
import com.mfauzirh.beonlineshop.util.MinioUtil;
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
        var customer = new Customer()
                .customerName(request.getCustomerName())
                .customerAddress(request.getCustomerAddress())
                .customerPhone(request.getCustomerPhone());

        if (request.getPic() != null) {
            String timestamp = String.valueOf(Instant.now().toEpochMilli());;
            String fileName = timestamp + "_" + request.getPic().getOriginalFilename();
            minioUtil.uploadImage(request.getPic(), fileName);
            customer.pic(fileName);
        }

        customerRepository.save(customer);

        return "Customer created successfully";
    }

    @Override
    public Pair<List<CustomerResponse>, Integer> getAllCustomers(CustomerFilterRequest request) {
        Pageable pageable = constructPageable(request.getPageNumber(), request.getPageSize(), request.getSortBy());
        Specification<Customer> spec = constructSpecification(request);

        int total = (int) customerRepository.count(spec);
        Page<Customer> customerPage = customerRepository.findAll(spec, pageable);
        List<CustomerResponse> customers = customerPage.getContent()
                .stream()
                    .map(this::convertToCustomerResponse)
                    .toList();
        return new Pair<>(customers, total);
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
            Optional.ofNullable(request.getCustomerPhone())
                    .ifPresent(phoneNumber -> predicates.add(cb.like(cb.lower(root.get("customerPhone")), "%" + phoneNumber.toLowerCase() + "%")));
            //Optional.ofNullable(request.customerCode())
            //        .ifPresent(code -> predicates.add(cb.like(cb.lower(root.get("customerCode")), "%" + code.toLowerCase() + "%")));

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private CustomerResponse convertToCustomerResponse(Customer customer) {
        return  CustomerResponse.builder()
                .customerId(customer.customerId())
                .customerName(customer.customerName())
                .customerAddress(customer.customerAddress())
                .customerCode(customer.customerCode())
                .customerPhone(customer.customerPhone())
                .isActive(customer.isActive())
                .lastOrderDate(customer.lastOrderDate())
                .pic(minioUtil.getImageUrl(customer.pic()))
                .build();
    }
}
