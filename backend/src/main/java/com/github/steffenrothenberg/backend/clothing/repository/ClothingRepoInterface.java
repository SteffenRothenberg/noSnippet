package com.github.steffenrothenberg.backend.clothing.repository;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingRepoInterface extends MongoRepository<Clothing, String> {
}
