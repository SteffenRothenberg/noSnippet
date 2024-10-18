package com.github.steffenrothenberg.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MongoUserRepository extends MongoRepository<MongoUser, String> {
    // Methode zum Suchen eines Benutzers anhand des Benutzernamens
    Optional<MongoUser> findMongoUserByUsername(String username);
}
