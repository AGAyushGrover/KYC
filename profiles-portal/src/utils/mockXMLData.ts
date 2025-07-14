// utils/mockXMLData.ts

export const mockAadhaarXML = `<?xml version="1.0" encoding="UTF-8"?>
<aadhaar>
  <name>KANIKA VERMA</name>
  <dob>2003-05-08</dob>
  <gender>F</gender>
  <uid>123456789012</uid>
  <father_name>RAJESH VERMA</father_name>
  <address>123 MAIN STREET, SECTOR 15, GURUGRAM, HARYANA - 122001</address>
  <photo>base64_encoded_photo_data</photo>
  <uri>https://digilocker.com/documents/aadhaar.xml</uri>
  <meta validation_status="valid" issued_date="2021-01-15" />
</aadhaar>`;

export const mockPANXML = `<?xml version="1.0" encoding="UTF-8"?>
<pan>
  <name>KANIKA VERMA</name>
  <dob>2003-05-08</dob>
  <father_name>RAJESH VERMA</father_name>
  <pan_number>ABCDE1234F</pan_number>
  <validity>2025-12-31</validity>
  <uri>https://digilocker.com/documents/pan.xml</uri>
  <meta validation_status="valid" issued_date="2021-03-20" />
</pan>`;

export const mockDrivingLicenseXML = `<?xml version="1.0" encoding="UTF-8"?>
<driving_license>
  <name>KANIKA VERMA</name>
  <dob>2003-05-08</dob>
  <address>123 MAIN STREET, SECTOR 15, GURUGRAM, HARYANA - 122001</address>
  <license_number>HR-05-2023-1234567</license_number>
  <issue_date>2023-06-15</issue_date>
  <validity_upto>2043-06-15</validity_upto>
  <uri>https://digilocker.com/documents/driving_license.xml</uri>
  <meta validation_status="valid" vehicle_class="LMV" />
</driving_license>`;

export const mockPassportXML = `<?xml version="1.0" encoding="UTF-8"?>
<passport>
  <name>KANIKA VERMA</name>
  <dob>2003-05-08</dob>
  <gender>F</gender>
  <passport_number>Z1234567</passport_number>
  <issue_date>2023-01-15</issue_date>
  <validity>2033-01-15</validity>
  <uri>https://digilocker.com/documents/passport.xml</uri>
  <meta validation_status="valid" issued_at="NEW DELHI" />
</passport>`;

export const mockDocumentMap = {
  aadhaar: mockAadhaarXML,
  pan: mockPANXML,
  driving_license: mockDrivingLicenseXML,
  passport: mockPassportXML
};

export function getMockXMLByType(type: string): string {
  return mockDocumentMap[type as keyof typeof mockDocumentMap] || mockAadhaarXML;
}