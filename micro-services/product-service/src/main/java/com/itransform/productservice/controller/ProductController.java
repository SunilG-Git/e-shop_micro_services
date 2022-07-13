package com.itransform.productservice.controller;


import com.itransform.productservice.model.Product;
import com.itransform.productservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/addProduct")
    public String saveProduct(@RequestBody Product product){
        productRepository.save(product);
        return "Added product with id : " +product.getId();
    }

    @GetMapping("/findAllProducts")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/findAllProducts/{id}")
    public Optional<Product> getProduct(@PathVariable("id") String id){
        return productRepository.findById(id);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public String deleteProduct(@PathVariable("id") String id){
        productRepository.deleteById(id);
        return "product deleted with id : "+id;
    }
}
