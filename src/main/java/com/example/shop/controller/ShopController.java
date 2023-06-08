package com.example.shop.controller;


import com.example.shop.model.Shop;
import com.example.shop.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shop")
public class ShopController {
    @Autowired
    private ShopService shopService;

    @GetMapping("/all")
    public ResponseEntity<List<Shop>> getAllShop(){
        List<Shop> shops = shopService.findAll();
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Shop> getByID(@PathVariable("id") Long id) {
        Optional<Shop> shop = shopService.findShopByID(id);
        return shop.map(s -> new ResponseEntity<>(s, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<Shop> addShop(@RequestBody Shop shop){
        Shop shop1 = shopService.addShop(shop);
        return new ResponseEntity<>(shop1, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Shop> updateShop(@RequestBody Shop s){
        Shop shop = shopService.updateShop(s);
        return new ResponseEntity<>(shop, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Shop> deleteShop(@PathVariable("id") Long id){
        shopService.deleteShop(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
