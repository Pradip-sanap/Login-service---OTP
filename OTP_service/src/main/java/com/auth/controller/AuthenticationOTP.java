package com.auth.controller;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth.model.OTP;
import com.auth.service.AuthenticationOTPService;

@RestController
@RequestMapping("/auth")
public class AuthenticationOTP {

	@Autowired
	private AuthenticationOTPService service;

	@GetMapping("/otp/{username}")
	public ResponseEntity<String> getAuthenticationOTP(@PathVariable("username") String username) {
		Instant end = Instant.now();
		System.out.println("Program ended at: " + end);
		// Call service to get the OTP for the provided username
		String otp = service.getOtp(username);
		return ResponseEntity.ok(otp);
	}

}
