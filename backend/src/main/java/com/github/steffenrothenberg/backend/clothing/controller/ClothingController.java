package com.github.steffenrothenberg.backend.clothing.controller;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import com.github.steffenrothenberg.backend.clothing.service.ClothingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/collection")
public class ClothingController {

    private final ClothingService clothingService;

    @GetMapping
    public List<Clothing> getAll() {
        return clothingService.getAll();
    }

    @PostMapping
    public Clothing addClothing(@RequestBody Clothing myCloathing) {
        return clothingService.addClothing(myCloathing);
    }

    @GetMapping("{id}")
    public Clothing getClothingById(@PathVariable String id) {
        return clothingService.getClothingById(id);
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    public Clothing editCLothing(@PathVariable String id, @RequestBody Clothing clothingToEdit) {
        if (!clothingToEdit.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The Clothing does not exist");
        }
        return clothingService.editClothing(clothingToEdit);
    }
    @DeleteMapping("{id}")
    public void deleteClothing(@PathVariable String id){
        clothingService.deleteClothing(id);
    }
}