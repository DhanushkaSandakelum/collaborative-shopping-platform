package com.restapi.payment.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "payment", schema = "public")
@Getter
@Setter
@NoArgsConstructor
public class Payment {
    @Id
    @SequenceGenerator(name = "payment_id_sequence", sequenceName = "payment_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_id_sequence")
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
