package com.github.steffenrothenberg.backend.security;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class MongoUserController {

    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder passwordEncoder;

    // Rückgabe des angemeldeten Benutzers (nur Benutzername)
    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    // Login-Endpunkt, gibt den angemeldeten Benutzernamen zurück
    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    // Logout-Endpunkt, Session wird invalidiert und Security-Kontext wird geleert
    @PostMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

    // Signup-Endpunkt, erstellt einen neuen Benutzer in der MongoDB
    @PostMapping("/signup")
    public MongoUser signUp(@RequestBody @Valid MongoUser user) {
        if (mongoUserRepository.findMongoUserByUsername(user.getUsername()).isPresent()) {
            String errorMessage = "Username already exists!";
            throw new IllegalArgumentException(errorMessage);
        }
        // Passwort verschlüsseln und neuen Benutzer erstellen
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        MongoUser newUser = new MongoUser(null, user.getUsername(), encodedPassword);
        return mongoUserRepository.save(newUser);
    }
}
