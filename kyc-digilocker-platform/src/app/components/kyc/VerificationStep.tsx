import { VerificationStatus } from '../../types/kyc';

interface VerificationStepProps {
  status: VerificationStatus;
  onVerify: () => void;
}

export default function VerificationStep({ status, onVerify }: VerificationStepProps) {
  const getProgressWidth = () => {
    switch (status) {
      case 'pending': return '0%';
      case 'verifying': return '50%';
      case 'verified': return '100%';
      default: return '0%';
    }
  };

  const getProgressText = () => {
    switch (status) {
      case 'pending': return 'Ready to verify';
      case 'verifying': return '50% Complete';
      case 'verified': return 'Verification Complete';
      default: return '...';
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">⏱️ Verification in Progress</h2>
      <p className="text-sm text-gray-600 mb-6">
        We're verifying your documents. This usually takes less than 30 seconds.
      </p>
      
      <div className="w-full bg-gray-200 h-3 rounded">
        <div 
          className="h-3 bg-black rounded transition-all duration-1000"
          style={{ width: getProgressWidth() }}
        />
      </div>
      <p className="mt-2 text-gray-700">{getProgressText()}</p>
      
      {status === 'pending' && (
        <button 
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" 
          onClick={onVerify}
        >
          Start Verification
        </button>
      )}
      
      {status === 'verifying' && (
        <div className="mt-6 text-blue-600 font-medium">
          Verifying documents...
        </div>
      )}
    </div>
  );
}