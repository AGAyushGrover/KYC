import { AadhaarParser, AadhaarData } from '../parsers/aadhaarParser';
import { PANParser, PANData } from '../parsers/panParser';
import {VoterIdParser, VoterIdData } from '../parsers/voterIdParser';
import { PassportParser, PassportData } from '../parsers/passportParser';
import { DrivingLicenseParser, DrivingLicenseData } from '../parsers/drivingLicenseParser';
import { CustomXMLParser } from '../parsers/customXmlParser';
import { UnifiedDocumentParser } from '../parsers/unifiedDocumentParser';

export interface NormalizedDocumentData {
  fullName: string;
  dob: string; 
  gender: string;
  phone?: string;
  email?: string;
  address: {
    permanent: string;
    city: string;
    state: string;
    country: string;
    pincode?: string;
  };
  documentNumber: string;
  documentType: 'aadhaar' | 'pan' | 'voter' | 'passport' | 'driving';
  fatherName?: string;
  age?: string;
  issueDate?: string;
  expiryDate?: string;
  placeOfBirth?: string;
  vehicleClass?: string; 
}

export interface ComparisonResult {
  field: string;
  formValue: string;
  documentValue: string;
  match: boolean;
  confidence: number;
  matchType: 'exact' | 'fuzzy' | 'partial' | 'none';
  suggestions?: string[];
}

export interface ValidationResult {
  isValid: boolean;
  overallConfidence: number;
  matchedFields: number;
  totalFields: number;
  results: ComparisonResult[];
  errors: string[];
  warnings: string[];
  documentType: string;
  parsedSuccessfully: boolean;
}

export interface UpdatedPANData {
  type: 'pan';
  name: string;
  fatherName: string;
  dob: string;
  panNumber: string;
  issueDate?: string;
}

export interface UpdatedVoterIDData {
  type: 'voter';
  name: string;
  fatherName?: string;
  age?: string;
  address?: string;
  voterIdNumber: string;
  issueDate?: string;
}

export interface UpdatedPassportData {
  type: 'passport';
  name: string;
  dob: string;
  placeOfBirth?: string;
  passportNumber: string;
  address?: string;
  issueDate?: string;
  expiryDate?: string;
}

export interface UpdatedDrivingLicenseData {
  type: 'driving';
  name: string;
  dob: string;
  address?: string;
  licenseNumber: string;
  issueDate?: string;
  expiryDate?: string;
  vehicleClass?: string;
}

export type DocumentData = AadhaarData | PANData | VoterIdData | PassportData | DrivingLicenseData;
export class DocumentParserFactory {
 
  static async parseDocument(documentType: string, inputData: string | File): Promise<DocumentData> {
    try {

      let result: DocumentData | null = null;
       switch (documentType.toLowerCase()) {
      case 'aadhaar':
      case 'aadhar':
        if (typeof inputData === 'string') {
          result = AadhaarParser.parseAadhaarXML(inputData);
        } else {
          const text = await this.fileToString(inputData);
          result = AadhaarParser.parseAadhaarXML(text);
        }
        break;
        
       case 'pan':
      case 'pancard':
        if (typeof inputData === 'string') {
          result = PANParser.parsePANXML(inputData);
        } else {
          const text = await this.fileToString(inputData);
          result = PANParser.parsePANXML(text);
        }
        break;
        
         case 'voter':
      case 'voterid':
      case 'votercard':
        if (typeof inputData === 'string') {
          result = VoterIdParser.parseVoterIdXML(inputData);
        } else {
          const text = await this.fileToString(inputData);
          result = VoterIdParser.parseVoterIdXML(text);
        }
        break;
        
        case 'passport':
        if (typeof inputData === 'string') {
          result = PassportParser.parsePassportXML(inputData);
        } else {
          const text = await this.fileToString(inputData);
          result = PassportParser.parsePassportXML(text);
        }
        break;

        case 'driving':
      case 'drivinglicense':
      case 'dl':
        if (typeof inputData === 'string') {
          result = DrivingLicenseParser.parseDrivingLicenseXML(inputData);
        } else {
          const text = await this.fileToString(inputData);
          result = DrivingLicenseParser.parseDrivingLicenseXML(text);
        }
        break;
        
        default:
        if (typeof inputData === 'string') {
          result = UnifiedDocumentParser.parseDocument(inputData);
        } else {
          const text = await this.fileToString(inputData);
          result = UnifiedDocumentParser.parseDocument(text);
        }
    }
    
    
  if (!result) {
      throw new Error(`Failed to parse ${documentType}: Parser returned null`);
    }
    
    return result;
  } catch (error) {
    console.error(`Error parsing ${documentType}:`, error);
    throw new Error(`Failed to parse ${documentType}: ${error.message}`);
  }
}


