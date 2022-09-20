package com.restapi.email.controller;

import com.restapi.email.payload.request.ReqEmail;
import com.restapi.email.payload.response.ResPayload;
import com.restapi.email.payload.response.ResType;
import com.restapi.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("Email Service Working");
    }

    @PostMapping("")
    public ResponseEntity<?> sendMail(@RequestBody ReqEmail details){
        String status = emailService.sendSimpleMail(details);

        return ResponseEntity.ok(new ResPayload(status, ResType.OK));
    }
}
