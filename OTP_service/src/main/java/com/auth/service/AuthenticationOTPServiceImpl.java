package com.auth.service;
 
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;
 

@Service
public class AuthenticationOTPServiceImpl implements AuthenticationOTPService {
//	private static final long VALIDITY_DURATION_MS = 60 * 1000; // 60 seconds
//    private static long lastGeneratedTime = 0;
//    private static String currentOtp = null;
//
//    @Override
//    public String getOtp(String username) {
//    	long now = System.currentTimeMillis();
//    	System.out.println("Now millis->"+now);
//
//        // If no OTP generated yet or 60 seconds passed, generate new OTP
//        if (currentOtp == null || now - lastGeneratedTime >= VALIDITY_DURATION_MS) {
//            currentOtp = generateRandomOtp(8);
//            lastGeneratedTime = now;
//        }
//        return currentOtp;
//    }
//    
//    private static String generateRandomOtp(int length) {
//        Random random = new Random();
//        StringBuilder sb = new StringBuilder();
//
//        for (int i = 0; i < length; i++) {
//            sb.append(random.nextInt(10)); // digits 0-9
//        }
//        return sb.toString();
//    }
	
	
//	private static final long VALIDITY_DURATION_MS = 60 * 1000; // 60 seconds
    private static final long OTP_EXPIRATION_TIME = 60 * 1000; // OTP valid for 1 minute
    
    // Store OTPs for each user (in-memory map)
    private static final Map<String, OTPInfo> userOtpStore = new HashMap<>();

    @Override
    public String getOtp(String username) {
        long now = System.currentTimeMillis();
        System.out.println("Now -->" + now);
        OTPInfo otpInfo = userOtpStore.get(username);

        // If no OTP generated or 60 seconds have passed, generate new OTP
        if (otpInfo == null || now - otpInfo.timestamp >= OTP_EXPIRATION_TIME) {
            String newOtp = generateOtp(username);
            otpInfo = new OTPInfo(newOtp, now);
            userOtpStore.put(username, otpInfo);
        }

        return otpInfo.otp;
    }

    private String generateOtp(String username) {
        try {
            // Combine the username with the current minute to ensure a unique OTP for the user
            long currentMinute = System.currentTimeMillis() / 60000; // Get current minute timestamp
            
            // Create a string based on the username and the current minute
            String input = username + currentMinute;
            System.out.println("input--->"+ input);
            System.out.println("input.getBytes--->"+ input.getBytes());
            // Generate a SHA-256 hash of the input string
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            System.out.println("md-->"+ md);
            byte[] hashBytes = md.digest(input.getBytes());
            System.out.println("hashBytes--->"+ Arrays.toString(hashBytes));
            System.out.println("hashBytes[0]--->"+ hashBytes[0]);
            // Generate a random OTP from the hash bytes
            Random rand = new Random(hashBytes[0]);
            System.out.println("rand--->"+rand);
            return String.format("%06d", Math.abs(rand.nextInt(999999))); // Ensure a 6-digit OTP
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Helper class to store OTP and its generation timestamp for each user
    private static class OTPInfo {
        String otp;
        long timestamp;

        OTPInfo(String otp, long timestamp) {
            this.otp = otp;
            this.timestamp = timestamp;
        }
    }

}