  static async autoParseDocument(inputData: string | File): Promise<DocumentData> {
    const text = typeof inputData === 'string' ? inputData : await this.fileToString(inputData);
    
    const documentType = this.detectDocumentType(text);
    
    if (documentType) {
      return this.parseDocument(documentType, text);
    }
    
    return UnifiedDocumentParser.parseDocument(text);
  }

  private static async fileToString(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }

  private static detectDocumentType(content: string): string | null {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('aadhaar') || lowerContent.includes('uid')) {
      return 'aadhaar';
    }
    if (lowerContent.includes('pan') || lowerContent.includes('permanent account number')) {
      return 'pan';
    }
    if (lowerContent.includes('voter') || lowerContent.includes('epic')) {
      return 'voter';
    }
    if (lowerContent.includes('passport') || lowerContent.includes('republic of india')) {
      return 'passport';
    }
    if (lowerContent.includes('driving') || lowerContent.includes('license')) {
      return 'driving';
    }
    
    return null;
  }
}

export class DataNormalizer {
  

  static normalizeDocument(documentData: DocumentData): NormalizedDocumentData {
    switch (documentData.type) {
      case 'aadhaar':
        return this.normalizeAadhaar(documentData as AadhaarData);
      case 'pan':
        return this.normalizePAN(documentData as UpdatedPANData);
      case 'voter':
        return this.normalizeVoterID(documentData as UpdatedVoterIDData);
      case 'passport':
        return this.normalizePassport(documentData as UpdatedPassportData);
      case 'driving':
        return this.normalizeDrivingLicense(documentData as UpdatedDrivingLicenseData);
      default:
        throw new Error(`Unsupported document type: ${(documentData as any).type}`);
    }
  }

  
  static normalizeAadhaar(aadhaarData: AadhaarData): NormalizedDocumentData {
    return {
      fullName: this.normalizeName(aadhaarData.name),
      dob: this.normalizeDOB(aadhaarData.dob),
      gender: this.normalizeGender(aadhaarData.gender),
      address: this.normalizeAddress(aadhaarData.address || ''),
      documentNumber: this.normalizeDocumentNumber(aadhaarData.documentNumber, 'aadhaar'),
      documentType: 'aadhaar',
      fatherName: aadhaarData.fatherName ? this.normalizeName(aadhaarData.fatherName) : undefined,
      phone: aadhaarData.mobile ? this.normalizePhone(aadhaarData.mobile) : undefined,
      email: aadhaarData.email ? this.normalizeEmail(aadhaarData.email) : undefined,
    };
  }

 
  static normalizePAN(panData: UpdatedPANData): NormalizedDocumentData {
    return {
      fullName: this.normalizeName(panData.name),
      dob: this.normalizeDOB(panData.dob),
      gender: '',
      address: {
        permanent: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
      },
      documentNumber: this.normalizeDocumentNumber(panData.panNumber, 'pan'),
      documentType: 'pan',
      fatherName: panData.fatherName ? this.normalizeName(panData.fatherName) : undefined,
      issueDate: panData.issueDate ? this.normalizeDOB(panData.issueDate) : undefined,
    };
  }


  static normalizeVoterID(voterData: UpdatedVoterIDData): NormalizedDocumentData {
    return {
      fullName: this.normalizeName(voterData.name),
      dob: '', 
      gender: '',
      address: this.normalizeAddress(voterData.address || ''),
      documentNumber: this.normalizeDocumentNumber(voterData.voterIdNumber, 'voter'),
      documentType: 'voter',
      fatherName: voterData.fatherName ? this.normalizeName(voterData.fatherName) : undefined,
      age: voterData.age || '',
      issueDate: voterData.issueDate ? this.normalizeDOB(voterData.issueDate) : undefined,
    };
  }

 
  static normalizePassport(passportData: UpdatedPassportData): NormalizedDocumentData {
    return {
      fullName: this.normalizeName(passportData.name),
      dob: this.normalizeDOB(passportData.dob),
      gender: '',
      address: this.normalizeAddress(passportData.address || ''),
      documentNumber: this.normalizeDocumentNumber(passportData.passportNumber, 'passport'),
      documentType: 'passport',
      placeOfBirth: passportData.placeOfBirth,
      issueDate: passportData.issueDate ? this.normalizeDOB(passportData.issueDate) : undefined,
      expiryDate: passportData.expiryDate ? this.normalizeDOB(passportData.expiryDate) : undefined,
    };
  }


