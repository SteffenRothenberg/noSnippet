package com.github.steffenrothenberg.backend.clothing.service;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import com.github.steffenrothenberg.backend.clothing.repository.ClothingRepoInterface;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

class ClothingServiceTest {

    @InjectMocks
    private ClothingService clothingService;

    @Mock
    private ClothingRepoInterface clothingRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Initialisiert Mockito
    }

    @Test
    void testGetAllByUser() {
        // Testdaten
        String userId = "user123";
        Clothing clothing1 = new Clothing("1", "Shirt", "Casual", "M", "Red", 20.0, "BrandA", "Cotton", "Cool red shirt", userId);
        Clothing clothing2 = new Clothing("2", "Pants", "Formal", "L", "Black", 50.0, "BrandB", "Polyester", "Black formal pants", userId);

        // Mocking der Repository-Antwort
        when(clothingRepo.findByUserId(userId)).thenReturn(Arrays.asList(clothing1, clothing2));

        // Aufruf der Service-Methode
        List<Clothing> clothingList = clothingService.getAllByUser(userId);

        // Verifizierung der Ergebnisse
        assertEquals(2, clothingList.size());
        assertEquals("Shirt", clothingList.get(0).name());
        assertEquals("Pants", clothingList.get(1).name());
    }

    @Test
    void testAddClothing() {
        // Testdaten
        String userId = "user123";
        Clothing clothing = new Clothing(null, "Shirt", "Casual", "M", "Red", 20.0, "BrandA", "Cotton", "Cool red shirt", userId);

        // Mocking der Repository-Antwort
        when(clothingRepo.save(any(Clothing.class))).thenReturn(clothing);

        // Aufruf der Service-Methode
        Clothing result = clothingService.addClothing(clothing);

        // Verifizierung der Ergebnisse
        assertEquals("Shirt", result.name());
    }
}
