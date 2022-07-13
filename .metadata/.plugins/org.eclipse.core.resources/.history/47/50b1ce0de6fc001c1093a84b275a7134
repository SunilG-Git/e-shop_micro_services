package com.itransform.productservice.service;

import com.itransform.productservice.dto.ProductRequest;
import com.itransform.productservice.dto.ProductResponse;
import com.itransform.productservice.model.Product;
import com.itransform.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public void createProduct(ProductRequest productrequest){
        Product product = Product.builder()
                .name(productrequest.getName())
                .description(productrequest.getDescription())
                .price(productrequest.getPrice())
                .build();

        productRepository.save(product);
        log.info("Product {} is saved successfully",product.getId());

    }

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(this::mapToProductResponse).collect(Collectors.toList());
    }

    private ProductResponse mapToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .build();
    }
}
