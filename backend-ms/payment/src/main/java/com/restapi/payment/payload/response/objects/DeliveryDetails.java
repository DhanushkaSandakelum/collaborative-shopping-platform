package com.restapi.payment.payload.response.objects;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryDetails {
    private Integer sellerId;
    private Integer buyerId;
    private Integer itemId;
}
