package com.restapi.payment.payload.response.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetailedPayment {
    private Integer id;
    private Integer payment;

    private Integer itemId;
    private String name;
    private Integer amount;
    private Integer price;

    private Integer userId;
    private String username;
    private String firstName;
    private String lastName;
}
