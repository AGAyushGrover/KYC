
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import KYCHeader from '../components/kyc/KYCHeader';
import ProgressBar from '../components/kyc/ProgressBar';
import PersonalInfoStep from '../components/kyc/PersonalInfoStep';
import DocumentSelectionStep from '../components/kyc/DocumentSelectionStep';
import DigiLockerStep from '../components/kyc/DigiLockerStep';
import VerificationStep from '../components/kyc/VerificationStep';
import CompletionStep from '../components/kyc/CompletionStep';
import { FormData, VerificationStatus } from '../types/kyc';

export default function KYCPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
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

  const [status, setStatus] = useState<VerificationStatus>('pending');

  const nextStep = () => setStep((s) => s + 1);
  const goToStep = (stepNumber: number) => setStep(stepNumber);

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

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <KYCHeader onBackClick={() => goToStep(1)} />
      
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow border mt-6">
        <ProgressBar step={step} />

        {step === 1 && (
          <PersonalInfoStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <DocumentSelectionStep 
            documents={formData.documents}
            onNext={nextStep}
          />
        )}

        {step === 3 && (
          <DigiLockerStep 
            onConnect={connectDigiLocker}
            onNext={nextStep}
          />
        )}

        {step === 4 && (
          <VerificationStep 
            status={status}
            onVerify={handleVerify}
          />
        )}

        {step === 5 && (
          <CompletionStep 
            onDownload={handleDownload}
            onBackToHome={() => goToStep(1)}
          />
        )}
      </div>
    </div>
  );
}