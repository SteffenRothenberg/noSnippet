package com.github.steffenrothenberg.backend.security;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Document("mongoUser")
public class MongoUser implements UserDetails {
        @Getter
        @Id
        private String id;

        @Indexed(unique = true)  // Eindeutiger Index auf 'username'
        private String username;
        private String password;

        // Standard-Konstruktor
        public MongoUser() {
        }

        // Konstruktor mit Parametern
        public MongoUser(String id, String username, String password) {
                this.id = id;
                this.username = username;
                this.password = password;
        }

        // Getter und Setter für 'username'
        @Override
        public String getUsername() {
                return username;
        }

        public void setUsername(String username) {
                this.username = username;
        }

        // Getter und Setter für 'password'
        @Override
        public String getPassword() {
                return password;
        }

        public void setPassword(String password) {
                this.password = password;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
                return Collections.emptyList();
        }

        @Override
        public boolean isAccountNonExpired() {
                return true;
        }

        @Override
        public boolean isAccountNonLocked() {
                return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
                return true;
        }

        @Override
        public boolean isEnabled() {
                return true;
        }
}
