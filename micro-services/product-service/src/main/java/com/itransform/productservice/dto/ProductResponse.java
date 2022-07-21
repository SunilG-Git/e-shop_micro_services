package com.itransform.productservice.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductResponse {
    private String id;
    private String name;
    private String description;
    private String price;
    
}
