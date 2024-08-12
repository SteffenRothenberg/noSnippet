package com.github.steffenrothenberg.backend.clothing.service;

import com.github.steffenrothenberg.backend.clothing.repository.ClothingRepoInterface;
import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class ClothingService {
    private final ClothingRepoInterface clothingRepoInterface;

    public List<Clothing> getAll() {
        return clothingRepoInterface.findAll();
    }

    public Clothing addClothing(Clothing myCloathing) {
        return clothingRepoInterface.save(myCloathing);
    }

    public Clothing getClothingById(String id) {
        return clothingRepoInterface.findById(id).orElseThrow();
    }

    public Clothing editClothing(Clothing clothingToEdit) {
        return clothingRepoInterface.save(clothingToEdit);
    }

    public void deleteClothing(String id) {
        clothingRepoInterface.deleteById(id);
    }
}