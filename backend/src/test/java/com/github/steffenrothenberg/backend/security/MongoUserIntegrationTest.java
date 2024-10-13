/*
package com.github.steffenrothenberg.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@ActiveProfiles("test")
public class MongoUserIntegrationTest {

    @Autowired
    private MongoUserRepository mongoUserRepository;

    @BeforeEach
    public void setUp() {
        mongoUserRepository.deleteAll();
    }
    @Test
    public void testCreateAndFindMongoUserByUsername() {
        // Test-Daten
        String testUsername = "testuser";
        String testPassword = "password";

        // Nutzer erstellen und in die DB speichern
        MongoUser testUser = new MongoUser(null, testUsername, testPassword);
        mongoUserRepository.save(testUser);

        // Nutzer anhand des Benutzernamens finden
        Optional<MongoUser> foundUser = mongoUserRepository.findMongoUserByUsername(testUsername);

        // Prüfen, ob der Nutzer gefunden wurde
        assertTrue(foundUser.isPresent());

        // Testfall: Nicht vorhandenen Benutzer suchen
        Optional<MongoUser> notFoundUser = mongoUserRepository.findMongoUserByUsername("nonexistentuser");
        assertFalse(notFoundUser.isPresent());
    }
}
*/
