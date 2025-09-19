import React, { useState, useEffect } from "react";
import { getQRCode } from "../../services/authService";
import "../../styles/QRAuth.css";

interface Props {
  userId: string;
  onCancel: () => void;
  onUseOTP: () => void;
}

const QRAuth: React.FC<Props> = ({ userId, onCancel, onUseOTP }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    getQRCode(userId).then(setQrCodeUrl);
  }, [userId]);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  return (
    <div className="auth-container">
      <h2>Scan the QR Code</h2>

      <div className="qr-section">
        {qrCodeUrl && (
          <div className="qrCode">
            <img src={"src/assets/qrCodeUrl.avif"} alt="QR Code" />
          </div>
        )}
        <button onClick={onCancel}>Cancel</button>

        <div className="show-more-container">
          <span className="link" onClick={toggleShowMore}>
            {showMore ? "Show Less" : "Show More"}
          </span>
        </div>

        {showMore && (
          <div className="otp-option" onClick={onUseOTP}>
            <img
              src="src/assets/mobile-otp.png"
              alt="Mobile OTP"
              className="otp-icon"
            />
            <span className="otp-text">Authenticate using OTP</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRAuth;