  static normalizeDrivingLicense(dlData: UpdatedDrivingLicenseData): NormalizedDocumentData {
    return {
      fullName: this.normalizeName(dlData.name),
      dob: this.normalizeDOB(dlData.dob),
      gender: '',
      address: this.normalizeAddress(dlData.address || ''),
      documentNumber: this.normalizeDocumentNumber(dlData.licenseNumber, 'driving'),
      documentType: 'driving',
      issueDate: dlData.issueDate ? this.normalizeDOB(dlData.issueDate) : undefined,
      expiryDate: dlData.expiryDate ? this.normalizeDOB(dlData.expiryDate) : undefined,
      vehicleClass: dlData.vehicleClass,
    };
  }

  
  static normalizeForm(formData: any): NormalizedDocumentData {
    const documentType = this.getSelectedDocumentType(formData);
    const documentNumber = this.getDocumentNumber(formData, documentType);

    return {
      fullName: this.normalizeName(formData.fullName || ''),
      dob: this.normalizeDOB(formData.dob || ''),
      gender: this.normalizeGender(formData.gender || ''),
      phone: this.normalizePhone(formData.phone || ''),
      email: this.normalizeEmail(formData.email || ''),
      address: {
        permanent: this.normalizeAddressString(formData.residence || ''),
        city: this.normalizeCity(formData.addressCity || ''),
        state: this.normalizeState(formData.addressState || ''),
        country: this.normalizeCountry(formData.addressCountry || ''),
        pincode: this.extractPincode(formData.residence || '')
      },
      documentNumber: this.normalizeDocumentNumber(documentNumber, documentType),
      documentType,
      age: formData.age || '',
      fatherName: formData.fatherName ? this.normalizeName(formData.fatherName) : undefined,
    };
  }

  
  private static normalizeName(name: string): string {
    return name
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  private static normalizeDOB(dob: string): string {
    if (!dob) return '';
    
    const dateFormats = [
      /^(\d{4})-(\d{2})-(\d{2})$/,
      /^(\d{2})-(\d{2})-(\d{4})$/,
      /^(\d{2})\/(\d{2})\/(\d{4})$/,
      /^(\d{4})\/(\d{2})\/(\d{2})$/,
      /^(\d{2})-(\d{2})-(\d{2})$/,
      /^(\d{2})\/(\d{2})\/(\d{2})$/,
    ];

    for (const format of dateFormats) {
      const match = dob.match(format);
      if (match) {
        if (format.source.includes('(\\d{4})-(\\d{2})-(\\d{2})')) {
          return dob;
        } else if (format.source.includes('(\\d{2})-(\\d{2})-(\\d{4})')) {
          return `${match[3]}-${match[2]}-${match[1]}`;
        } else if (format.source.includes('(\\d{2})\\/(\\d{2})\\/(\\d{4})')) {
          return `${match[3]}-${match[2]}-${match[1]}`;
        } else if (format.source.includes('(\\d{4})\\/(\\d{2})\\/(\\d{2})')) {
          return `${match[1]}-${match[2]}-${match[3]}`;
        } else if (format.source.includes('(\\d{2})-(\\d{2})-(\\d{2})')) {
          const year = parseInt(match[3]) < 50 ? `20${match[3]}` : `19${match[3]}`;
          return `${year}-${match[2]}-${match[1]}`;
        } else if (format.source.includes('(\\d{2})\\/(\\d{2})\\/(\\d{2})')) {
          const year = parseInt(match[3]) < 50 ? `20${match[3]}` : `19${match[3]}`;
          return `${year}-${match[2]}-${match[1]}`;
        }
      }
    }

    return dob;
  }

  private static normalizeGender(gender: string): string {
    const normalized = gender.toLowerCase().trim();
    if (normalized === 'm' || normalized === 'male') return 'Male';
    if (normalized === 'f' || normalized === 'female') return 'Female';
    if (normalized === 'o' || normalized === 'other') return 'Other';
    return gender;
  }

  private static normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  private static normalizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  private static normalizeAddressString(address: string): string {
    return address.trim().replace(/\s+/g, ' ');
  }

  private static normalizeAddress(fullAddress: string): NormalizedDocumentData['address'] {
    const parts = fullAddress.split(',').map(part => part.trim());
    
    return {
      permanent: fullAddress,
      city: this.extractCity(parts),
      state: this.extractState(parts),
      country: this.extractCountry(parts),
      pincode: this.extractPincode(fullAddress)
    };
  }

  private static normalizeCity(city: string): string {
    return city.trim().replace(/\s+/g, ' ');
  }

  private static normalizeState(state: string): string {
    return state.trim().replace(/\s+/g, ' ');
  }

  private static normalizeCountry(country: string): string {
    return country.trim().replace(/\s+/g, ' ');
  }

  private static extractCity(addressParts: string[]): string {
    return addressParts.length > 2 ? addressParts[addressParts.length - 3] : '';
  }

  private static extractState(addressParts: string[]): string {
    return addressParts.length > 1 ? addressParts[addressParts.length - 2] : '';
  }

  private static extractCountry(addressParts: string[]): string {
    return addressParts.length > 0 ? addressParts[addressParts.length - 1] : '';
  }

  private static extractPincode(address: string): string {
    const pincodeMatch = address.match(/\b\d{6}\b/);
    return pincodeMatch ? pincodeMatch[0] : '';
  }

  private static getSelectedDocumentType(formData: any): NormalizedDocumentData['documentType'] {
    if (formData.selectedIds && formData.selectedIds.length > 0) {
      const firstSelected = formData.selectedIds[0];
      switch (firstSelected) {
        case 'aadhar': return 'aadhaar';
        case 'panCard': return 'pan';
        case 'voterIdCard': return 'voter';
        case 'passport': return 'passport';
        case 'drivingLicense': return 'driving';
        default: return 'aadhaar';
      }
    }
    return 'aadhaar';
  }

  private static getDocumentNumber(formData: any, documentType: string): string {
    if (!formData.idDetails) return '';
    
    switch (documentType) {
      case 'aadhaar': return formData.idDetails.aadhar || '';
      case 'pan': return formData.idDetails.panCard || '';
      case 'voter': return formData.idDetails.voterIdCard || '';
      case 'passport': return formData.idDetails.passport || '';
      case 'driving': return formData.idDetails.drivingLicense || '';
      default: return '';
    }
  }

  private static normalizeDocumentNumber(docNumber: string, docType: string): string {
    const cleaned = docNumber.replace(/\s+/g, '');
    
    switch (docType) {
      case 'aadhaar':
        return cleaned.replace(/\D/g, '');
      case 'pan':
        return cleaned.toUpperCase();
      case 'voter':
        return cleaned.toUpperCase();
      case 'passport':
        return cleaned.toUpperCase();
      case 'driving':
        return cleaned.toUpperCase();
      default:
        return cleaned;
    }
  }
}

export class DataComparator {
  
