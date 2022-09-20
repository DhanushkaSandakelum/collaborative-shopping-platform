package com.restapi.sms.service;

import com.restapi.sms.payload.request.ReqSMS;
import com.restapi.sms.payload.response.ResPayload;
import com.restapi.sms.payload.response.ResType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SmsService {
    public ResponseEntity<?> send(ReqSMS reqSMS) {
        return ResponseEntity.ok(new ResPayload(reqSMS, "Message sent", ResType.OK));
    }
}
