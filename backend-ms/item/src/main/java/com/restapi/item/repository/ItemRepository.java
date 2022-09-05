package com.restapi.item.repository;

import com.restapi.item.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item findItemById(Integer itemId);

    List<Item> findItemsByUserId(Integer userId);

    void deleteItemById(Integer itemId);
}
