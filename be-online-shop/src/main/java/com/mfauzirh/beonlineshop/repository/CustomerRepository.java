package com.mfauzirh.beonlineshop.repository;

import com.mfauzirh.beonlineshop.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
