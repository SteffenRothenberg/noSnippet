package com.github.steffenrothenberg.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MongoUserDetailsService implements UserDetailsService {

    private final MongoUserRepository mongoUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Wir holen den Benutzer als MongoUser ab
        MongoUser mongoUser = mongoUserRepository.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with name: " + username + " not found!"));

        // Rückgabe des Benutzers als UserDetails-Objekt
        return new org.springframework.security.core.userdetails.User(
                mongoUser.getUsername(),
                mongoUser.getPassword(),
                mongoUser.getAuthorities()
        );
    }
}
