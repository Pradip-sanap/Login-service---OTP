import React, { useState } from "react";
import { submitOTP } from "../../services/authService";
import "../../styles/OTPAuth.css";

interface Props {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
  onShowQR: () => void;
}

const OTPAuth: React.FC<Props> = ({
  userId,
  onSuccess,
  onCancel,
  onShowQR,
}) => {
  const [otp, setOtp] = useState("");
  const [showMore, setShowMore] = useState(false);

  const handleSubmit = async () => {
    const success = await submitOTP(userId, otp);
    if (success) onSuccess();
  };

  return (
    <div className="auth-container">
      <h2>Enter Authentication OTP</h2>
      <input value={userId} disabled />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={!otp.trim()}>
        Submit
      </button>
      <button onClick={onCancel}>Cancel</button>

      <div className="show-more-container">
        <span className="link" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </span>
      </div>

      {showMore && (
        <div className="qr-option" onClick={onShowQR}>
          <img
            src="src/assets/qrCodeUrl.avif"
            alt="QR Option"
            className="qr-icon"
          />
          <span className="qr-text">Authenticate using QR</span>
        </div>
      )}
    </div>
  );
};

export default OTPAuth;
