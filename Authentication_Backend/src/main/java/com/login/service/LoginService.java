package com.login.service;

public interface LoginService {
	public boolean validateUser(String username);
	public boolean validateOtp(int otp, String username);
	
	
}
