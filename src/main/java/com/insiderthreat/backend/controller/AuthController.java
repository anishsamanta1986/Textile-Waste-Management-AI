package com.insiderthreat.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.insiderthreat.backend.dto.request.LoginRequest;
import com.insiderthreat.backend.dto.request.RegisterRequest;
import com.insiderthreat.backend.dto.response.ApiResponse;
import com.insiderthreat.backend.dto.response.AuthResponse;
import com.insiderthreat.backend.security.JwtService;
import com.insiderthreat.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    // Register User
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        userService.registerUser(request);

        return ResponseEntity.ok(
                new ApiResponse("User registered successfully"));
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @Valid @RequestBody LoginRequest request) {

        boolean isValid = userService.login(
                request.getEmail(),
                request.getPassword());

        if (!isValid) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse("Invalid email or password"));
        }

        String token = jwtService.generateToken(request.getEmail());

        return ResponseEntity.ok(
                new AuthResponse(token, "Login successful"));
    }
}