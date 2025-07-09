interface DigiLockerStepProps {
  onConnect: () => void;
  onNext: () => void;
}

export default function DigiLockerStep({ onConnect, onNext }: DigiLockerStepProps) {
  const handleConnect = () => {
    onConnect();
    // In a real app, you'd wait for the connection to complete
    // For demo purposes, we'll just move to the next step
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">🔐 Connect DigiLocker</h2>
      <p className="text-sm text-gray-600 mb-6">
        Securely connect your DigiLocker account to fetch your documents
      </p>
      <div className="text-sm text-gray-500 mb-6">
        Your documents will be fetched securely from DigiLocker. We don't store any of your personal documents.
      </div>
      <button 
        onClick={handleConnect}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full max-w-xs"
      >
        Connect DigiLocker Account
      </button>
    </div>
  );
}