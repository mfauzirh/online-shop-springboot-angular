package com.mfauzirh.beonlineshop.repository;

import com.mfauzirh.beonlineshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