  static compareDocuments(
    formData: NormalizedDocumentData,
    documentData: NormalizedDocumentData
  ): ValidationResult {
    const results: ComparisonResult[] = [];
    
   
    results.push(this.compareField('fullName', formData.fullName, documentData.fullName));
    results.push(this.compareField('documentNumber', formData.documentNumber, documentData.documentNumber));
    
    if (formData.dob && documentData.dob) {
      results.push(this.compareField('dob', formData.dob, documentData.dob));
    }
    
    if (formData.gender && documentData.gender) {
      results.push(this.compareField('gender', formData.gender, documentData.gender));
    }
    
    if (formData.fatherName && documentData.fatherName) {
      results.push(this.compareField('fatherName', formData.fatherName, documentData.fatherName));
    }
    
    if (formData.phone && documentData.phone) {
      results.push(this.compareField('phone', formData.phone, documentData.phone));
    }
    
    if (formData.email && documentData.email) {
      results.push(this.compareField('email', formData.email, documentData.email));
    }
    
    if (formData.address.permanent && documentData.address.permanent) {
      results.push(this.compareField('address', formData.address.permanent, documentData.address.permanent));
    }
    
    if (formData.address.city && documentData.address.city) {
      results.push(this.compareField('city', formData.address.city, documentData.address.city));
    }
    
    if (formData.address.state && documentData.address.state) {
      results.push(this.compareField('state', formData.address.state, documentData.address.state));
    }
    
    if (formData.address.pincode && documentData.address.pincode) {
      results.push(this.compareField('pincode', formData.address.pincode, documentData.address.pincode));
    }
    
    if (formData.documentType === 'voter' && documentData.documentType === 'voter') {
      if (formData.age && documentData.age) {
        results.push(this.compareField('age', formData.age, documentData.age));
      }
    }
    
    if (formData.documentType === 'passport' && documentData.documentType === 'passport') {
      if (formData.placeOfBirth && documentData.placeOfBirth) {
        results.push(this.compareField('placeOfBirth', formData.placeOfBirth, documentData.placeOfBirth));
      }
    }
    
    if (formData.documentType === 'driving' && documentData.documentType === 'driving') {
      if (formData.vehicleClass && documentData.vehicleClass) {
        results.push(this.compareField('vehicleClass', formData.vehicleClass, documentData.vehicleClass));
      }
    }
    
 
    const matchedFields = results.filter(r => r.match).length;
    const totalFields = results.length;
    const overallConfidence = this.calculateOverallConfidence(results);
    
    const validation: ValidationResult = {
      isValid: overallConfidence >= 0.8,
      overallConfidence,
      matchedFields,
      totalFields,
      results,
      errors: this.generateErrors(results),
      warnings: this.generateWarnings(results),
      documentType: documentData.documentType,
      parsedSuccessfully: true
    };
    
    return validation;
  }

