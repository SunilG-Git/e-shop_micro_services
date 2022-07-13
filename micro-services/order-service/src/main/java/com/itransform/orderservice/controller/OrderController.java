package com.itransform.orderservice.controller;

import com.itransform.orderservice.dto.OrderRequest;
import com.itransform.orderservice.model.Order;
import com.itransform.orderservice.repository.OrderRepository;
import com.itransform.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String placeOrder(@RequestBody OrderRequest orderRequest){
        orderService.placeOrder(orderRequest);
        return "Order placed Successfully";
    }

    @GetMapping("/findAllOrders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @DeleteMapping("/deleteOrder/{id}")
    public String deleteOrder(@PathVariable("id") Long id) {
        orderRepository.deleteById(id);
        return "order deleted with id : " + id;
    }
}
