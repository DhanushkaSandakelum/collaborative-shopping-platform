package com.restapi.delivery.payload.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReqDelivery {
    private Integer sellerId;
    private Integer buyerId;
    private Integer itemId;
}
