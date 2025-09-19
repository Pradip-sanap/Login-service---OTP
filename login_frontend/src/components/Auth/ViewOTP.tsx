import React, { useState, useEffect, useRef } from "react";
import "../../styles/ViewOTP.css";
import { getOTP } from "../../services/authService";

interface Props {
  email: string;
}

const ViewOTP: React.FC<Props> = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [viewed, setViewed] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const fetchAndResetOTP = async () => {
    const newOtp = await getOTP(email);
    setOtp(newOtp);
    setTimeLeft(60);
  };

  useEffect(() => {
    if (viewed) {
      fetchAndResetOTP();
      intervalRef.current = setInterval(fetchAndResetOTP, 60000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [viewed]);

  useEffect(() => {
    if (!viewed || timeLeft <= 0) return;

    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft, viewed]);

  const handleViewOTP = () => {
    setViewed(true);
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = ((60 - timeLeft) / 60) * circumference;

  return (
    <div className="view-otp-wrapper">
      <div className="otp-card-container">
        <div className="header">
          <span className="company-name">MyCompany</span>
          <span className="menu-dots">⋮</span>
        </div>

        <div className="otp-card">
          {!viewed ? (
            <>
              <h2 className="otp-title" onClick={handleViewOTP}>
                View OTP
              </h2>
              <p className="email">{email}</p>
            </>
          ) : (
            <>
              <div className="otp-display">
                <div className="timer">
                  <svg width="80" height="80">
                    <circle
                      r={radius}
                      cx="40"
                      cy="40"
                      stroke="#ddd"
                      strokeWidth="5"
                      fill="none"
                    />
                    <circle
                      r={radius}
                      cx="40"
                      cy="40"
                      stroke="black"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - progress}
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <span className="time-text">{timeLeft}s</span>
                </div>

                <div className="otp-value">{otp}</div>
              </div>
              <p className="email email-bottom">{email}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOTP;
