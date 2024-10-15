package com.github.steffenrothenberg.backend.clothing;

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

    @GetMapping
    public List<Clothing> getAllByUserId(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();
        return clothingService.getAllByUser(userId);
    }

    @PostMapping
    public Clothing addClothing(@RequestBody Clothing clothing, Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();

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

    @GetMapping("{id}")
    public Clothing getClothingById(@PathVariable String id, Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();

        Clothing clothing = clothingService.getClothingById(id);

        if (!clothing.userId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to view this clothing.");
        }

        return clothing;
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    public Clothing editClothing(@PathVariable String id, @RequestBody Clothing clothingToEdit, Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();

        if (!clothingToEdit.userId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot edit this clothing.");
        }

        if (!clothingToEdit.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The Clothing ID does not match.");
        }

        return clothingService.editClothing(clothingToEdit);
    }

    @DeleteMapping("{id}")
    public void deleteClothing(@PathVariable String id, Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        MongoUser currentUser = (MongoUser) authentication.getPrincipal();
        String userId = currentUser.getId();

        Clothing clothing = clothingService.getClothingById(id);

        if (!clothing.userId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete this clothing.");
        }

        clothingService.deleteClothing(id);
    }
}
