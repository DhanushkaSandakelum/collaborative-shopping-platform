package com.restapi.payment.payload.response.objects;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItemDetails {
    private String name;
    private Integer amount;
    private Integer price;
}
