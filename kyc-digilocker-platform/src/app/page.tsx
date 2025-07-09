'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLogin = async () => {
  
    window.location.href = '/kyc';
   
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="max-w-md w-full bg-blue-50 rounded-2xl shadow-md p-8 text-center">
        <img
          src="/digilocker-icon.png"
          alt="DigiLocker"
          className="mx-auto w-20 h-20 mb-4"
        />
        <h1 className="text-3xl font-bold text-blue-700 mb-2">LOKACHAKRA</h1>
        <p className="text-gray-600 mb-6">
          Seamlessly verify your identity using DigiLocker integration.
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl w-full transition-all"
        >
          Start Verification
        </button>
      </div>
    </div>
  );
}
