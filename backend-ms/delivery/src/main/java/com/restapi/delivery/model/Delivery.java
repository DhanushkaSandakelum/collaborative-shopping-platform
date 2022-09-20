package com.restapi.delivery.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "delivery", schema = "public")
@Getter
@Setter
@NoArgsConstructor
public class Delivery {
    @Id
    @SequenceGenerator(name = "delivery_id_sequence", sequenceName = "delivery_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "delivery_id_sequence")
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
