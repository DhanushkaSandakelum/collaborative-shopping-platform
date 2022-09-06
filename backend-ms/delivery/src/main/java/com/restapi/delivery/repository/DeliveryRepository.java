package com.restapi.delivery.repository;

import com.restapi.delivery.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
    Delivery findDeliveryById(Integer deliveryId);
}
