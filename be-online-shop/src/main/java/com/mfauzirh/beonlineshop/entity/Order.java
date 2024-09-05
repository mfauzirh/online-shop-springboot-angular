package com.mfauzirh.beonlineshop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "order_code", nullable = false, length = 36)
    private UUID orderCode;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "total_price", nullable = false)
    @Min(value = 0, message = "Total price can't be lower than 0")
    private Long totalPrice;

    @Column(name = "quantity", nullable = false)
    @Min(value = 1, message = "Quantity can't be lower than 1")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
}
