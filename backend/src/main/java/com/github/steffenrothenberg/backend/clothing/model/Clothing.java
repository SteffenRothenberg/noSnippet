package com.github.steffenrothenberg.backend.clothing.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Clothing(
        @Id
        String id,
        @NotBlank @Size(min = 5, max = 75)
        String name,
        @NotBlank @Size(min = 5, max = 75)
        String type,
        String size,
        String color,
        Double price,
        String brand,
        String material,
        String description,
        String userId
) {
}
