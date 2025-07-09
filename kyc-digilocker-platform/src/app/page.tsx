'use client';

import React from "react";

export default function HomePage() {
  const handleLogin = () => {
    window.location.href = "/api/digilocker-login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>DigiLocker KYC Demo</h1>
      <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "18px" }}>
        Login with DigiLocker
      </button>
    </div>
  );
}
