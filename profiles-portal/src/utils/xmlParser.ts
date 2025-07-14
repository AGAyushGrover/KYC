// utils/xmlParser.ts
export interface DocumentData {
  type: string;
  name: string;
  dob: string;
  gender: string;
  documentNumber?: string;
  fatherName?: string;
  address?: string;
  photo?: string;
  signature?: string;
  validTill?: string;
  issueDate?: string;
  uri?: string;
  meta?: any;
}

export interface UserData {
  name: string;
  dob: string;
  gender?: string;
  documentNumber?: string;
  fatherName?: string;
  address?: string;
}

export interface ComparisonResult {
  isValid: boolean;
  matchedFields: string[];
  misMatchedFields: string[];
  similarityScore: number;
  errors: string[];
}

export class XMLParser {
  static parseXML(xmlString: string): DocumentData | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
      if (parseError) {
        throw new Error('XML parsing error: ' + parseError.textContent);
      }

      // Extract data based on document type
      const documentType = this.getDocumentType(xmlDoc);
      
      switch (documentType) {
        case 'aadhaar':
          return this.parseAadhaarXML(xmlDoc);
        case 'pan':
          return this.parsePANXML(xmlDoc);
        case 'driving_license':
          return this.parseDrivingLicenseXML(xmlDoc);
        case 'passport':
          return this.parsePassportXML(xmlDoc);
        default:
          throw new Error('Unknown document type');
      }
    } catch (error) {
      console.error('XML parsing error:', error);
      return null;
    }
  }

 private static getDocumentType(xmlDoc: Document): string {
  const rootTag = xmlDoc.documentElement.nodeName.toLowerCase();
  switch (rootTag) {
    case 'aadhaar':
      return 'aadhaar';
    case 'pan':
      return 'pan';
    case 'driving_license':
      return 'driving_license';
    case 'passport':
      return 'passport';
    default:
      return 'unknown';
  }
}

private static parseAadhaarXML(xmlDoc: Document): DocumentData {
  const getElementText = (tagName: string): string => {
    const element = xmlDoc.getElementsByTagName(tagName)[0];
    return element ? element.textContent?.trim() || '' : '';
  };

  const getAttributeValue = (tagName: string, attribute: string): string => {
    const element = xmlDoc.getElementsByTagName(tagName)[0];
    return element ? element.getAttribute(attribute) || '' : '';
  };

  return {
    type: 'aadhaar',
    name: getElementText('name') || getAttributeValue('poi', 'name'),
    dob: getElementText('dob') || getAttributeValue('poi', 'dob'),
    gender: getElementText('gender') || getAttributeValue('poi', 'gender'),
    documentNumber: getElementText('uid') || getAttributeValue('uid', 'uid'),
    fatherName: getElementText('father_name') || getAttributeValue('poi', 'father_name'),
    address: getElementText('address') || getAttributeValue('poa', 'address'),
    photo: getElementText('photo') || getAttributeValue('pht', 'photo'),
    uri: (getElementText('uri') || xmlDoc.querySelector('document')?.getAttribute('uri')) as string | undefined,
    meta: this.extractMeta(xmlDoc)
  };
}

 private static parsePANXML(xmlDoc: Document): DocumentData {
  const getElementText = (tagName: string): string => {
    const element = xmlDoc.getElementsByTagName(tagName)[0];
    return element ? element.textContent?.trim() || '' : '';
  };

  return {
    type: 'pan',
    name: getElementText('name'),
    dob: getElementText('dob'),
    gender: getElementText('gender'),
    fatherName: getElementText('father_name'),
    documentNumber: getElementText('pan_number'),
    validTill: getElementText('validity'),
    uri: getElementText('uri'),
    meta: this.extractMeta(xmlDoc)
  };
}
private static parseDrivingLicenseXML(xmlDoc: Document): DocumentData {
  const getElementText = (tagName: string): string => {
    const element = xmlDoc.getElementsByTagName(tagName)[0];
    return element ? element.textContent?.trim() || '' : '';
  };

  return {
    type: 'driving_license',
    name: getElementText('name'),
    dob: getElementText('dob'),
    gender: getElementText('gender'),
    address: getElementText('address'),
    documentNumber: getElementText('license_number'),
    validTill: getElementText('validity_upto'),
    issueDate: getElementText('issue_date'),
    uri: getElementText('uri'),
    meta: this.extractMeta(xmlDoc)
  };
}

  private static parsePassportXML(xmlDoc: Document): DocumentData {
    const getElementText = (tagName: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.textContent?.trim() || '' : '';
    };

    return {
      type: 'passport',
      name: getElementText('name'),
      dob: getElementText('dob'),
      gender: getElementText('gender'),
      documentNumber: getElementText('passport_number'),
      validTill: getElementText('validity'),
      issueDate: getElementText('issue_date'),
      uri: getElementText('uri'),
      meta: this.extractMeta(xmlDoc)
    };
  }

  private static extractMeta(xmlDoc: Document): any {
    const meta: any = {};
    const metaElements = xmlDoc.getElementsByTagName('meta');
    
    for (let i = 0; i < metaElements.length; i++) {
      const metaElement = metaElements[i];
      Array.from(metaElement.attributes).forEach(attr => {
        meta[attr.name] = attr.value;
      });
    }
    
    return meta;
  }
}

