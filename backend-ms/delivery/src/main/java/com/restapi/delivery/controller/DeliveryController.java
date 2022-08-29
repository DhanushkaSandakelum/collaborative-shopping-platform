package com.restapi.delivery.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {
    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("Delivery Service Working");
    }
}
