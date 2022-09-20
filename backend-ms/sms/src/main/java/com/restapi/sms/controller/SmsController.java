package com.restapi.sms.controller;

import com.restapi.sms.payload.request.ReqSMS;
import com.restapi.sms.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/sms")
public class SmsController {
    @Autowired
    private SmsService smsService;

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("Sms Service Working");
    }

    @PostMapping
    public ResponseEntity<?> send(@RequestBody ReqSMS reqSMS){
        return smsService.send(reqSMS);
    }
}
