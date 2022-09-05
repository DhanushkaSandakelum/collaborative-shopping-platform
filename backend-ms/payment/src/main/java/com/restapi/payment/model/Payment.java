package com.restapi.payment.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "payment")
@Getter
@Setter
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;
    private Integer itemId;
    private Integer payment;

    public Payment(Integer userId, Integer itemId, Integer payment) {
        this.userId = userId;
        this.itemId = itemId;
        this.payment = payment;
    }
}
