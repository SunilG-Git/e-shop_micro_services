package com.itransform.productservice.repository;

import com.itransform.productservice.model.ERole;
import com.itransform.productservice.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
