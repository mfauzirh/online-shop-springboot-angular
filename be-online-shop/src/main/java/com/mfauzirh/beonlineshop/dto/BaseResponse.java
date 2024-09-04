package com.mfauzirh.beonlineshop.dto;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BaseResponse<T> {
    @Nullable
    private Integer total;
    @Nullable
    private T data;
    private String message;
    private int statusCode;
    private String status;

    public BaseResponse(String message, HttpStatus statusCode) {
        this.message = message;
        this.statusCode = statusCode.value();
        this.status = statusCode.getReasonPhrase();
    }

    public BaseResponse(@Nullable T data, String message, HttpStatus statusCode) {
        this(message, statusCode);
        this.data = data;
    }

    public BaseResponse(@Nullable T data, String message, HttpStatus statusCode, int total) {
        this(data, message, statusCode);
        this.total = total;
    }
}