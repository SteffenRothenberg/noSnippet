package com.github.steffenrothenberg.backend.clothing.repository;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothingRepoInterface extends MongoRepository<Clothing, String> {
    // Benutzerdefinierte Methode für die Abfrage nach userId
    List<Clothing> findByUserId(String userId);  // MongoDB erstellt automatisch die Query basierend auf dem Methodennamen
}
