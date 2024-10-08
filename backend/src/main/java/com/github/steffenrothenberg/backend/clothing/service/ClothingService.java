package com.github.steffenrothenberg.backend.clothing.service;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import com.github.steffenrothenberg.backend.clothing.repository.ClothingRepoInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ClothingService {

    private final ClothingRepoInterface clothingRepoInterface;

    public List<Clothing> getAllByUser(String userId) {
        return clothingRepoInterface.findByUserId(userId);
    }

    public Clothing addClothing(Clothing clothing) {
        return clothingRepoInterface.save(clothing);
    }

    public Clothing getClothingById(String id) {
        return clothingRepoInterface.findById(id).orElseThrow();
    }

    public Clothing editClothing(Clothing clothing) {
        return clothingRepoInterface.save(clothing);
    }

    public void deleteClothing(String id) {
        clothingRepoInterface.deleteById(id);
    }
}
