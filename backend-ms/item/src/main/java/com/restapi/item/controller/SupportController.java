package com.restapi.item.controller;

import com.restapi.item.payload.response.objects.ItemDetails;
import com.restapi.item.service.ItemService;
import com.restapi.item.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/item/support")
public class SupportController {
    @Autowired
    private SupportService supportService;

    // Support for Microservice Communication
    @GetMapping("")
    public ItemDetails getItemDetailsById(@RequestParam(name = "itemId") Integer itemId) {
        return supportService.getItemDetailsById(itemId);
    }
}
