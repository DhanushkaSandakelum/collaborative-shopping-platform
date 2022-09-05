package com.restapi.item.service;

import com.restapi.item.model.Item;
import com.restapi.item.payload.request.ReqItem;
import com.restapi.item.payload.response.ResPayload;
import com.restapi.item.payload.response.ResType;
import com.restapi.item.payload.response.objects.DetailedItem;
import com.restapi.item.payload.response.objects.UserDetails;
import com.restapi.item.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> createItem(ReqItem reqItem){
        Item item = new Item(
                reqItem.getName(),
                reqItem.getDescription(),
                reqItem.getAmount(),
                reqItem.getPrice(),
                reqItem.getUserId()
        );

        itemRepository.save(item);

        return ResponseEntity.ok(new ResPayload( "Item saved successfully", ResType.OK));
    }

    public ResponseEntity<?> getItem(Integer itemId){
        Item item = itemRepository.findItemById(itemId);

        if(item != null){
            // Communicate with user Service and take data
            UserDetails userDetails = restTemplate.getForObject("http://localhost:6001/api/user?userId="+item.getUserId(), UserDetails.class);

            if(userDetails != null) {
                DetailedItem detailedItem = new DetailedItem(
                        item.getId(),
                        item.getName(),
                        item.getDescription(),
                        item.getAmount(),
                        item.getPrice(),
                        item.getUserId(),
                        userDetails.getUsername(),
                        userDetails.getFirstName(),
                        userDetails.getLastName()
                );

                return ResponseEntity.ok(new ResPayload(detailedItem, "Item found", ResType.OK));
            }
            else {
                return ResponseEntity.ok(new ResPayload("User not found", ResType.BAD));
            }
        } else {
            return ResponseEntity.ok(new ResPayload("Item not found", ResType.BAD));
        }
    }

    public ResponseEntity<?> getItemsByUserId(Integer userId){
        List<Item> items = itemRepository.findItemsByUserId(userId);

        if(!items.isEmpty()) {
            // Communicate with user Service and take data
            UserDetails userDetails = restTemplate.getForObject("http://localhost:6001/api/user?userId="+userId, UserDetails.class);

            List<DetailedItem> detailedItems = new ArrayList<>();

            items.forEach(item -> {
                DetailedItem detailedItem = new DetailedItem(
                        item.getId(),
                        item.getName(),
                        item.getDescription(),
                        item.getAmount(),
                        item.getPrice(),
                        item.getUserId(),
                        userDetails.getUsername(),
                        userDetails.getFirstName(),
                        userDetails.getLastName()
                );

                detailedItems.add(detailedItem);
            });

            return ResponseEntity.ok(new ResPayload(detailedItems, "Items found", ResType.OK));
        } else  {
            return ResponseEntity.ok(new ResPayload("Items not found", ResType.BAD));
        }
    }

    public ResponseEntity<?> updateItem(Integer itemId, ReqItem reqItem){
        Item item = itemRepository.findItemById(itemId);

        if(item != null) {
            item.setName(reqItem.getName());
            item.setDescription(reqItem.getDescription());
            item.setAmount(reqItem.getAmount());
            item.setPrice(reqItem.getPrice());

            itemRepository.save(item);

            return ResponseEntity.ok(new ResPayload(item, "Item updated successfully", ResType.OK));
        } else {
            return ResponseEntity.ok(new ResPayload("Items not found", ResType.BAD));
        }
    }

    @Transactional
    public ResponseEntity<?> deleteItem(Integer itemId){
        itemRepository.deleteItemById(itemId);

        return ResponseEntity.ok(new ResPayload( "Item deleted succesfully", ResType.OK));
    }
}
