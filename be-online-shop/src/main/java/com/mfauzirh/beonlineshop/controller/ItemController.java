package com.mfauzirh.beonlineshop.controller;

import com.mfauzirh.beonlineshop.dto.*;
import com.mfauzirh.beonlineshop.service.ItemService;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import kotlin.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity<BaseResponse<String>> createItem(@Valid @RequestBody ItemCreateRequest request) {
        String result = itemService.createItem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(result, HttpStatus.OK));
    }

    @GetMapping
    public ResponseEntity<BaseResponse<List<ItemPreviewResponse>>> getAllItems(
            @Valid @Nullable @ModelAttribute ItemFilterRequest filter
    ) {
        Pair<List<ItemPreviewResponse>, Integer> pair = itemService.getAllItems(filter);

        return ResponseEntity.ok(
                new BaseResponse<>(pair.getFirst(), "Success retrieve item datas", HttpStatus.OK, pair.getSecond()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<ItemResponse>> getItemById(
            @PathVariable @NotNull @PositiveOrZero(message = "Id must greater or equal zero")
            long id
    ) {
        ItemResponse item = itemService.getItemById(id);

        return ResponseEntity.ok(
                new BaseResponse<>(item, "Success retrieve item data", HttpStatus.OK));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<String>> updateItem(
            @PathVariable @NotNull @PositiveOrZero(message = "Id must greater or equal zero")
            long id,
            @Valid @RequestBody
            ItemUpdateRequest request
    ) {
        String result = itemService.updateItem(id, request);

        return ResponseEntity.ok(
                new BaseResponse<>(result, HttpStatus.OK));
    }
}
