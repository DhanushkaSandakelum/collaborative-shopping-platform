package com.restapi.delivery.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "delivery")
@Getter
@Setter
@NoArgsConstructor
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer sellerId;
    private Integer buyerId;
    private Integer itemId;

    public Delivery(Integer sellerId, Integer buyerId, Integer itemId) {
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.itemId = itemId;
    }
}
