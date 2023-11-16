package com.ijse.pr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.pr.entity.User;
import com.ijse.pr.payloads.requests.LoginRequest;
import com.ijse.pr.payloads.responses.JwtResponse;
import com.ijse.pr.payloads.responses.MessageResoponse;
import com.ijse.pr.repository.UserRepository;
import com.ijse.pr.security.jwt.JwtUtils;

@CrossOrigin(origins = "*")
@RestController
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResoponse("Username is already taken"));
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResoponse("Email is already in use"));
        }
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);

        return ResponseEntity.ok(new MessageResoponse("User created successfilly."));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        return ResponseEntity.ok(new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail()));

    }

    @PutMapping("/auth/update/{userId}") // You can define the path as per your requirements
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        // Check if the user with the provided userId exists
        if (!userRepository.existsById(userId)) {
            return ResponseEntity.notFound().build();
        }

        if (userRepository.existsByUsername(updatedUser.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResoponse("Username is already taken"));
        }

        if (userRepository.existsByEmail(updatedUser.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResoponse("Email is already in use"));
        }

        // Update the user's information
        User existingUser = userRepository.findById(userId).orElse(null);
        if (existingUser != null) {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());

            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            userRepository.save(existingUser); // Save the updated user
            return ResponseEntity.ok(new MessageResoponse("User updated successfully."));
            
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResoponse("Failed to update user."));
        }
    }

}
