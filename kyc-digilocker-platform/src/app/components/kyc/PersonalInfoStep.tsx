
import { FormData } from '../../types/kyc';

interface PersonalInfoStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

export default function PersonalInfoStep({ 
  formData, 
  updateFormData, 
  onNext 
}: PersonalInfoStepProps) {
  const handleInputChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-gray-900">📄 Personal Information</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please provide your basic information to begin the verification process
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input 
          className="border p-2 rounded w-full" 
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <input 
          className="border p-2 rounded w-full" 
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <input 
          className="border p-2 rounded w-full" 
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
        <input 
          type="date" 
          className="border p-2 rounded w-full"
          value={formData.dob}
          onChange={(e) => handleInputChange('dob', e.target.value)}
        />
      </div>

      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full" 
        onClick={onNext}
      >
        Continue to Document Selection
      </button>
    </div>
  );
}