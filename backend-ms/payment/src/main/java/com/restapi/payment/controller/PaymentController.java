package com.restapi.payment.controller;

import com.restapi.payment.payload.request.ReqPayment;
import com.restapi.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("Payment Service Working");
    }

    // Create payment
    @PostMapping("")
    public ResponseEntity<?> createPayment(@RequestBody ReqPayment reqPayment){
        return paymentService.createPayment(reqPayment);
    }

    // Read payment
    @GetMapping("")
    public ResponseEntity<?> getPayment(@RequestParam(name = "paymentId") Integer paymentId){
        return paymentService.getPayment(paymentId);
    }

    // Read all payments
    @GetMapping("/all")
    public ResponseEntity<?> getPayments(){
        return paymentService.getPayments();
    }
}
