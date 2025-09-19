import React, { useState } from "react";
import Login from "../components/Auth/Login";
import QRAuth from "../components/Auth/QRAuth";
import OTPAuth from "../components/Auth/OTPAuth";
import Success from "../components/Auth/Success";

type Step = "login" | "qr" | "otp" | "success";

const AuthPage: React.FC = () => {
  const [step, setStep] = useState<Step>("login");
  const [userId, setUserId] = useState("");

  const renderStep = () => {
    switch (step) {
      case "login":
        return (
          <Login
            onNext={(id) => {
              setUserId(id);
              setStep("qr");
            }}
          />
        );
      case "qr":
        return (
          <QRAuth
            userId={userId}
            onCancel={() => setStep("login")}
            onUseOTP={() => setStep("otp")}
          />
        );
      case "otp":
        return (
          <OTPAuth
            userId={userId}
            onSuccess={() => setStep("success")}
            onCancel={() => setStep("login")}
            onShowQR={() => setStep("qr")}
          />
        );
      case "success":
        return <Success />;
    }
  };

  return <div className="page-wrapper">{renderStep()}</div>;
};

export default AuthPage;
