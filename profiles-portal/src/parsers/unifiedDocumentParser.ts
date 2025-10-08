// // parsers/unifiedDocumentParser.ts
// import { AadhaarParser, AadhaarData } from './aadhaarParser';
// import { PANParser, PANData } from './panParser';
// import { PassportParser, PassportData } from './passportParser';
// import { VoterIdParser, VoterIdData } from './voterIdParser';
// import { DrivingLicenseParser, DrivingLicenseData } from './drivingLicenseParser';
// import { CustomXMLParser, CustomXMLData, CustomParsingConfig } from './customXmlParser';

// export type DocumentData = AadhaarData | PANData | PassportData | VoterIdData | DrivingLicenseData | CustomXMLData;

// export interface ParseResult {
//   success: boolean;
//   data?: DocumentData;
//   errors: string[];
//   documentType: string;
// }

// export class UnifiedDocumentParser {
//   private static documentTypePatterns = {
//     aadhaar: ['aadhaar', 'uid', 'uiddata', 'printletterbarcodedata'],
//     pan: ['pan', 'pancard', 'permanent_account_number'],
//     passport: ['passport', 'passport_data'],
//     voter_id: ['voter_id', 'epic', 'voter_card', 'election_card'],
//     driving_license: ['driving_license', 'dl', 'license', 'driving_licence']
//   };

//   static parseDocument(xmlString: string, customConfig?: CustomParsingConfig): ParseResult {
//     const result: ParseResult = {
//       success: false,
//       errors: [],
//       documentType: 'unknown'
//     };

//     try {
//       // Clean and validate XML
//       const cleanedXML = this.preprocessXML(xmlString);
      
//       // Detect document type
//       const documentType = this.detectDocumentType(cleanedXML);
//       result.documentType = documentType;

//       // Parse based on document type
//       let parsedData: DocumentData | null = null;

//       switch (documentType) {
//         case 'aadhaar':
//           parsedData = AadhaarParser.parseAadhaarXML(cleanedXML);
//           break;
//         case 'pan':
//           parsedData = PANParser.parsePANXML(cleanedXML);
//           break;
//         case 'passport':
//           parsedData = PassportParser.parsePassportXML(cleanedXML);
//           break;
//         case 'voter_id':
//           parsedData = VoterIdParser.parseVoterIdXML(cleanedXML);
//           break;
//         case 'driving_license':
//           parsedData = DrivingLicenseParser.parseDrivingLicenseXML(cleanedXML);
//           break;
//         case 'custom':
//           if (customConfig) {
//             parsedData = CustomXMLParser.parseCustomXML(cleanedXML, customConfig);
//           } else {
//             parsedData = CustomXMLParser.parseWithAutoDetection(cleanedXML);
//           }
//           break;
//         default:
//           // Try auto-detection as fallback
//           parsedData = CustomXMLParser.parseWithAutoDetection(cleanedXML);
//           result.documentType = 'custom';
//       }

//       if (parsedData) {
//         // Validate parsed data
//         const validation = this.validateDocument(parsedData);
        
//         if (validation.isValid) {
//           result.success = true;
//           result.data = parsedData;
//         } else {
//           result.errors = validation.errors;
//         }
//       } else {
//         result.errors.push('Failed to parse document');
//       }

//     } catch (error) {
//       result.errors.push(`Parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     }

//     return result;
//   }

//   private static preprocessXML(xmlString: string): string {
//     // Remove BOM if present
//     let cleaned = xmlString.replace(/^\uFEFF/, '');
    
//     // Remove control characters except tab, newline, and carriage return
//     cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    
//     // Normalize whitespace
//     cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
//     // Ensure proper XML declaration if missing
//     if (!cleaned.startsWith('<?xml')) {
//       cleaned = '<?xml version="1.0" encoding="UTF-8"?>' + cleaned;
//     }
    
//     return cleaned;
//   }

//   private static detectDocumentType(xmlString: string): string {
//     const lowerXML = xmlString.toLowerCase();
    
//     // Check root element and content for document type patterns
//     for (const [docType, patterns] of Object.entries(this.documentTypePatterns)) {
//       for (const pattern of patterns) {
//         if (lowerXML.includes(`<${pattern}`) || lowerXML.includes(`${pattern}>`)) {
//           return docType;
//         }
//       }
//     }
    
//     // Additional pattern matching for specific content
//     if (lowerXML.includes('uid') && lowerXML.includes('poi')) {
//       return 'aadhaar';
//     }
    
//     if (lowerXML.includes('pan') && lowerXML.includes('permanent')) {
//       return 'pan';
//     }
    
//     if (lowerXML.includes('passport') && lowerXML.includes('nationality')) {
//       return 'passport';
//     }
    
//     if (lowerXML.includes('voter') || lowerXML.includes('epic')) {
//       return 'voter_id';
//     }
    
//     if (lowerXML.includes('license') && lowerXML.includes('vehicle')) {
//       return 'driving_license';
//     }
    
//     return 'custom';
//   }

//   private static validateDocument(data: DocumentData): { isValid: boolean; errors: string[] } {
//     switch (data.type) {
//       case 'aadhaar':
//         return AadhaarParser.validateAadhaarData(data);
//       case 'pan':
//         return PANParser.validatePANData(data);
//       case 'passport':
//         return PassportParser.validatePassportData(data);
//       case 'voter_id':
//         return VoterIdParser.validateVoterIdData(data);
//       case 'driving_license':
//         return DrivingLicenseParser.validateDrivingLicenseData(data);
//       case 'custom':
//         return CustomXMLParser.validateCustomXMLData(data);
//       default:
//         return { isValid: false, errors: ['Unknown document type'] };
//     }
//   }

//   // Utility method to get supported document types
//   static getSupportedDocumentTypes(): string[] {
//     return Object.keys(this.documentTypePatterns);
//   }

//   // Method to parse multiple documents
//   static parseMultipleDocuments(xmlStrings: string[]): ParseResult[] {
//     return xmlStrings.map(xml => this.parseDocument(xml));
//   }

//   // Method to get parser statistics
//   static getParserStatistics(results: ParseResult[]): {
//     total: number;
//     successful: number;
//     failed: number;
//     byType: { [key: string]: number };
//   } {
//     const stats = {
//       total: results.length,
//       successful: 0,
//       failed: 0,
//       byType: {} as { [key: string]: number }
//     };

//     results.forEach(result => {
//       if (result.success) {
//         stats.successful++;
//       } else {
//         stats.failed++;
//       }
      
//       stats.byType[result.documentType] = (stats.byType[result.documentType] || 0) + 1;
//     });

//     return stats;
//   }
// }