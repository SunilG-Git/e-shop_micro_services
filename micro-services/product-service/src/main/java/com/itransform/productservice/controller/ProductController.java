package com.itransform.productservice.controller;


import com.itransform.productservice.model.AuthenticationRequest;
import com.itransform.productservice.model.AuthenticationResponse;
import com.itransform.productservice.model.Product;
import com.itransform.productservice.repository.ProductRepository;
import com.itransform.productservice.service.MyUserDetailService;
import com.itransform.productservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MyUserDetailService userDetailService;

    @Autowired
    private JwtUtil jwtTokenUtil;



    @RequestMapping(value="/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        final UserDetails userDetails = userDetailService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
    @PostMapping("/addProduct")
    public String saveProduct(@RequestBody Product product){
        productRepository.save(product);
        return "Added product with id : " +product.getId();
    }

    @RequestMapping("/findAllProducts")

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @RequestMapping("/findAllProducts/{id}")
    public Optional<Product> getProduct(@PathVariable("id") String id){
        return productRepository.findById(id);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public String deleteProduct(@PathVariable("id") String id){
        productRepository.deleteById(id);
        return "product deleted with id : "+id;
    }



}
