
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export default function KYCFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    documents: {
      aadhaar: true,
      pan: true,
      dl: false,
      passport: false,
    },
  });

  const [status, setStatus] = useState<'pending' | 'verifying' | 'verified'>('pending');

  const nextStep = () => setStep((s) => s + 1);

  const connectDigiLocker = () => {
    window.location.href = "/api/digilocker-login";
  };

  const handleVerify = () => {
    setStatus('verifying');
    setTimeout(() => {
      setStatus('verified');
      nextStep();
    }, 2000);
  };

  const handleDownload = () => {
    alert("Downloading certificate...");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <button className="text-blue-700 flex items-center gap-1" onClick={() => setStep(1)}>
          ← Back to Home
        </button>
        <div className="flex items-center gap-2 text-black font-semibold">
          <ShieldCheck className="text-blue-600" size={18} />
          <span>KYC Verification</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow border mt-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800">Verification Progress</h3>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div className={`h-2 bg-black rounded transition-all duration-500`} style={{ width: `${step * 20}%` }}></div>
          </div>
          <p className="text-right text-sm mt-1 text-gray-600">{step * 20}% Complete</p>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-1 text-gray-900">📄 Personal Information</h2>
            <p className="text-sm text-gray-600 mb-4">Please provide your basic information to begin the verification process</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input className="border p-2 rounded w-full" placeholder="Enter your full name" onChange={e => setFormData({...formData, name: e.target.value})} />
              <input className="border p-2 rounded w-full" placeholder="Enter your email" onChange={e => setFormData({...formData, email: e.target.value})} />
              <input className="border p-2 rounded w-full" placeholder="Enter your phone number" onChange={e => setFormData({...formData, phone: e.target.value})} />
              <input type="date" className="border p-2 rounded w-full" onChange={e => setFormData({...formData, dob: e.target.value})} />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full" onClick={nextStep}>
              Continue to Document Selection
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-1 text-gray-900">📄 Document Selection</h2>
            <p className="text-sm text-gray-600 mb-4">Select the documents you want to verify from your DigiLocker</p>
            {Object.entries(formData.documents).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center border rounded p-3 mb-2 bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{key === 'aadhaar' ? 'Aadhaar Card' : key === 'pan' ? 'PAN Card' : key === 'dl' ? 'Driving License' : 'Passport'}</p>
                  <p className="text-sm text-gray-600">{val ? 'Required' : 'Optional'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${val ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}>{val ? 'Required' : 'Optional'}</span>
              </div>
            ))}

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-4" onClick={nextStep}>
              Connect to DigiLocker
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">🔐 Connect DigiLocker</h2>
            <p className="text-sm text-gray-600 mb-6">Securely connect your DigiLocker account to fetch your documents</p>
            <div className="text-sm text-gray-500 mb-6">Your documents will be fetched securely from DigiLocker. We don't store any of your personal documents.</div>
            <button onClick={connectDigiLocker} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full max-w-xs">
              Connect DigiLocker Account
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">⏱️ Verification in Progress</h2>
            <p className="text-sm text-gray-600 mb-6">We're verifying your documents. This usually takes less than 30 seconds.</p>
            <div className="w-full bg-gray-200 h-3 rounded">
              <div className={`h-3 bg-black rounded transition-all duration-1000`} style={{ width: `${status === 'verifying' ? '50%' : '0%'}` }}></div>
            </div>
            <p className="mt-2 text-gray-700">{status === 'verifying' ? '50% Complete' : '...'}</p>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={handleVerify}>
              Finish Verification
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700">✅ Verification Complete</h2>
            <p className="text-sm text-gray-700 mb-4">Your KYC verification has been completed successfully</p>
            <ul className="text-left mb-4 text-gray-800">
              <li>✔️ Aadhaar Card - Verified</li>
              <li>✔️ PAN Card - Verified</li>
              <li>⏳ Driving License - Pending</li>
              <li>⏳ Passport - Pending</li>
            </ul>
            <div className="border p-4 rounded mb-4 text-left text-gray-800 bg-gray-50">
              <h3 className="font-semibold">Verification Summary</h3>
              <p>Verification ID: KYC-{Date.now()}</p>
              <p>Completed: {new Date().toLocaleString()}</p>
              <p>Status: Verified</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={handleDownload}>Download Certificate</button>
              <button className="bg-gray-200 text-black px-4 py-2 rounded" onClick={() => setStep(1)}>Back to Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}