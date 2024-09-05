package com.mfauzirh.beonlineshop.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PageableUtil {
    public Pageable constructPageable(Integer pageNumberOpt, Integer pageSizeOpt, String sortByString) {
        int pageNumber = Optional.ofNullable(pageNumberOpt).orElse(1) - 1;
        int pageSize = Optional.ofNullable(pageSizeOpt).orElse(10);
        Sort sortBy = extractSortCriteria(sortByString);

        return PageRequest.of(pageNumber, pageSize, sortBy);
    }

    private Sort extractSortCriteria(String sortBy) {
        String[] sort = sortBy.split(",");
        String field = sort[0];
        String direction = sort.length > 1 ? sort[1] : "asc";

        return Sort.by(direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, field);
    }
}
