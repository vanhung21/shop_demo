package com.example.shop.service;

import com.example.shop.model.Shop;
import com.example.shop.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ShopService {
    @Autowired
    private ShopRepository shopRepository;

    public List<Shop> findAll(){
        return shopRepository.findAll();
    }
    public Optional<Shop> findShopByID(Long id){
        return shopRepository.findById(id);
    }
    public Shop addShop(Shop s){
        s.setShopCode(UUID.randomUUID().toString());
        return shopRepository.save(s);
    }
    public Shop updateShop(Shop emp){
        return shopRepository.save(emp);
    }
    public void deleteShop(Long id){
        shopRepository.deleteById(id);
    }
}
