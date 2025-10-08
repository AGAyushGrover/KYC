// import { AadhaarData, AadhaarParser } from '../parsers/aadhaarParser';

// export interface FormData {
//   fullName: string;
//   age: string;
//   dob: string;
//   email: string;
//   phone: string;
//   profilePhoto: string;
//   education: string;
//   residence: string;
//   addressCity: string;
//   addressState: string;
//   addressCountry: string;
//   currentResidence: string;
//   currentCity: string;
//   currentState: string;
//   currentCountry: string;
//   about: string;
//   interests: string;
//   selectedIds: string[];
//   idDetails: {
//     aadhar: string;
//     drivingLicense: string;
//     passport: string;
//     voterIdCard: string;
//     panCard: string;
//   };
// }

// export interface ComparisonResult {
//   isMatch: boolean;
//   matchedFields: string[];
//   misMatchedFields: string[];
//   details: {
//     name: {
//       form: string;
//       xml: string;
//       match: boolean;
//     };
//     dob: {
//       form: string;
//       xml: string;
//       match: boolean;
//     };
//     documentNumber: {
//       form: string;
//       xml: string;
//       match: boolean;
//     };
//     address?: {
//       form: string;
//       xml: string;
//       match: boolean;
//     };
//   };
//   confidence: number;
//   errors: string[];
// }

// export class AadhaarComparison {
//   /**
//    * Compare form data with parsed Aadhaar XML data
//    */
//   static compareWithXML(formData: FormData, xmlString: string): ComparisonResult {
//     const errors: string[] = [];
    
//     // Check if Aadhaar is selected in form
//     if (!formData.selectedIds.includes('aadhar')) {
//       errors.push('Aadhaar card is not selected in the form');
//     }

//     // Parse the XML data
//     const parsedAadhaarData = AadhaarParser.parseAadhaarXML(xmlString);
    
//     if (!parsedAadhaarData) {
//       errors.push('Failed to parse Aadhaar XML data');
//       return this.createErrorResult(errors);
//     }

//     // Validate parsed data
//     const validation = AadhaarParser.validateAadhaarData(parsedAadhaarData);
//     if (!validation.isValid) {
//       errors.push(...validation.errors);
//     }

//     return this.performComparison(formData, parsedAadhaarData, errors);
//   }

//   /**
//    * Direct comparison with parsed Aadhaar data
//    */
//   static compareWithParsedData(formData: FormData, aadhaarData: AadhaarData): ComparisonResult {
//     const errors: string[] = [];
    
//     if (!formData.selectedIds.includes('aadhar')) {
//       errors.push('Aadhaar card is not selected in the form');
//     }

//     const validation = AadhaarParser.validateAadhaarData(aadhaarData);
//     if (!validation.isValid) {
//       errors.push(...validation.errors);
//     }

//     return this.performComparison(formData, aadhaarData, errors);
//   }

//   private static performComparison(
//     formData: FormData, 
//     aadhaarData: AadhaarData, 
//     errors: string[]
//   ): ComparisonResult {
//     const matchedFields: string[] = [];
//     const misMatchedFields: string[] = [];

//     // Compare Name
//     const nameMatch = this.compareName(formData.fullName, aadhaarData.name);
//     const nameComparison = {
//       form: formData.fullName,
//       xml: aadhaarData.name,
//       match: nameMatch
//     };
    
//     if (nameMatch) {
//       matchedFields.push('name');
//     } else {
//       misMatchedFields.push('name');
//     }

//     // Compare Date of Birth
//     const dobMatch = this.compareDOB(formData.dob, aadhaarData.dob);
//     const dobComparison = {
//       form: formData.dob,
//       xml: aadhaarData.dob,
//       match: dobMatch
//     };
    
//     if (dobMatch) {
//       matchedFields.push('dob');
//     } else {
//       misMatchedFields.push('dob');
//     }

//     // Compare Aadhaar Number
//     const docNumberMatch = this.compareAadhaarNumber(
//       formData.idDetails.aadhar, 
//       aadhaarData.documentNumber
//     );
//     const docNumberComparison = {
//       form: formData.idDetails.aadhar,
//       xml: aadhaarData.documentNumber,
//       match: docNumberMatch
//     };
    
//     if (docNumberMatch) {
//       matchedFields.push('documentNumber');
//     } else {
//       misMatchedFields.push('documentNumber');
//     }

//     // Compare Address (optional)
//     let addressComparison;
//     if (aadhaarData.address) {
//       const addressMatch = this.compareAddress(formData, aadhaarData.address);
//       addressComparison = {
//         form: this.constructFormAddress(formData),
//         xml: aadhaarData.address,
//         match: addressMatch
//       };
      
//       if (addressMatch) {
//         matchedFields.push('address');
//       } else {
//         misMatchedFields.push('address');
//       }
//     }

//     // Calculate confidence score
//     const confidence = this.calculateConfidence(matchedFields, misMatchedFields);

//     // Determine overall match
//     const isMatch = misMatchedFields.length === 0 && matchedFields.length >= 3;

//     return {
//       isMatch,
//       matchedFields,
//       misMatchedFields,
//       details: {
//         name: nameComparison,
//         dob: dobComparison,
//         documentNumber: docNumberComparison,
//         ...(addressComparison && { address: addressComparison })
//       },
//       confidence,
//       errors
//     };
//   }

//   private static compareName(formName: string, xmlName: string): boolean {
//     if (!formName || !xmlName) return false;
    
