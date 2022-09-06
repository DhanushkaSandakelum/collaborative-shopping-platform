package com.restapi.delivery.controller;

import com.restapi.delivery.payload.request.ReqDelivery;
import com.restapi.delivery.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {
    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("Delivery Service Working");
    }

    // TODO: Create delivery
    @PostMapping("")
    public ResponseEntity<?> createDelivery(@RequestBody ReqDelivery reqDelivery){
        System.out.println(reqDelivery);
        return deliveryService.createDelivery(reqDelivery);
    }

    // TODO: Read delivery
    @GetMapping("")
    public ResponseEntity<?> getDelivery(@RequestParam(name = "deliveryId") Integer deliveryId){
        return deliveryService.getDelivery(deliveryId);
    }

    // TODO: Read all delivery
    @GetMapping("/all")
    public ResponseEntity<?> getDeliveries(){
        return deliveryService.getDeliveries();
    }
}
