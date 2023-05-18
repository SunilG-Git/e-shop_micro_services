package com.itransform.orderservice.service;

import com.itransform.orderservice.dto.InventoryResponse;
import com.itransform.orderservice.dto.OrderItemsDto;
import com.itransform.orderservice.dto.OrderRequest;
import com.itransform.orderservice.model.Order;
import com.itransform.orderservice.model.OrderItems;
import com.itransform.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;
    public void placeOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        List<OrderItems> orderItems = orderRequest.getOrderItemsDtoList()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        order.setOrderItemsList(orderItems);

       List<String> skuCodes = order.getOrderItemsList().stream().map(OrderItems::getSkuCode).toList();

        //call inventory service if product is available place order
        InventoryResponse[] inventoryResponseArray = webClientBuilder.build().get()
                .uri("http://inventory-service/api/inventory",
                uriBuilder -> uriBuilder.queryParam("skuCode",skuCodes).build())
                .retrieve()
                .bodyToMono(InventoryResponse[].class)
                .block();

        assert inventoryResponseArray != null;
        boolean allProductInStock = Arrays.stream(inventoryResponseArray)
                .allMatch(InventoryResponse:: isInStock);
        if((allProductInStock)) {
            orderRepository.save(order);
        }else{
            throw new IllegalArgumentException("Product is not available,Try Again!!");
        }
    }

    private OrderItems mapToDto(OrderItemsDto orderItemsDto) {
        OrderItems orderItems =new OrderItems();
        orderItems.setPrice(orderItemsDto.getPrice());
        orderItems.setQuantity(orderItemsDto.getQuantity());
        orderItems.setSkuCode(orderItemsDto.getSkuCode());
        return orderItems;
    }
}