//     // Normalize names for comparison
//     const normalizeNameForComparison = (name: string): string => {
//       return name
//         .toLowerCase()
//         .replace(/[^a-z\s]/g, '') // Remove special characters
//         .replace(/\s+/g, ' ') // Replace multiple spaces with single space
//         .trim();
//     };

//     const normalizedFormName = normalizeNameForComparison(formName);
//     const normalizedXmlName = normalizeNameForComparison(xmlName);

//     // Exact match
//     if (normalizedFormName === normalizedXmlName) return true;

//     // Check if names contain each other (for partial matches)
//     const formWords = normalizedFormName.split(' ');
//     const xmlWords = normalizedXmlName.split(' ');

//     // Check if at least 70% of words match
//     const matchingWords = formWords.filter(word => 
//       xmlWords.some(xmlWord => xmlWord.includes(word) || word.includes(xmlWord))
//     );

//     return matchingWords.length >= Math.ceil(formWords.length * 0.7);
//   }

//   private static compareDOB(formDOB: string, xmlDOB: string): boolean {
//     if (!formDOB || !xmlDOB) return false;

//     // Handle different date formats
//     const parseDate = (dateStr: string): Date | null => {
//       // Try different date formats
//       const formats = [
//         /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
//         /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
//         /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
//         /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
//         /^\d{4}$/ // Year only
//       ];

//       // If it's just a year, compare years
//       if (/^\d{4}$/.test(dateStr)) {
//         return new Date(parseInt(dateStr), 0, 1);
//       }

//       const date = new Date(dateStr);
//       return isNaN(date.getTime()) ? null : date;
//     };

//     const formDate = parseDate(formDOB);
//     const xmlDate = parseDate(xmlDOB);

//     if (!formDate || !xmlDate) return false;

//     // Compare dates (with some tolerance for time zones)
//     return Math.abs(formDate.getTime() - xmlDate.getTime()) < 24 * 60 * 60 * 1000;
//   }

//   private static compareAadhaarNumber(formAadhaar: string, xmlAadhaar: string): boolean {
//     if (!formAadhaar || !xmlAadhaar) return false;

//     // Remove spaces and special characters
//     const normalizeAadhaar = (aadhaar: string): string => {
//       return aadhaar.replace(/\s+/g, '').replace(/[^0-9]/g, '');
//     };

//     const normalizedFormAadhaar = normalizeAadhaar(formAadhaar);
//     const normalizedXmlAadhaar = normalizeAadhaar(xmlAadhaar);

//     return normalizedFormAadhaar === normalizedXmlAadhaar;
//   }

//   private static compareAddress(formData: FormData, xmlAddress: string): boolean {
//     if (!xmlAddress) return false;

//     const formAddress = this.constructFormAddress(formData);
//     if (!formAddress) return false;

//     // Normalize addresses for comparison
//     const normalizeAddress = (address: string): string => {
//       return address
//         .toLowerCase()
//         .replace(/[^a-z0-9\s]/g, '')
//         .replace(/\s+/g, ' ')
//         .trim();
//     };

//     const normalizedFormAddress = normalizeAddress(formAddress);
//     const normalizedXmlAddress = normalizeAddress(xmlAddress);

//     // Check if key components match
//     const formComponents = [
//       formData.residence,
//       formData.addressCity,
//       formData.addressState,
//       formData.addressCountry
//     ].filter(Boolean).map(comp => normalizeAddress(comp));

//     const xmlAddressNormalized = normalizedXmlAddress;

//     // Check if at least 50% of form components are found in XML address
//     const matchingComponents = formComponents.filter(comp => 
//       xmlAddressNormalized.includes(comp)
//     );

//     return matchingComponents.length >= Math.ceil(formComponents.length * 0.5);
//   }

//   private static constructFormAddress(formData: FormData): string {
//     const addressParts = [
//       formData.residence,
//       formData.addressCity,
//       formData.addressState,
//       formData.addressCountry
//     ].filter(Boolean);

//     return addressParts.join(', ');
//   }

//   private static calculateConfidence(matchedFields: string[], misMatchedFields: string[]): number {
//     const totalFields = matchedFields.length + misMatchedFields.length;
//     if (totalFields === 0) return 0;

//     const baseConfidence = (matchedFields.length / totalFields) * 100;
    
//     // Boost confidence for critical field matches
//     let confidenceBoost = 0;
//     if (matchedFields.includes('name')) confidenceBoost += 10;
//     if (matchedFields.includes('dob')) confidenceBoost += 10;
//     if (matchedFields.includes('documentNumber')) confidenceBoost += 15;

//     return Math.min(100, Math.round(baseConfidence + confidenceBoost));
//   }

//   // Changed from private to public
//   public static createErrorResult(errors: string[]): ComparisonResult {
//     return {
//       isMatch: false,
//       matchedFields: [],
//       misMatchedFields: [],
//       details: {
//         name: { form: '', xml: '', match: false },
//         dob: { form: '', xml: '', match: false },
//         documentNumber: { form: '', xml: '', match: false }
//       },
//       confidence: 0,
//       errors
//     };
//   }
// }

// // Usage example:
// export const useAadhaarComparison = () => {
//   const compareAadhaarData = async (formData: FormData, xmlString: string) => {
//     try {
//       const result = AadhaarComparison.compareWithXML(formData, xmlString);
//       return result;
//     } catch (error) {
//       console.error('Aadhaar comparison error:', error);
//       return AadhaarComparison.createErrorResult(['Comparison failed due to unexpected error']);
//     }
//   };

//   return { compareAadhaarData };
// };