  private static compareField(fieldName: string, formValue: string, docValue: string): ComparisonResult {
    const normalizedFormValue = formValue.trim().toLowerCase();
    const normalizedDocValue = docValue.trim().toLowerCase();
    
    if (normalizedFormValue === normalizedDocValue) {
      return {
        field: fieldName,
        formValue,
        documentValue: docValue,
        match: true,
        confidence: 1.0,
        matchType: 'exact'
      };
    }
    
    if (fieldName === 'fullName' || fieldName === 'fatherName' || fieldName === 'address') {
      const similarity = this.calculateStringSimilarity(normalizedFormValue, normalizedDocValue);
      return {
        field: fieldName,
        formValue,
        documentValue: docValue,
        match: similarity >= 0.8,
        confidence: similarity,
        matchType: similarity >= 0.8 ? 'fuzzy' : 'none',
        suggestions: similarity < 0.8 ? [docValue] : undefined
      };
    }
    
    if (fieldName.includes('address') || fieldName === 'city' || fieldName === 'state') {
      const containsMatch = normalizedFormValue.includes(normalizedDocValue) || 
                           normalizedDocValue.includes(normalizedFormValue);
      if (containsMatch) {
        return {
          field: fieldName,
          formValue,
          documentValue: docValue,
          match: true,
          confidence: 0.7,
          matchType: 'partial'
        };
      }
    }
    
    if (fieldName === 'phone') {
      const cleanFormPhone = formValue.replace(/\D/g, '');
      const cleanDocPhone = docValue.replace(/\D/g, '');
      
      if (cleanFormPhone === cleanDocPhone) {
        return {
          field: fieldName,
          formValue,
          documentValue: docValue,
          match: true,
          confidence: 1.0,
          matchType: 'exact'
        };
      }
      
      if (cleanFormPhone.includes(cleanDocPhone) || cleanDocPhone.includes(cleanFormPhone)) {
        return {
          field: fieldName,
          formValue,
          documentValue: docValue,
          match: true,
          confidence: 0.9,
          matchType: 'partial'
        };
      }
    }
    
    if (fieldName === 'dob' || fieldName === 'issueDate' || fieldName === 'expiryDate') {
      const normalizedFormDate = this.normalizeDate(formValue);
      const normalizedDocDate = this.normalizeDate(docValue);
      
      if (normalizedFormDate === normalizedDocDate) {
        return {
          field: fieldName,
          formValue,
          documentValue: docValue,
          match: true,
          confidence: 1.0,
          matchType: 'exact'
        };
      }
    }
    
    return {
      field: fieldName,
      formValue,
      documentValue: docValue,
      match: false,
      confidence: 0.0,
      matchType: 'none',
      suggestions: [docValue]
    };
  }

