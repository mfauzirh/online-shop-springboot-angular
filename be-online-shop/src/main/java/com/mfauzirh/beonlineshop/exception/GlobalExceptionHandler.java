package com.mfauzirh.beonlineshop.exception;

import com.mfauzirh.beonlineshop.dto.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponse<String>> handleValidationException(MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();
        ex.getAllErrors().forEach(err -> errors.add(err.getDefaultMessage()));

        log.error("Validation error occur : {}", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new BaseResponse<>(String.join(", ", errors), HttpStatus.BAD_REQUEST)
        );
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<BaseResponse<String>> handleHandlerMethodValidationException(HandlerMethodValidationException ex) {
        List<String> errors = new ArrayList<>();
        ex.getAllErrors().forEach(err -> errors.add(err.getDefaultMessage()));

        log.error("Validation errors occur : {}", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new BaseResponse<>(String.join(", ", errors), HttpStatus.BAD_REQUEST));
    }
}
