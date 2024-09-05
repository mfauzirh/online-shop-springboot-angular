package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.ItemFilterRequest;
import com.mfauzirh.beonlineshop.dto.OrderCreateRequest;
import com.mfauzirh.beonlineshop.dto.OrderFilterRequest;
import com.mfauzirh.beonlineshop.dto.OrderPreviewResponse;
import com.mfauzirh.beonlineshop.entity.Customer;
import com.mfauzirh.beonlineshop.entity.Item;
import com.mfauzirh.beonlineshop.entity.Order;
import com.mfauzirh.beonlineshop.exception.InsufficientStockException;
import com.mfauzirh.beonlineshop.repository.CustomerRepository;
import com.mfauzirh.beonlineshop.repository.ItemRepository;
import com.mfauzirh.beonlineshop.repository.OrderRepository;
import com.mfauzirh.beonlineshop.util.PageableUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import kotlin.Pair;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;
    private final PageableUtil pageableUtil;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            CustomerRepository customerRepository,
            ItemRepository itemRepository,
            PageableUtil pageableUtil
    ) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.itemRepository = itemRepository;
        this.pageableUtil = pageableUtil;
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

    @Override
    public Pair<List<OrderPreviewResponse>, Integer> getAllOrders(OrderFilterRequest request) {
        Pageable pageable = pageableUtil.constructPageable(request.getPageNumber(), request.getPageSize(), request.getSortBy());
        Specification<Order> spec = constructSpecification(request);

        int total = (int) orderRepository.count(spec);
        Page<Order> orderPage = orderRepository.findAll(spec, pageable);
        List<OrderPreviewResponse> orders = orderPage.getContent()
                .stream()
                .map(this::convertToOrderPreviewResponse)
                .toList();
        return new Pair<>(orders, total);
    }

    private Specification<Order> constructSpecification(OrderFilterRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            Optional.ofNullable(request.getCustomerName())
                    .ifPresent(name -> predicates.add(cb.like(cb.lower(root.get("customer").get("customerName")), "%" + name.toLowerCase() + "%")));
            Optional.ofNullable(request.getItemName())
                    .ifPresent(name -> predicates.add(cb.like(cb.lower(root.get("item").get("itemName")), "%" + name.toLowerCase() + "%")));

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private OrderPreviewResponse convertToOrderPreviewResponse(Order order) {
        return OrderPreviewResponse.builder()
                .orderId(order.getOrderId())
                .orderCode(order.getOrderCode())
                .orderDate(order.getOrderDate())
                .totalPrice(order.getTotalPrice())
                .quantity(order.getQuantity())
                .customerName(order.getCustomer().getCustomerName())
                .itemName(order.getItem().getItemName())
                .build();
    }
}
