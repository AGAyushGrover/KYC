// types/kyc.ts
export interface FormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  documents: {
    aadhaar: boolean;
    pan: boolean;
    dl: boolean;
    passport: boolean;
  };
}

export type VerificationStatus = 'pending' | 'verifying' | 'verified';

export interface DocumentInfo {
  key: string;
  name: string;
  required: boolean;
}