  private static normalizeDate(date: string): string {
 
    const dateFormats = [
      /^(\d{4})-(\d{2})-(\d{2})$/,
      /^(\d{2})-(\d{2})-(\d{4})$/,
      /^(\d{2})\/(\d{2})\/(\d{4})$/,
      /^(\d{4})\/(\d{2})\/(\d{2})$/,
    ];

    for (const format of dateFormats) {
      const match = date.match(format);
      if (match) {
        if (format.source.includes('(\\d{4})-(\\d{2})-(\\d{2})')) {
          return date;
        } else if (format.source.includes('(\\d{2})-(\\d{2})-(\\d{4})')) {
          return `${match[3]}-${match[2]}-${match[1]}`;
        } else if (format.source.includes('(\\d{2})\\/(\\d{2})\\/(\\d{4})')) {
          return `${match[3]}-${match[2]}-${match[1]}`;
        } else if (format.source.includes('(\\d{4})\\/(\\d{2})\\/(\\d{2})')) {
          return `${match[1]}-${match[2]}-${match[3]}`;
        }
      }
    }

    return date;
  }

  private static calculateStringSimilarity(str1: string, str2: string): number {
    if (str1.length === 0) return str2.length === 0 ? 1 : 0;
    if (str2.length === 0) return 0;
    
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    const maxLength = Math.max(str1.length, str2.length);
    return (maxLength - matrix[str2.length][str1.length]) / maxLength;
  }

  private static calculateOverallConfidence(results: ComparisonResult[]): number {
    if (results.length === 0) return 0;
    
    const fieldWeights = {
      fullName: 0.25,
      documentNumber: 0.25,
      dob: 0.15,
      fatherName: 0.10,
      address: 0.10,
      phone: 0.05,
      email: 0.05,
      gender: 0.05
    };
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    results.forEach(result => {
      const weight = fieldWeights[result.field] || 0.05;
      totalWeightedScore += result.confidence * weight;
      totalWeight += weight;
    });
    
    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  }

  private static generateErrors(results: ComparisonResult[]): string[] {
    const errors: string[] = [];
    
    results.forEach(result => {
      if (!result.match && result.confidence < 0.5) {
        errors.push(`${result.field}: Form value "${result.formValue}" does not match document value "${result.documentValue}"`);
      }
    });
    
    return errors;
  }

