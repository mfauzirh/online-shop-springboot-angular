package com.mfauzirh.beonlineshop.config;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@Configuration
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class WebConfig implements WebMvcConfigurer {
    private final CorsProperties corsProperties;

    @Autowired
    public WebConfig(CorsProperties corsProperties) {
        this.corsProperties = corsProperties;
    }

    @Override
    public void addCorsMappings(@NotNull CorsRegistry registry) {
        List<String> allowedOrigins = corsProperties.getAllowedOrigins();
        List<String> allowedMethods = corsProperties.getAllowedMethods();
        List<String> allowedHeaders = corsProperties.getAllowedHeaders();

        if (allowedOrigins != null && !allowedOrigins.isEmpty()) {
            registry.addMapping("/**")
                    .allowedOrigins(allowedOrigins.toArray(new String[0]))
                    .allowedMethods(allowedMethods != null
                            ? allowedMethods.toArray(new String[0])
                            : new String[]{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
                    .allowedHeaders(allowedHeaders != null
                            ? allowedHeaders.toArray(new String[0])
                            : new String[]{"*"});
        }
    }
}
