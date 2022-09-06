package com.restapi.delivery.payload.response.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetailedDelivery {
    private Integer sellerUserId;
    private String sellerUsername;
    private String sellerFirstName;
    private String sellerLastName;

    private Integer buyerUserId;
    private String buyerUsername;
    private String buyerFirstName;
    private String buyerLastName;

    private Integer id;
    private String name;
    private Integer amount;
    private Integer price;
}
