package com.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceimpl implements LoginService {

	@Autowired
	private AuthenticateOTPService authenticateOTPService;

	@Override
	public boolean validateUser(String username) {
		if (username.equals("pradips")) {
			System.out.println("Checking ");
			return true;
		}
		return false;
	}

	@Override
	public boolean validateOtp(int otp, String username) {
		// get otp from Authentication-OTP-service
		int validOTP = Integer.parseInt(authenticateOTPService.getOTP(username));
		
		if(otp == validOTP) {
			return true;
		}
		return false;
	}

}
