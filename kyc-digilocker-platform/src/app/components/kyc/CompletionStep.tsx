interface CompletionStepProps {
  onDownload: () => void;
  onBackToHome: () => void;
}

export default function CompletionStep({ onDownload, onBackToHome }: CompletionStepProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-700">✅ Verification Complete</h2>
      <p className="text-sm text-gray-700 mb-4">
        Your KYC verification has been completed successfully
      </p>
      
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
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" 
          onClick={onDownload}
        >
          Download Certificate
        </button>
        <button 
          className="bg-gray-200 text-black px-4 py-2 rounded" 
          onClick={onBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}