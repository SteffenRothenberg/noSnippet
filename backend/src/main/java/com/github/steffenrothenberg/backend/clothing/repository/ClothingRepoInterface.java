package com.github.steffenrothenberg.backend.clothing.repository;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClothingRepoInterface extends MongoRepository<Clothing, String> {

    // Benutzerdefinierte Methode für die Abfrage nach userId
    List<Clothing> findByUserId(String userId);

    // Neue Methode zur Abfrage eines Kleidungsstücks nach dem Namen
    Optional<Clothing> findByName(String name);
}
