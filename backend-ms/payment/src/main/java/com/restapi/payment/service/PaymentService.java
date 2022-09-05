package com.restapi.payment.service;

import com.restapi.payment.model.Payment;
import com.restapi.payment.payload.request.ReqPayment;
import com.restapi.payment.payload.response.ResPayload;
import com.restapi.payment.payload.response.ResType;
import com.restapi.payment.payload.response.objects.DetailedPayment;
import com.restapi.payment.payload.response.objects.ItemDetails;
import com.restapi.payment.payload.response.objects.UserDetails;
import com.restapi.payment.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> createPayment(ReqPayment reqPayment) {
// Communicate with item Service and take data
        ItemDetails itemDetails = restTemplate.getForObject("http://localhost:6002/api/item/buy?itemId="+reqPayment.getItemId(), ItemDetails.class);

        if(itemDetails != null) {
            Payment payment = new Payment(
                    reqPayment.getUserId(),
                    reqPayment.getItemId(),
                    reqPayment.getPayment()
            );

            paymentRepository.save(payment);

            return ResponseEntity.ok(new ResPayload( "Payment saved successfully", ResType.OK));
        } else {
            return ResponseEntity.ok(new ResPayload( "Item or user not found", ResType.BAD));
        }
    }

    public ResponseEntity<?> getPayment(Integer paymentId){
        Payment payment = paymentRepository.findPaymentById(paymentId);

        if(payment != null){
            // Communicate with item Service and take data
            ItemDetails itemDetails = restTemplate.getForObject("http://localhost:6002/api/item/support?itemId="+payment.getItemId(), ItemDetails.class);
            // Communicate with user Service and take data
            UserDetails userDetails = restTemplate.getForObject("http://localhost:6001/api/user/support?userId="+payment.getUserId(), UserDetails.class);

           if(itemDetails != null) {
               if(userDetails != null) {
                   DetailedPayment detailedPayment = new DetailedPayment(
                           payment.getId(),
                           payment.getPayment(),

                           payment.getItemId(),
                           itemDetails.getName(),
                           itemDetails.getAmount(),
                           itemDetails.getPrice(),

                           payment.getUserId(),
                           userDetails.getUsername(),
                           userDetails.getFirstName(),
                           userDetails.getLastName()
                   );

                   return ResponseEntity.ok(new ResPayload(detailedPayment, "Payment found", ResType.OK));
               }
               else {
                   return ResponseEntity.ok(new ResPayload("User not found", ResType.BAD));
               }
           } else {
               return ResponseEntity.ok(new ResPayload("Item not found", ResType.BAD));
           }
        } else {
            return ResponseEntity.ok(new ResPayload("Payment not found", ResType.BAD));
        }
    }

    public ResponseEntity<?> getPayments(){
        List<Payment> payments = paymentRepository.findAll();

        if(!payments.isEmpty()) {

            List<DetailedPayment> detailedPayments = new ArrayList<>();

            payments.forEach(payment -> {
                // Communicate with item Service and take data
                ItemDetails itemDetails = restTemplate.getForObject("http://localhost:6002/api/item/support?itemId="+payment.getItemId(), ItemDetails.class);
                // Communicate with user Service and take data
                UserDetails userDetails = restTemplate.getForObject("http://localhost:6001/api/user/support?userId="+payment.getUserId(), UserDetails.class);

                DetailedPayment detailedPayment = new DetailedPayment(
                        payment.getId(),
                        payment.getPayment(),

                        payment.getItemId(),
                        itemDetails.getName(),
                        itemDetails.getAmount(),
                        itemDetails.getPrice(),

                        payment.getUserId(),
                        userDetails.getUsername(),
                        userDetails.getFirstName(),
                        userDetails.getLastName()
                );

                detailedPayments.add(detailedPayment);
            });

            return ResponseEntity.ok(new ResPayload(detailedPayments, "Payments found", ResType.OK));
        } else  {
            return ResponseEntity.ok(new ResPayload("Payments not found", ResType.BAD));
        }
    }
}
