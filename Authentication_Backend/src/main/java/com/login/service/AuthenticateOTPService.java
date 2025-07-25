package com.login.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; 

@FeignClient(name = "AuthenticateOTPService", url = "http://localhost:3665")  // Replace with actual URL
@Service
public interface AuthenticateOTPService {

    @GetMapping("/auth/otp/{username}")
    String getOTP(@PathVariable("username") String username);
 
}
