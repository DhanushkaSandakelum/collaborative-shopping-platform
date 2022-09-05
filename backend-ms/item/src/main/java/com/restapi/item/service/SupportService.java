package com.restapi.item.service;

import com.restapi.item.model.Item;
import com.restapi.item.payload.response.objects.ItemDetails;
import com.restapi.item.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupportService {
    @Autowired
    private ItemRepository itemRepository;

    public ItemDetails getItemDetailsById(Integer itemId){
        Item item = itemRepository.findItemById(itemId);

        if(item != null) {
            ItemDetails itemDetails = new ItemDetails(
                    item.getName(),
                    item.getAmount(),
                    item.getPrice(),
                    item.getAlreadyBuy()
            );

            return itemDetails;
        } else {
            return null;
        }
    }
}
