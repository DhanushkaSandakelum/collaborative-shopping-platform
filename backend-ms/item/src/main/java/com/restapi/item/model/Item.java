package com.restapi.item.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "item")
@Getter
@Setter
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private Integer amount;
    private Integer price;

    private Integer userId;

    public Item(String name, String description, Integer amount, Integer price, Integer userId) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.price = price;
        this.userId = userId;
    }
}
