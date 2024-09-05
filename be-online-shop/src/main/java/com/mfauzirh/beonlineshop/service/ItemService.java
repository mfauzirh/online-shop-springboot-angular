package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.ItemCreateRequest;
import com.mfauzirh.beonlineshop.dto.ItemFilterRequest;
import com.mfauzirh.beonlineshop.dto.ItemPreviewResponse;
import kotlin.Pair;

import java.util.List;

public interface ItemService {
    String createItem(ItemCreateRequest request);
    Pair<List<ItemPreviewResponse>, Integer> getAllItems(ItemFilterRequest request);
}
