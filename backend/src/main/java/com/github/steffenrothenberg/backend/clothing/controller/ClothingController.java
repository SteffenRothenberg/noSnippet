package com.github.steffenrothenberg.backend.clothing.controller;

import com.github.steffenrothenberg.backend.clothing.model.Clothing;
import com.github.steffenrothenberg.backend.clothing.service.ClothingService;
import com.github.steffenrothenberg.backend.security.MongoUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/collection")
public class ClothingController {

    private final ClothingService clothingService;

    // Abrufen aller Kleidungsstücke des eingeloggten Benutzers, basierend auf seiner userId im SecurityContext
    @GetMapping
    public List<Clothing> getAllByUserId(Authentication authentication) {
        // Die userId des aktuell eingeloggten Benutzers abrufen
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();  // Zugriff auf die ID des aktuell eingeloggten Benutzers
        return clothingService.getAllByUser(userId);
    }

    // Hinzufügen eines Kleidungsstücks für den eingeloggten Benutzer
    @PostMapping
    public Clothing addClothing(@RequestBody Clothing clothing, Authentication authentication) {
        // Die userId des aktuell eingeloggten Benutzers abrufen
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();

        // Neues Clothing-Objekt mit der userId erstellen
        Clothing newClothing = new Clothing(
                clothing.id(),
                clothing.name(),
                clothing.type(),
                clothing.size(),
                clothing.color(),
                clothing.price(),
                clothing.brand(),
                clothing.material(),
                clothing.description(),
                userId
        );
        return clothingService.addClothing(newClothing);
    }

    // Abrufen eines Kleidungsstücks basierend auf der ID
    @GetMapping("{id}")
    public Clothing getClothingById(@PathVariable String id, Authentication authentication) {
        // Die userId des aktuell eingeloggten Benutzers abrufen
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();

        Clothing clothing = clothingService.getClothingById(id);

        // Überprüfen, ob die userId übereinstimmt, um unbefugten Zugriff zu verhindern
        if (!clothing.userId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to view this clothing.");
        }

        return clothing;
    }

    // Bearbeiten eines Kleidungsstücks
    @PutMapping(path = {"{id}/update", "{id}"})
    public Clothing editClothing(@PathVariable String id, @RequestBody Clothing clothingToEdit, Authentication authentication) {
        // Die userId des aktuell eingeloggten Benutzers abrufen
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();

        // Überprüfen, ob die userId des Kleidungsstücks übereinstimmt
        if (!clothingToEdit.userId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot edit this clothing.");
        }

        // Überprüfen, ob die ID übereinstimmt
        if (!clothingToEdit.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The Clothing ID does not match.");
        }

        return clothingService.editClothing(clothingToEdit);
    }

    // Löschen eines Kleidungsstücks
    @DeleteMapping("{id}")
    public void deleteClothing(@PathVariable String id, Authentication authentication) {
        // Die userId des aktuell eingeloggten Benutzers abrufen
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();

        Clothing clothing = clothingService.getClothingById(id);

        // Überprüfen, ob die userId des Kleidungsstücks übereinstimmt
        if (!clothing.userId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete this clothing.");
        }

        clothingService.deleteClothing(id);
    }
}
