package com.mfauzirh.beonlineshop.controller;

import com.mfauzirh.beonlineshop.dto.*;
import com.mfauzirh.beonlineshop.service.ItemService;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
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
}
