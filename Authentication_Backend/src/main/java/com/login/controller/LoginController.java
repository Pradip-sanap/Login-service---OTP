package com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.service.LoginService;

@RestController
@RequestMapping("/login/validate")
public class LoginController {
	
	@Autowired
	private LoginService service;

	
	@GetMapping("/username/{username}")
	public ResponseEntity<Boolean> validateUser(@PathVariable("username") String username){
		System.out.println(username);
		if(service.validateUser(username)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}else {
			return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("otp/{otp}/{username}")
	public ResponseEntity<Boolean> validateOtp(
			@PathVariable("otp") String otp,
			@PathVariable("username") String username
	){ 
		int OTP = Integer.parseInt(otp);
		if(service.validateOtp(OTP, username)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}else {
			return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
	}
}
