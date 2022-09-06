package com.restapi.delivery.service;

import com.restapi.delivery.model.Delivery;
import com.restapi.delivery.payload.request.ReqDelivery;
import com.restapi.delivery.payload.response.ResPayload;
import com.restapi.delivery.payload.response.ResType;
import com.restapi.delivery.payload.response.objects.DetailedDelivery;
import com.restapi.delivery.payload.response.objects.ItemDetails;
import com.restapi.delivery.payload.response.objects.UserDetails;
import com.restapi.delivery.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeliveryService {
    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> createDelivery(ReqDelivery reqDelivery){
        Delivery delivery = new Delivery(
                reqDelivery.getSellerId(),
                reqDelivery.getBuyerId(),
                reqDelivery.getItemId()
        );

        deliveryRepository.save(delivery);

        return ResponseEntity.ok(new ResPayload( "Item saved successfully", ResType.OK));
    }

    public ResponseEntity<?> getDelivery(Integer deliveryId){
        Delivery delivery = deliveryRepository.findDeliveryById(deliveryId);

        if(delivery != null){
            // Communicate with item Service and take data
            ItemDetails itemDetails = restTemplate.getForObject("http://localhost:6002/api/item/support?itemId="+delivery.getItemId(), ItemDetails.class);
            // Communicate with user Service and take data
            UserDetails userDetailsSeller = restTemplate.getForObject("http://localhost:6001/api/user/support?userId="+delivery.getSellerId(), UserDetails.class);
            UserDetails userDetailsBuyer = restTemplate.getForObject("http://localhost:6001/api/user/support?userId="+delivery.getBuyerId(), UserDetails.class);

            if(itemDetails != null) {
                if(userDetailsSeller != null){
                    if(userDetailsBuyer != null) {
                        DetailedDelivery detailedDelivery = new DetailedDelivery(
                                delivery.getSellerId(),
                                userDetailsSeller.getUsername(),
                                userDetailsSeller.getFirstName(),
                                userDetailsSeller.getLastName(),

                                delivery.getBuyerId(),
                                userDetailsBuyer.getUsername(),
                                userDetailsBuyer.getFirstName(),
                                userDetailsBuyer.getLastName(),

                                delivery.getItemId(),
                                itemDetails.getName(),
                                itemDetails.getAmount(),
                                itemDetails.getPrice()
                        );

                        return ResponseEntity.ok(new ResPayload(detailedDelivery, "Delivery found", ResType.OK));
                    }
                    else {
                        return ResponseEntity.ok(new ResPayload("Seller not found", ResType.BAD));
                    }
                } else {
                    return ResponseEntity.ok(new ResPayload("Buyer not found", ResType.BAD));
                }
            } else {
                return ResponseEntity.ok(new ResPayload("Item not found", ResType.BAD));
            }
        } else {
            return ResponseEntity.ok(new ResPayload("Delivery not found", ResType.BAD));
        }
    }

    public ResponseEntity<?> getDeliveries(){
        List<Delivery> deliveries = deliveryRepository.findAll();

        if(!deliveries.isEmpty()) {
            List<DetailedDelivery> detailedDeliveries = new ArrayList<>();

            deliveries.forEach(delivery -> {
                // Communicate with item Service and take data
                ItemDetails itemDetails = restTemplate.getForObject("http://localhost:6002/api/item/support?itemId="+delivery.getItemId(), ItemDetails.class);
                // Communicate with user Service and take data
                UserDetails userDetailsSeller = restTemplate.getForObject("http://localhost:6001/api/user/support?userId="+delivery.getSellerId(), UserDetails.class);
                UserDetails userDetailsBuyer = restTemplate.getForObject("http://localhost:6001/api/user/support?userId="+delivery.getBuyerId(), UserDetails.class);

                DetailedDelivery detailedDelivery = new DetailedDelivery(
                        delivery.getSellerId(),
                        userDetailsSeller.getUsername(),
                        userDetailsSeller.getFirstName(),
                        userDetailsSeller.getLastName(),

                        delivery.getBuyerId(),
                        userDetailsBuyer.getUsername(),
                        userDetailsBuyer.getFirstName(),
                        userDetailsBuyer.getLastName(),

                        delivery.getItemId(),
                        itemDetails.getName(),
                        itemDetails.getAmount(),
                        itemDetails.getPrice()
                );

                detailedDeliveries.add(detailedDelivery);
            });

            return ResponseEntity.ok(new ResPayload(detailedDeliveries, "Deliveries found", ResType.OK));
        } else  {
            return ResponseEntity.ok(new ResPayload("Deliveries not found", ResType.BAD));
        }
    }
}
