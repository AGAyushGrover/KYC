import { FormData } from '../../types/kyc';
import { useState } from 'react';

interface DocumentSelectionStepProps {
  documents: FormData['documents'];
  onNext: (updatedDocs: FormData['documents']) => void;
}

export default function DocumentSelectionStep({ documents, onNext }: DocumentSelectionStepProps) {
  const [selectedDocs, setSelectedDocs] = useState<FormData['documents']>(documents);

  const getDocumentName = (key: string): string => {
    switch (key) {
      case 'aadhaar': return 'Aadhaar Card';
      case 'pan': return 'PAN Card';
      case 'dl': return 'Driving License';
      case 'passport': return 'Passport';
      default: return key;
    }
  };

  const toggleSelection = (key: string) => {
    setSelectedDocs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-gray-900">📄 Document Selection</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select the documents you want to verify from your DigiLocker
      </p>
      
      {Object.entries(selectedDocs).map(([key, val]) => (
        <div 
          key={key} 
          className="flex justify-between items-center border rounded p-3 mb-2 bg-gray-50 cursor-pointer"
          onClick={() => toggleSelection(key)}
        >
          <div>
            <p className="font-medium text-gray-900">{getDocumentName(key)}</p>
            <p className="text-sm text-gray-600">{val ? 'Selected' : 'Not Selected'}</p>
          </div>
          <input
            type="checkbox"
            checked={val}
            onChange={() => toggleSelection(key)}
            className="w-5 h-5"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ))}

      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-4" 
        onClick={() => onNext(selectedDocs)}
      >
        Connect to DigiLocker
      </button>
    </div>
  );
}
