package com.restapi.payment.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqPayment {
    private Integer userId;
    private Integer itemId;
    private Integer payment;
}
