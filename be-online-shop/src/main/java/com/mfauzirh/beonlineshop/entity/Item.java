package com.mfauzirh.beonlineshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name", nullable = false, length = 255)
    private String itemName;

    @Column(name = "item_code", nullable = false, unique = true, length = 36)
    private UUID itemCode;

    @Column(name = "stock")
    @Min(value = 0, message = "Stock can't be lower than 0")
    private Integer stock;

    @Column(name = "price")
    @Min(value = 0, message = "Price can't be lower than 0")
    private Long price;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable;

    @Column(name = "last_re_stock")
    private LocalDateTime lastReStock;

    @JsonIgnore
    @OneToMany(
            mappedBy = "item",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<Order> orders;
}
