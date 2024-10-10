package com.github.steffenrothenberg.backend.clothing.controller;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import com.github.steffenrothenberg.backend.clothing.repository.ClothingRepoInterface;
import com.github.steffenrothenberg.backend.security.MongoUser;
import com.github.steffenrothenberg.backend.security.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class ClothingControllerTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ClothingRepoInterface clothingRepoInterface;

    @Autowired
    private MongoUserRepository mongoUserRepository;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();

        // Set up authentication manually
        MongoUser user = new MongoUser("1", "user123", "password");
        TestingAuthenticationToken authentication = new TestingAuthenticationToken(user, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    @WithMockUser(username = "user123", roles = {"USER"})
    void testAddClothing() throws Exception {
        String clothingJson = "{\"name\":\"Shirt\", \"type\":\"Casual\", \"size\":\"M\", \"color\":\"Red\", \"price\":20.0, \"brand\":\"BrandA\", \"material\":\"Cotton\", \"description\":\"Cool red shirt\"}";

        // Perform POST request to add clothing
        mockMvc.perform(post("/api/collection")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clothingJson)
                        .with(csrf())
                        .with(authentication(new TestingAuthenticationToken(new MongoUser("1", "user123", "password"), null))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Shirt"));

        // Check if the clothing was saved in the repo
        List<Clothing> clothingList = clothingRepoInterface.findByUserId("1");
        assertFalse(clothingList.isEmpty(), "The clothing list should not be empty");

        // Access the first clothing item and assert its details
        Clothing clothing = clothingList.get(0);
        assertEquals("Shirt", clothing.name());
    }

    @Test
    @WithMockUser(username = "user123", roles = {"USER"})
    void testLogin() throws Exception {
        mockMvc.perform(post("/api/users/login").with(csrf()))
                .andExpect(status().isOk());
    }
}
