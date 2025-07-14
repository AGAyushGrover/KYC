// utils/mockDocumentMap.ts
import { mockAadhaarXML } from './mockAadhaarXML';
import { mockPANXML } from './mockPANXML';
import { mockDrivingLicenseXML } from './mockDrivingLicenseXML';
import { mockPassportXML } from './mockPassportXML';
import { mockVoterIDXML } from './mockVoterIDXML';

export const mockDocumentMap = {
  aadhaar: mockAadhaarXML,
  pan: mockPANXML,
  driving_license: mockDrivingLicenseXML,
  passport: mockPassportXML,
  voter_id: mockVoterIDXML
};

export function getMockXMLByType(type: string): string {
  return mockDocumentMap[type as keyof typeof mockDocumentMap] || mockAadhaarXML;
}