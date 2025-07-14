// parsers/panParser.ts
export interface PANData {
  type: 'pan';
  name: string;
  dob: string;
  gender?: string;
  documentNumber: string;
  fatherName?: string;
  validTill?: string;
  issueDate?: string;
  uri?: string;
  meta?: any;
}

export class PANParser {
  static parsePANXML(xmlString: string): PANData | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
      if (parseError) {
        throw new Error('XML parsing error: ' + parseError.textContent);
      }

      return this.extractPANData(xmlDoc);
    } catch (error) {
      console.error('PAN XML parsing error:', error);
      return null;
    }
  }

  private static extractPANData(xmlDoc: Document): PANData {
    const getElementText = (tagName: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.textContent?.trim() || '' : '';
    };

    const getAttributeValue = (tagName: string, attribute: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.getAttribute(attribute) || '' : '';
    };

    // Handle different XML structures for PAN
    const name = getElementText('name') || 
                 getElementText('holder_name') ||
                 getAttributeValue('PAN', 'name') ||
                 getAttributeValue('holder', 'name');

    const dob = getElementText('dob') || 
                getElementText('date_of_birth') ||
                getAttributeValue('PAN', 'dob') ||
                getAttributeValue('holder', 'dob');

    const gender = getElementText('gender') || 
                   getAttributeValue('PAN', 'gender') ||
                   getAttributeValue('holder', 'gender');

    const documentNumber = getElementText('pan_number') || 
                          getElementText('pan') ||
                          getElementText('number') ||
                          getAttributeValue('PAN', 'number') ||
                          getAttributeValue('PAN', 'pan_number');

    const fatherName = getElementText('father_name') || 
                      getElementText('fathers_name') ||
                      getAttributeValue('PAN', 'father_name') ||
                      getAttributeValue('holder', 'father_name');

    const validTill = getElementText('validity') || 
                     getElementText('valid_till') ||
                     getElementText('expiry_date') ||
                     getAttributeValue('PAN', 'validity');

    const issueDate = getElementText('issue_date') || 
                     getElementText('issued_date') ||
                     getAttributeValue('PAN', 'issue_date');

    const uri = getElementText('uri') || 
               xmlDoc.querySelector('document')?.getAttribute('uri') ||
               xmlDoc.documentElement.getAttribute('uri');

    return {
      type: 'pan',
      name,
      dob,
      gender,
      documentNumber,
      fatherName,
      validTill,
      issueDate,
      uri,
      meta: this.extractMeta(xmlDoc)
    };
  }

  private static extractMeta(xmlDoc: Document): any {
    const meta: any = {};
    
    // Extract from meta tags
    const metaElements = xmlDoc.getElementsByTagName('meta');
    for (let i = 0; i < metaElements.length; i++) {
      const metaElement = metaElements[i];
      Array.from(metaElement.attributes).forEach(attr => {
        meta[attr.name] = attr.value;
      });
    }

    // Extract additional attributes from root element
    const rootElement = xmlDoc.documentElement;
    if (rootElement) {
      Array.from(rootElement.attributes).forEach(attr => {
        meta[attr.name] = attr.value;
      });
    }

    // Extract signature and verification data
    const signature = xmlDoc.getElementsByTagName('signature')[0];
    if (signature) {
      meta.signature = signature.textContent?.trim();
    }

    const verificationData = xmlDoc.getElementsByTagName('verification')[0];
    if (verificationData) {
      meta.verification = verificationData.textContent?.trim();
    }

    return meta;
  }

  static validatePANData(data: PANData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    }

    if (!data.dob || data.dob.trim().length === 0) {
      errors.push('Date of birth is required');
    }

    if (!data.documentNumber || data.documentNumber.trim().length === 0) {
      errors.push('PAN number is required');
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.documentNumber.replace(/\s/g, ''))) {
      errors.push('Invalid PAN number format (should be like ABCDE1234F)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}