// components/kyc/OCRComparison.tsx
import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle, XCircle, FileText, RefreshCw } from 'lucide-react';
import { XMLParser, DocumentComparator, DocumentData, UserData, ComparisonResult } from '../../utils/xmlParser';
import { getMockXMLByType } from '../../utils/mockXMLData';

interface OCRComparisonProps {
  onVerificationComplete: (result: ComparisonResult) => void;
  documentType: 'aadhaar' | 'pan' | 'driving_license' | 'passport';
}

export default function OCRComparison({ onVerificationComplete, documentType }: OCRComparisonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [xmlData, setXmlData] = useState<DocumentData | null>(null);
  const [manualInput, setManualInput] = useState<UserData>({
    name: '',
    dob: '',
    gender: '',
    documentNumber: '',
    fatherName: '',
    address: ''
  });
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'manual'>('camera');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock OCR function (replace with actual OCR service)
  const mockOCR = async (imageData: string): Promise<string> => {
    // Simulate OCR processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock OCR result based on document type
    const mockResults = {
      aadhaar: `Name: KANIKA VERMA\nDOB: 08/05/2003\nGender: Female\nUID: 123456789012\nFather: RAJESH VERMA\nAddress: 123 MAIN STREET, SECTOR 15, GURUGRAM, HARYANA - 122001`,
      pan: `Name: KANIKA VERMA\nDate of Birth: 08/05/2003\nFather's Name: RAJESH VERMA\nPAN: ABCDE1234F`,
      driving_license: `Name: KANIKA VERMA\nDOB: 08/05/2003\nDL No: HR-05-2023-1234567\nAddress: 123 MAIN STREET, SECTOR 15, GURUGRAM, HARYANA - 122001`,
      passport: `Name: KANIKA VERMA\nDate of Birth: 08/05/2003\nGender: Female\nPassport No: Z1234567`
    };

    return mockResults[documentType] || mockResults.aadhaar;
  };

  const handleCameraCapture = async () => {
    try {
      setIsProcessing(true);
      // In a real app, you would capture from camera
      // For now, we'll simulate with a delay
      const mockImageData = 'mock_image_data';
      const ocrText = await mockOCR(mockImageData);
      setOcrResult(ocrText);
      processOCRResult(ocrText);
    } catch (error) {
      console.error('Camera capture failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      // In a real app, you would process the uploaded image
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        const ocrText = await mockOCR(imageData);
        setOcrResult(ocrText);
        processOCRResult(ocrText);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const processOCRResult = (ocrText: string) => {
    // Parse OCR text to extract structured data
    const extractedData = parseOCRText(ocrText);
    setManualInput(extractedData);
    
    // Load and parse XML data
    const mockXML = getMockXMLByType(documentType);
    const parsedXML = XMLParser.parseXML(mockXML);
    
    if (parsedXML) {
      setXmlData(parsedXML);
      // Compare with XML data
      const comparison = DocumentComparator.compareDocuments(parsedXML, extractedData);
      setComparisonResult(comparison);
      onVerificationComplete(comparison);
    }
  };

  const parseOCRText = (text: string): UserData => {
    const lines = text.split('\n');
    const data: UserData = {
      name: '',
      dob: '',
      gender: '',
      documentNumber: '',
      fatherName: '',
      address: ''
    };

    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('name:')) {
        data.name = line.split(':')[1]?.trim() || '';
      } else if (lowerLine.includes('dob:') || lowerLine.includes('date of birth:')) {
        const dobMatch = line.match(/(\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})/);
        if (dobMatch) {
          data.dob = dobMatch[1];
        }
      } else if (lowerLine.includes('gender:')) {
        data.gender = line.split(':')[1]?.trim() || '';
      } else if (lowerLine.includes('father')) {
        data.fatherName = line.split(':')[1]?.trim() || '';
      } else if (lowerLine.includes('address:')) {
        data.address = line.split(':')[1]?.trim() || '';
      } else if (lowerLine.includes('uid:') || lowerLine.includes('pan:') || lowerLine.includes('no:')) {
        const match = line.match(/[A-Z0-9]+$/);
        if (match) {
          data.documentNumber = match[0];
        }
      }
    });

    return data;
  };

  const handleManualVerification = () => {
    const mockXML = getMockXMLByType(documentType);
    const parsedXML = XMLParser.parseXML(mockXML);
    
    if (parsedXML) {
      setXmlData(parsedXML);
      const comparison = DocumentComparator.compareDocuments(parsedXML, manualInput);
      setComparisonResult(comparison);
      onVerificationComplete(comparison);
    }
  };

  const handleManualInputChange = (field: keyof UserData, value: string) => {
    setManualInput(prev => ({ ...prev, [field]: value }));
  };

  const renderComparisonResult = () => {
    if (!comparisonResult) return null;

    return (
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          {comparisonResult.isValid ? (
            <CheckCircle className="text-green-500" size={20} />
          ) : (
            <XCircle className="text-red-500" size={20} />
          )}
          Verification Result
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-green-600 mb-2">Matched Fields:</h4>
            <ul className="text-sm space-y-1">
              {comparisonResult.matchedFields.map(field => (
                <li key={field} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  {field}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-red-600 mb-2">Mismatched Fields:</h4>
            <ul className="text-sm space-y-1">
              {comparisonResult.misMatchedFields.map(field => (
                <li key={field} className="flex items-center gap-2">
                  <XCircle size={16} className="text-red-500" />
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded border">
          <p className="text-sm">
            <strong>Similarity Score:</strong> {comparisonResult.similarityScore.toFixed(1)}%
          </p>
          <p className="text-sm mt-1">
            <strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
              comparisonResult.isValid 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {comparisonResult.isValid ? 'VERIFIED' : 'VERIFICATION FAILED'}
            </span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Document Verification</h2>
        <p className="text-gray-600">
          Verify your {documentType.replace('_', ' ')} document using OCR or manual input
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('camera')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'camera'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Camera size={20} className="inline mr-2" />
          Camera
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'upload'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Upload size={20} className="inline mr-2" />
          Upload
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'manual'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText size={20} className="inline mr-2" />
          Manual Input
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'camera' && (
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
            <Camera size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Click to capture document with camera</p>
            <button
              onClick={handleCameraCapture}
              disabled={isProcessing}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="inline mr-2 animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Camera className="inline mr-2" size={20} />
                  Capture Document
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Upload an image of your document</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="inline mr-2 animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="inline mr-2" size={20} />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'manual' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={manualInput.name}
                onChange={(e) => handleManualInputChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={manualInput.dob}
                onChange={(e) => handleManualInputChange('dob', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={manualInput.gender}
                onChange={(e) => handleManualInputChange('gender', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Number
              </label>
              <input
                type="text"
                value={manualInput.documentNumber}
                onChange={(e) => handleManualInputChange('documentNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter document number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Father's Name
              </label>
              <input
                type="text"
                value={manualInput.fatherName}
                onChange={(e) => handleManualInputChange('fatherName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter father's name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={manualInput.address}
                onChange={(e) => handleManualInputChange('address', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter address"
              />
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleManualVerification}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Verify Document
            </button>
          </div>
        </div>
      )}

      {/* OCR Result Display */}
      {ocrResult && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">OCR Result:</h3>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{ocrResult}</pre>
        </div>
      )}

      {/* XML Data Display */}
      {xmlData && (
        <div className="mt-6 p-4 border rounded-lg bg-blue-50">
          <h3 className="font-semibold mb-2">XML Document Data:</h3>
          <div className="text-sm space-y-1">
            <p><strong>Type:</strong> {xmlData.type}</p>
            <p><strong>Name:</strong> {xmlData.name}</p>
            <p><strong>DOB:</strong> {xmlData.dob}</p>
            <p><strong>Gender:</strong> {xmlData.gender}</p>
            <p><strong>Document Number:</strong> {xmlData.documentNumber}</p>
            {xmlData.fatherName && <p><strong>Father's Name:</strong> {xmlData.fatherName}</p>}
            {xmlData.address && <p><strong>Address:</strong> {xmlData.address}</p>}
          </div>
        </div>
      )}

      {/* Comparison Result */}
      {renderComparisonResult()}
    </div>
  );
}