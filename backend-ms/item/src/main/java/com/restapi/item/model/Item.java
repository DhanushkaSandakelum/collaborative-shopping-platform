package com.restapi.item.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "item", schema = "public")
@Getter
@Setter
@NoArgsConstructor
public class Item {
    @Id
    @SequenceGenerator(name = "item_id_sequence", sequenceName = "item_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_id_sequence")
    private Integer id;

    private String name;
    private String description;
    private Integer amount;
    private Integer price;
    private Boolean alreadyBuy;

    private Integer userId;

    public Item(String name, String description, Integer amount, Integer price, Boolean alreadyBuy, Integer userId) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.price = price;
        this.alreadyBuy = alreadyBuy;
        this.userId = userId;
    }
}