export class DocumentComparator {
  static compareDocuments(xmlData: DocumentData, userData: UserData): ComparisonResult {
    const result: ComparisonResult = {
      isValid: false,
      matchedFields: [],
      misMatchedFields: [],
      similarityScore: 0,
      errors: []
    };

    if (!xmlData || !userData) {
      result.errors.push('Invalid data provided for comparison');
      return result;
    }

    // Fields to compare
    const fieldsToCompare = ['name', 'dob', 'gender', 'documentNumber', 'fatherName', 'address'];
    let totalFields = 0;
    let matchedFields = 0;

    fieldsToCompare.forEach(field => {
      const xmlValue = xmlData[field as keyof DocumentData];
      const userValue = userData[field as keyof UserData];

      if (xmlValue && userValue) {
        totalFields++;
        
        if (this.compareField(field, xmlValue, userValue)) {
          matchedFields++;
          result.matchedFields.push(field);
        } else {
          result.misMatchedFields.push(field);
        }
      }
    });

    result.similarityScore = totalFields > 0 ? (matchedFields / totalFields) * 100 : 0;
    result.isValid = result.similarityScore >= 70; // 70% similarity threshold

    return result;
  }

  private static compareField(fieldName: string, xmlValue: any, userValue: any): boolean {
    if (typeof xmlValue !== 'string' || typeof userValue !== 'string') {
      return false;
    }

    const cleanXmlValue = this.cleanString(xmlValue);
    const cleanUserValue = this.cleanString(userValue);

    switch (fieldName) {
      case 'name':
        return this.compareName(cleanXmlValue, cleanUserValue);
      case 'dob':
        return this.compareDate(cleanXmlValue, cleanUserValue);
      case 'gender':
        return this.compareGender(cleanXmlValue, cleanUserValue);
      default:
        return this.compareString(cleanXmlValue, cleanUserValue);
    }
  }

  private static cleanString(str: string): string {
    return str.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  private static compareName(xmlName: string, userName: string): boolean {
    // Handle name variations and fuzzy matching
    const xmlNameParts = xmlName.split(' ').filter(part => part.length > 0);
    const userNameParts = userName.split(' ').filter(part => part.length > 0);

    // Check if at least 80% of name parts match
    let matchedParts = 0;
    const totalParts = Math.max(xmlNameParts.length, userNameParts.length);

    xmlNameParts.forEach(xmlPart => {
      if (userNameParts.some(userPart => 
        this.calculateSimilarity(xmlPart, userPart) > 0.8
      )) {
        matchedParts++;
      }
    });

    return (matchedParts / totalParts) >= 0.8;
  }

  private static compareDate(xmlDate: string, userDate: string): boolean {
    // Handle different date formats
    const normalizeDate = (dateStr: string): string => {
      // Convert various date formats to YYYY-MM-DD
      const patterns = [
        /(\d{4})-(\d{2})-(\d{2})/,  // YYYY-MM-DD
        /(\d{2})-(\d{2})-(\d{4})/,  // DD-MM-YYYY
        /(\d{2})\/(\d{2})\/(\d{4})/,  // MM/DD/YYYY
        /(\d{4})\/(\d{2})\/(\d{2})/   // YYYY/MM/DD
      ];

      for (const pattern of patterns) {
        const match = dateStr.match(pattern);
        if (match) {
          if (pattern.source.includes('(\\d{4})-')) {
            return `${match[1]}-${match[2]}-${match[3]}`;
          } else if (pattern.source.includes('(\\d{2})-(\\d{2})-(\\d{4})')) {
            return `${match[3]}-${match[2]}-${match[1]}`;
          } else if (pattern.source.includes('(\\d{2})/(\\d{2})/(\\d{4})')) {
            return `${match[3]}-${match[1]}-${match[2]}`;
          } else if (pattern.source.includes('(\\d{4})/(\\d{2})/(\\d{2})')) {
            return `${match[1]}-${match[2]}-${match[3]}`;
          }
        }
      }
      return dateStr;
    };

    const normalizedXmlDate = normalizeDate(xmlDate);
    const normalizedUserDate = normalizeDate(userDate);

    return normalizedXmlDate === normalizedUserDate;
  }

  private static compareGender(xmlGender: string, userGender: string): boolean {
    const genderMapping: { [key: string]: string[] } = {
      'male': ['m', 'male', 'man'],
      'female': ['f', 'female', 'woman', 'girl'],
      'other': ['o', 'other', 'transgender', 'third gender']
    };

    for (const [category, variants] of Object.entries(genderMapping)) {
      if (variants.includes(xmlGender) && variants.includes(userGender)) {
        return true;
      }
    }

    return false;
  }

  private static compareString(str1: string, str2: string): boolean {
    return this.calculateSimilarity(str1, str2) > 0.8;
  }

  private static calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[j][i] = matrix[j - 1][i - 1];
        } else {
          matrix[j][i] = Math.min(
            matrix[j - 1][i - 1] + 1,
            matrix[j][i - 1] + 1,
            matrix[j - 1][i] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
}