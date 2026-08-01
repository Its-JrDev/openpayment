package com.granero.payments.controller;


import com.granero.payments.dto.LoginRequest;
import com.granero.payments.dto.LoginResponse;
import com.granero.payments.security.JwtService;
import com.granero.payments.security.UserDetailsImpl;


import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;


import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;



    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ){


        Authentication authentication =
                authenticationManager.authenticate(

                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );


        UserDetailsImpl userDetails =
                (UserDetailsImpl)
                        authentication.getPrincipal();



        String token =
                jwtService.generateToken(userDetails);



        LoginResponse response =
                new LoginResponse(
                        token,
                        userDetails.getUsername(),
                        userDetails.getUsuario().getRol()
                );


        return ResponseEntity.ok(response);
    }
}