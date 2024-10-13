/*
package com.github.steffenrothenberg.backend.clothing;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import com.github.steffenrothenberg.backend.clothing.repository.ClothingRepoInterface;
import com.github.steffenrothenberg.backend.security.MongoUser;
import com.github.steffenrothenberg.backend.security.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
public class ClothingControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ClothingRepoInterface clothingRepoInterface;

    @Autowired
    private MongoUserRepository mongoUserRepository;

    private String testClothingId;

    @BeforeEach
    void setUp() {
        // Stelle sicher, dass der Benutzer existiert
        if (!mongoUserRepository.findMongoUserByUsername("user123").isPresent()) {
            MongoUser testUser = new MongoUser(null, "user123", "password123");
            mongoUserRepository.save(testUser);
        }

        // Stelle sicher, dass ein Test Clothing-Objekt vorhanden ist
        Clothing testClothing = new Clothing(null, "Shirt", "Casual", "M", "Red", 20.0, "BrandA", "Cotton", "Cool red shirt", "user123");
        Clothing savedClothing = clothingRepoInterface.save(testClothing);
        testClothingId = savedClothing.id(); // Speichere die dynamische ID des gespeicherten Objekts
    }

    @Test
    @WithUserDetails(value = "user123", userDetailsServiceBeanName = "mongoUserDetailsService")
    void testAddClothing() throws Exception {
        String clothingJson = "{\"name\":\"Shirt\", \"type\":\"Casual\", \"size\":\"M\", \"color\":\"Red\", \"price\":20.0, \"brand\":\"BrandA\", \"material\":\"Cotton\", \"description\":\"Cool red shirt\"}";

        mockMvc.perform(post("/api/collection")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clothingJson)
                        .with(csrf()))  // Include CSRF token for POST requests
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Shirt"));

        List<Clothing> clothingList = clothingRepoInterface.findByUserId("user123");
        assertFalse(clothingList.isEmpty(), "The clothing list should not be empty");

        Clothing clothing = clothingList.get(0);
        assertEquals("Shirt", clothing.name());
    }

    @Test
    @WithUserDetails(value = "user123", userDetailsServiceBeanName = "mongoUserDetailsService")
    void testGetAllByUserId() throws Exception {
        mockMvc.perform(get("/api/collection")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @WithUserDetails(value = "user123", userDetailsServiceBeanName = "mongoUserDetailsService")
    void testDeleteClothing() throws Exception {
        mockMvc.perform(delete("/api/collection/{id}", testClothingId) // Verwende die dynamische ID
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @WithUserDetails(value = "user123", userDetailsServiceBeanName = "mongoUserDetailsService")
    void testEditClothing() throws Exception {
        String clothingJson = "{\"name\":\"Shirt\", \"type\":\"Casual\", \"size\":\"M\", \"color\":\"Red\", \"price\":20.0, \"brand\":\"BrandA\", \"material\":\"Cotton\", \"description\":\"Cool red shirt\"}";

        mockMvc.perform(put("/api/collection/{id}", testClothingId) // Verwende die dynamische ID
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clothingJson)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Shirt"));
    }

    @Test
    @WithUserDetails(value = "user123", userDetailsServiceBeanName = "mongoUserDetailsService")
    void testGetClothingById() throws Exception {
        mockMvc.perform(get("/api/collection/{id}", testClothingId) // Verwende die dynamische ID
                        .with(csrf()))
                .andExpect(status().isOk());
    }
}
*/
