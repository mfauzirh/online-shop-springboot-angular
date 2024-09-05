package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.OrderCreateRequest;
import com.mfauzirh.beonlineshop.entity.Customer;
import com.mfauzirh.beonlineshop.entity.Item;
import com.mfauzirh.beonlineshop.entity.Order;
import com.mfauzirh.beonlineshop.exception.InsufficientStockException;
import com.mfauzirh.beonlineshop.repository.CustomerRepository;
import com.mfauzirh.beonlineshop.repository.ItemRepository;
import com.mfauzirh.beonlineshop.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            CustomerRepository customerRepository,
            ItemRepository itemRepository
    ) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    @Transactional
    public String createOrder(OrderCreateRequest request) {
        Customer customer = customerRepository.findByCustomerIdAndIsActiveTrue(request.getCustomerId())
                .orElseThrow(() -> new EntityNotFoundException("Customer with id " + request.getCustomerId() + " is not exist"));

        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new EntityNotFoundException("Item with id " + request.getItemId() + " is not exist"));

        if (item.getStock() < request.getQuantity()) {
            throw new InsufficientStockException("Insufficient stock for the item");
        }

        customer.setLastOrderDate(LocalDateTime.now());
        customerRepository.save(customer);

        item.setStock(item.getStock() - request.getQuantity());
        itemRepository.save(item);

        Order order = Order.builder()
                .orderCode(UUID.randomUUID())
                .orderDate(LocalDateTime.now())
                .totalPrice(item.getPrice() * request.getQuantity())
                .quantity(request.getQuantity())
                .customer(customer)
                .item(item)
                .build();

        orderRepository.save(order);

        return "Order successfully created";
    }
}
