package com.github.steffenrothenberg.backend.clothing.controller;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import com.github.steffenrothenberg.backend.clothing.service.ClothingService;
import com.github.steffenrothenberg.backend.security.MongoUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@WebMvcTest(ClothingController.class)
class ClothingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClothingService clothingService;

    @Autowired
    private WebApplicationContext context;

    @BeforeEach
    void setUp() {
        // Setup MockMvc ohne CSRF-Schutz
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();

        // Setup SecurityContext mit MongoUser
        MongoUser mongoUser = new MongoUser("1", "user123", "password");
        TestingAuthenticationToken auth = new TestingAuthenticationToken(mongoUser, "password");
        SecurityContext securityContext = new SecurityContextImpl(auth);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testAddClothing() throws Exception {
        // JSON Payload
        String clothingJson = "{\"name\":\"Shirt\", \"type\":\"Casual\", \"size\":\"M\", \"color\":\"Red\", \"price\":20.0, \"brand\":\"BrandA\", \"material\":\"Cotton\", \"description\":\"Cool red shirt\"}";

        // Mocking der Service Antwort
        Clothing clothing = new Clothing("1", "Shirt", "Casual", "M", "Red", 20.0, "BrandA", "Cotton", "Cool red shirt", "user123");
        Mockito.when(clothingService.addClothing(Mockito.any(Clothing.class))).thenReturn(clothing);

        // Perform POST Request ohne CSRF
        mockMvc.perform(post("/api/collection")
                        .contentType(APPLICATION_JSON)
                        .content(clothingJson)
                        .with(org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf()))  // CSRF explizit hinzufügen
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Shirt"));
    }
}