  private static generateWarnings(results: ComparisonResult[]): string[] {
    const warnings: string[] = [];
    
    results.forEach(result => {
      if (result.match && result.matchType === 'fuzzy') {
        warnings.push(`${result.field}: Fuzzy match detected - please verify "${result.formValue}" vs "${result.documentValue}"`);
      } else if (result.match && result.matchType === 'partial') {
        warnings.push(`${result.field}: Partial match detected - please verify "${result.formValue}" vs "${result.documentValue}"`);
      }
    });
    
    return warnings;
  }
}

export class DocumentValidationService {
  
  
  static async validateDocument(formData: any, documentData: DocumentData): Promise<ValidationResult> {
    try {
      const normalizedFormData = DataNormalizer.normalizeForm(formData);
      const normalizedDocumentData = DataNormalizer.normalizeDocument(documentData);
      
      const validationResult = DataComparator.compareDocuments(
        normalizedFormData,
        normalizedDocumentData
      );
      
      return validationResult;
    } catch (error) {
      console.error('Document validation error:', error);
      return {
        isValid: false,
        overallConfidence: 0,
        matchedFields: 0,
        totalFields: 0,
        results: [],
        errors: [`Validation failed: ${error.message}`],
        warnings: [],
        documentType: 'unknown',
        parsedSuccessfully: false
      };
    }
  }

  
  static async validateDocumentFromInput(
    formData: any,
    documentInput: string | File,
    documentType?: string
  ): Promise<ValidationResult> {
    try {
      let parsedDocument: DocumentData;
      
      if (documentType) {
        parsedDocument = await DocumentParserFactory.parseDocument(documentType, documentInput);
      } else {
        parsedDocument = await DocumentParserFactory.autoParseDocument(documentInput);
      }
      
      return await this.validateDocument(formData, parsedDocument);
    } catch (error) {
      console.error('Document parsing/validation error:', error);
      return {
        isValid: false,
        overallConfidence: 0,
        matchedFields: 0,
        totalFields: 0,
        results: [],
        errors: [`Document parsing failed: ${error.message}`],
        warnings: [],
        documentType: documentType || 'unknown',
        parsedSuccessfully: false
      };
    }
  }

  
  static async validateMultipleDocuments(
    formData: any,
    documents: DocumentData[]
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    for (const document of documents) {
      const result = await this.validateDocument(formData, document);
      results.push(result);
    }
    
    return results;
  }

 
  static async validateMultipleDocumentsFromInputs(
    formData: any,
    documentInputs: Array<{ input: string | File; type?: string }>
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    for (const docInput of documentInputs) {
      const result = await this.validateDocumentFromInput(formData, docInput.input, docInput.type);
      results.push(result);
    }
    
    return results;
  }

  
  static getValidationSummary(results: ValidationResult[]): {
    overallValid: boolean;
    averageConfidence: number;
    totalMatches: number;
    totalFields: number;
    documentTypes: string[];
    allErrors: string[];
    allWarnings: string[];
  } {
    const validResults = results.filter(r => r.parsedSuccessfully);
    
    if (validResults.length === 0) {
      return {
        overallValid: false,
        averageConfidence: 0,
        totalMatches: 0,
        totalFields: 0,
        documentTypes: [],
        allErrors: results.flatMap(r => r.errors),
        allWarnings: results.flatMap(r => r.warnings)
      };
    }
    
    const totalConfidence = validResults.reduce((sum, r) => sum + r.overallConfidence, 0);
    const totalMatches = validResults.reduce((sum, r) => sum + r.matchedFields, 0);
    const totalFields = validResults.reduce((sum, r) => sum + r.totalFields, 0);
    
    return {
      overallValid: validResults.every(r => r.isValid),
      averageConfidence: totalConfidence / validResults.length,
      totalMatches,
      totalFields,
      documentTypes: validResults.map(r => r.documentType),
      allErrors: results.flatMap(r => r.errors),
      allWarnings: results.flatMap(r => r.warnings)
    };
  }

  
  static generateValidationReport(results: ValidationResult[]): string {
    let report = '=== DOCUMENT VALIDATION REPORT ===\n\n';
    
    const summary = this.getValidationSummary(results);
    
    report += `Overall Status: ${summary.overallValid ? 'VALID' : 'INVALID'}\n`;
    report += `Average Confidence: ${(summary.averageConfidence * 100).toFixed(1)}%\n`;
    report += `Total Matches: ${summary.totalMatches}/${summary.totalFields}\n`;
    report += `Document Types: ${summary.documentTypes.join(', ')}\n\n`;
    
    results.forEach((result, index) => {
      report += `--- Document ${index + 1} (${result.documentType.toUpperCase()}) ---\n`;
      report += `Status: ${result.isValid ? 'VALID' : 'INVALID'}\n`;
      report += `Confidence: ${(result.overallConfidence * 100).toFixed(1)}%\n`;
      report += `Matches: ${result.matchedFields}/${result.totalFields}\n`;
      report += `Parsed Successfully: ${result.parsedSuccessfully ? 'Yes' : 'No'}\n\n`;
      
      if (result.results.length > 0) {
        report += 'Field Comparisons:\n';
        result.results.forEach(fieldResult => {
          const status = fieldResult.match ? '✓' : '✗';
          const confidence = `${(fieldResult.confidence * 100).toFixed(0)}%`;
          report += `  ${status} ${fieldResult.field}: ${confidence} (${fieldResult.matchType})\n`;
          if (!fieldResult.match) {
            report += `    Form: "${fieldResult.formValue}"\n`;
            report += `    Document: "${fieldResult.documentValue}"\n`;
          }
        });
        report += '\n';
      }
      
      if (result.errors.length > 0) {
        report += 'Errors:\n';
        result.errors.forEach(error => report += `  - ${error}\n`);
        report += '\n';
      }
      
      if (result.warnings.length > 0) {
        report += 'Warnings:\n';
        result.warnings.forEach(warning => report += `  - ${warning}\n`);
        report += '\n';
      }
    });
    
    return report;
  }
}

