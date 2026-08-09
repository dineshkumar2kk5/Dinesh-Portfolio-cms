package com.dinesh.portfolio.service;

import com.dinesh.portfolio.model.User;
import com.dinesh.portfolio.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

/**
 * Handles user registration and implements Spring Security's
 * UserDetailsService for authentication.
 */
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }

    public User registerUser(String username, String email, String rawPassword) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already taken: " + username);
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered: " + email);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole("ROLE_USER");

        return userRepository.save(user);
    }

    public User createAdmin(String username, String email, String rawPassword) {
        if (userRepository.existsByUsername(username)) {
            return userRepository.findByUsername(username).get();
        }

        User admin = new User();
        admin.setUsername(username);
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(rawPassword));
        admin.setRole("ROLE_ADMIN");

        return userRepository.save(admin);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public long countUsers() {
        return userRepository.count();
    }
}
