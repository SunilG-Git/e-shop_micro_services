package com.itransform.productservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "roles")
@Getter
@Setter
public class Role {
    @Id
    private String id;
    private ERole name;
    public Role() {
    }
}
