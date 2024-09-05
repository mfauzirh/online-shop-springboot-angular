package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.*;
import com.mfauzirh.beonlineshop.entity.Customer;
import com.mfauzirh.beonlineshop.entity.Item;
import com.mfauzirh.beonlineshop.repository.ItemRepository;
import com.mfauzirh.beonlineshop.util.PageableUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import kotlin.Pair;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final PageableUtil pageableUtil;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository, PageableUtil pageableUtil) {
        this.itemRepository = itemRepository;
        this.pageableUtil = pageableUtil;
    }

    @Override
    public String createItem(ItemCreateRequest request) {
        Item item = Item.builder()
                .itemName(request.getItemName())
                .stock(request.getStock())
                .price(request.getPrice())
                .isAvailable(request.getIsAvailable())
                .lastReStock(LocalDateTime.now())
                .itemCode(UUID.randomUUID())
                .build();

        itemRepository.save(item);

        return "Item successfully created";
    }

    @Override
    public Pair<List<ItemPreviewResponse>, Integer> getAllItems(ItemFilterRequest request) {
        Pageable pageable = pageableUtil.constructPageable(request.getPageNumber(), request.getPageSize(), request.getSortBy());
        Specification<Item> spec = constructSpecification(request);

        int total = (int) itemRepository.count(spec);
        Page<Item> itemPage = itemRepository.findAll(spec, pageable);
        List<ItemPreviewResponse> items = itemPage.getContent()
                .stream()
                .map(this::convertToItemPreviewResponse)
                .toList();

        return new Pair<>(items, total);
    }

    @Override
    public ItemResponse getItemById(long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item with id " + itemId + " doesn't exists"));

        return convertToItemResponse(item);
    }

    @Override
    public String updateItem(long itemId, ItemUpdateRequest request) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item with id " + itemId + " doesn't exists"));

        if(!Objects.equals(request.getStock(), item.getStock())) {
            item.setLastReStock(LocalDateTime.now());
        }

        item.setItemName(request.getItemName());
        item.setStock(request.getStock());
        item.setPrice(request.getPrice());
        item.setIsAvailable(request.getIsAvailable());

        itemRepository.save(item);

        return "Item successfully updated.";
    }

    private Specification<Item> constructSpecification(ItemFilterRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            Optional.ofNullable(request.getItemId())
                    .ifPresent(id -> predicates.add(cb.equal(root.get("itemId"), id)));
            Optional.ofNullable(request.getItemName())
                    .ifPresent(name -> predicates.add(cb.like(cb.lower(root.get("itemName")), "%" + name.toLowerCase() + "%")));
            Optional.ofNullable(request.getStock())
                    .ifPresent(stock -> {
                        String[] parts = stock.split("-");
                        Integer maxStock = parts.length > 1 ? Integer.parseInt(parts[1]) : null;
                        Integer minStock = Integer.parseInt(parts[0]);

                        if (maxStock != null) {
                            predicates.add(cb.between(root.get("stock"), minStock, maxStock));
                        } else {
                            predicates.add(cb.greaterThan(root.get("stock"), minStock));
                        }
                    });
            Optional.ofNullable(request.getPrice())
                    .ifPresent(price -> {
                        String[] parts = price.split("-");
                        Integer maxPrice = parts.length > 1 ? Integer.parseInt(parts[1]) : null;
                        Integer minPrice = Integer.parseInt(parts[0]);

                        if (maxPrice != null) {
                            predicates.add(cb.between(root.get("price"), minPrice, maxPrice));
                        } else {
                            predicates.add(cb.greaterThan(root.get("price"), minPrice));
                        }
                    });
            Optional.ofNullable(request.getIsAvailable())
                    .ifPresent(available -> predicates.add(cb.equal(root.get("isAvailable"), available)));
            //Optional.ofNullable(request.customerCode())
            //        .ifPresent(code -> predicates.add(cb.like(cb.lower(root.get("customerCode")), "%" + code.toLowerCase() + "%")));

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private ItemPreviewResponse convertToItemPreviewResponse(Item item) {
        return ItemPreviewResponse.builder()
                .itemId(item.getItemId())
                .itemName(item.getItemName())
                .stock(item.getStock())
                .price(item.getPrice())
                .isAvailable(item.getIsAvailable())
                .build();
    }

    private ItemResponse convertToItemResponse(Item item) {
        return ItemResponse.builder()
                .itemId(item.getItemId())
                .itemName(item.getItemName())
                .itemCode(item.getItemCode())
                .stock(item.getStock())
                .price(item.getPrice())
                .isAvailable(item.getIsAvailable())
                .lastReStock(item.getLastReStock())
                .build();
    }
}
