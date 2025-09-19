import React, { useState } from "react";
import "../../styles/Login.css";

interface Props {
  onNext: (userId: string) => void;
}

const Login: React.FC<Props> = ({ onNext }) => {
  const [userId, setUserId] = useState("");

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={() => onNext(userId)} disabled={!userId.trim()}>
        Next
      </button>
    </div>
  );
};

export default Login;
