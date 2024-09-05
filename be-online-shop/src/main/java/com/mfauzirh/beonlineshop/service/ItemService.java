package com.mfauzirh.beonlineshop.service;

import com.mfauzirh.beonlineshop.dto.*;
import kotlin.Pair;

import java.util.List;

public interface ItemService {
    String createItem(ItemCreateRequest request);
    Pair<List<ItemPreviewResponse>, Integer> getAllItems(ItemFilterRequest request);
    ItemResponse getItemById(long itemId);
    String updateItem(long itemId, ItemUpdateRequest request);
    String deleteItem(long itemId);
}
