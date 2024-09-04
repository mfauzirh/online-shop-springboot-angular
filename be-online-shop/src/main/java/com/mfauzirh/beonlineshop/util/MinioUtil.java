package com.mfauzirh.beonlineshop.util;

import com.mfauzirh.beonlineshop.config.MinioConfig;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.http.Method;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class MinioUtil {
    private final MinioClient minioClient;
    private final MinioConfig minioConfig;

    @Autowired
    public MinioUtil(MinioClient minoClient, MinioConfig minioConfig) {
        this.minioClient = minoClient;
        this.minioConfig = minioConfig;
    }

    @SneakyThrows
    public void uploadImage(MultipartFile imageFile, String fileName) throws IOException {
        minioClient.putObject(
          PutObjectArgs.builder()
                  .bucket(minioConfig.getBucketName())
                  .object(fileName)
                  .stream(imageFile.getInputStream(), imageFile.getSize(), -1)
                  .contentType(imageFile.getContentType())
                  .build()
        );
    }

    @SneakyThrows
    public String getImageUrl(String fileName) {
        return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.GET)
                    .bucket(minioConfig.getBucketName())
                    .object(fileName)
                    .build());
    }

    @SneakyThrows
    public void removeImage(String fileName) {
        minioClient.removeObject(RemoveObjectArgs.builder()
                .bucket(minioConfig.getBucketName())
                .object(fileName)
                .build());
    }
}
