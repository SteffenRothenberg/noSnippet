package com.github.steffenrothenberg.backend.clothing.controller;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import com.github.steffenrothenberg.backend.clothing.repository.ClothingRepoInterface;
import com.github.steffenrothenberg.backend.security.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class ClothingControllerIntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ClothingRepoInterface clothingRepoInterface;

    @Autowired
    private MongoUserRepository mongoUserRepository;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    @WithMockUser(username = "user123", roles = {"USER"})
    void testAddClothing() throws Exception {
        // JSON Payload für Kleidungsstück
        String clothingJson = "{\"name\":\"Shirt\", \"type\":\"Casual\", \"size\":\"M\", \"color\":\"Red\", \"price\":20.0, \"brand\":\"BrandA\", \"material\":\"Cotton\", \"description\":\"Cool red shirt\"}";

        // POST Request, um ein Kleidungsstück hinzuzufügen
        mockMvc.perform(post("/api/collection")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clothingJson)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Shirt"));

        // Sicherstellen, dass es in der Datenbank gespeichert wurde
        Clothing clothing = clothingRepoInterface.findByName("Shirt").orElseThrow();
        assert clothing.name().equals("Shirt");
    }

    @Test
    @WithMockUser(username = "user123", roles = {"USER"})
    void testLogin() throws Exception {
        mockMvc.perform(post("/api/users/login").with(csrf()))
                .andExpect(status().isOk());
    }
}
