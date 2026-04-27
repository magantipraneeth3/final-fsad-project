package com.praneeth.webinars.service;

import com.praneeth.webinars.dto.AuthResponse;
import com.praneeth.webinars.dto.LoginRequest;
import com.praneeth.webinars.dto.RegisterRequest;
import com.praneeth.webinars.dto.UserResponse;
import com.praneeth.webinars.entity.Role;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.exception.ApiException;
import com.praneeth.webinars.repository.UserRepository;
import com.praneeth.webinars.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email is already registered");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(Role.valueOf(request.role().toUpperCase()));

        User savedUser = userRepository.save(user);
        return new AuthResponse(true, "Registration successful", jwtService.generateToken(savedUser.getId()), UserResponse.from(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
            .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return new AuthResponse(true, "Login successful", jwtService.generateToken(user.getId()), UserResponse.from(user));
    }
}
