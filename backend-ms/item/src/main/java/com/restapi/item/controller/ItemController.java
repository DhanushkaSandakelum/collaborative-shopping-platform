package com.restapi.item.controller;

import com.restapi.item.payload.request.ReqItem;
import com.restapi.item.payload.response.objects.ItemDetails;
import com.restapi.item.service.ItemService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("Item Service Working");
    }

    // Create item
    @PostMapping("")
    public ResponseEntity<?> createItem(@RequestBody ReqItem reqItem){
        return itemService.createItem(reqItem);
    }

    // Read item
    @GetMapping("")
    public ResponseEntity<?> getItem(@RequestParam(name = "itemId") Integer itemId){
        return itemService.getItem(itemId);
    }

    // Read all items
    @GetMapping("/all")
    public ResponseEntity<?> getItems(){
        return itemService.getItems();
    }

    // Read all items of a user
    @GetMapping("/all/user")
    public ResponseEntity<?> getItemsByUserId(@RequestParam(name = "userId") Integer userId){
        return itemService.getItemsByUserId(userId);
    }

    // Update item
    @PutMapping("")
    public ResponseEntity<?> updateItem(@RequestParam(name = "itemId") Integer itemId, @RequestBody ReqItem reqItem) {
        return itemService.updateItem(itemId, reqItem);
    }

    // Update item - As buy
    @GetMapping("/buy")
    public ResponseEntity<?> buyItem(@RequestParam(name = "itemId") Integer itemId) {
        return itemService.buyItem(itemId);
    }

    // Delete item
    @DeleteMapping("")
    public ResponseEntity<?> deleteItem(@RequestParam(name = "itemId") Integer itemId){
        return itemService.deleteItem(itemId);
    }
}
