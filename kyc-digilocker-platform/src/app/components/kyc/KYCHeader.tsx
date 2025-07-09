import { ShieldCheck } from 'lucide-react';

interface KYCHeaderProps {
  onBackClick: () => void;
}

export default function KYCHeader({ onBackClick }: KYCHeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b">
      <button 
        className="text-blue-700 flex items-center gap-1" 
        onClick={onBackClick}
      >
        ← Back to Home
      </button>
      <div className="flex items-center gap-2 text-black font-semibold">
        <ShieldCheck className="text-blue-600" size={18} />
        <span>KYC Verification</span>
      </div>
    </header>
  );
}