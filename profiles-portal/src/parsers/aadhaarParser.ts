// parsers/aadhaarParser.ts
export interface AadhaarData {
  type: 'aadhaar';
  name: string;
  dob: string;
  gender: string;
  documentNumber: string;
  fatherName?: string;
  address?: string;
  photo?: string;
  signature?: string;
  uri?: string;
  meta?: any;
}

export class AadhaarParser {
  static parseAadhaarXML(xmlString: string): AadhaarData | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
      if (parseError) {
        throw new Error('XML parsing error: ' + parseError.textContent);
      }

      return this.extractAadhaarData(xmlDoc);
    } catch (error) {
      console.error('Aadhaar XML parsing error:', error);
      return null;
    }
  }

  private static extractAadhaarData(xmlDoc: Document): AadhaarData {
    const getElementText = (tagName: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.textContent?.trim() || '' : '';
    };

    const getAttributeValue = (tagName: string, attribute: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.getAttribute(attribute) || '' : '';
    };

    // Handle both element-based and attribute-based XML structures
    const name = getElementText('name') || 
                 getAttributeValue('poi', 'name') ||
                 getAttributeValue('PrintLetterBarcodeData', 'name') ||
                 getAttributeValue('UidData', 'name');

    const dob = getElementText('dob') || 
                getElementText('yob') ||
                getAttributeValue('poi', 'dob') ||
                getAttributeValue('poi', 'yob') ||
                getAttributeValue('PrintLetterBarcodeData', 'dob') ||
                getAttributeValue('UidData', 'dob');

    const gender = getElementText('gender') || 
                   getAttributeValue('poi', 'gender') ||
                   getAttributeValue('PrintLetterBarcodeData', 'gender') ||
                   getAttributeValue('UidData', 'gender');

    const documentNumber = getElementText('uid') || 
                          getElementText('aadhaar_number') ||
                          getAttributeValue('uid', 'uid') ||
                          getAttributeValue('PrintLetterBarcodeData', 'uid') ||
                          getAttributeValue('UidData', 'uid');

    const fatherName = getElementText('father_name') || 
                      getElementText('co') ||
                      getAttributeValue('poi', 'father_name') ||
                      getAttributeValue('poi', 'co') ||
                      getAttributeValue('PrintLetterBarcodeData', 'co') ||
                      getAttributeValue('UidData', 'co');

    const address = getElementText('address') || 
                   getAttributeValue('poa', 'address') ||
                   this.constructAddress(xmlDoc);

    const photo = getElementText('photo') || 
                 getAttributeValue('pht', 'photo') ||
                 getAttributeValue('PrintLetterBarcodeData', 'photo') ||
                 getAttributeValue('UidData', 'photo');

    const signature = getElementText('signature') || 
                     getAttributeValue('signature', 'signature');

    const uri = getElementText('uri') || 
               xmlDoc.querySelector('document')?.getAttribute('uri') ||
               xmlDoc.documentElement.getAttribute('uri');

    return {
      type: 'aadhaar',
      name,
      dob,
      gender,
      documentNumber,
      fatherName,
      address,
      photo,
      signature,
      
      meta: this.extractMeta(xmlDoc)
    };
  }

  private static constructAddress(xmlDoc: Document): string {
    const addressParts = [
      'house', 'street', 'lm', 'loc', 'vtc', 'subdist', 'dist', 'state', 'pc'
    ];

    let address = '';
    addressParts.forEach(part => {
      const element = xmlDoc.getElementsByTagName(part)[0];
      if (element && element.textContent?.trim()) {
        address += element.textContent.trim() + ', ';
      }
    });

    // Remove trailing comma and space
    return address.replace(/, $/, '');
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

    return meta;
  }

  static validateAadhaarData(data: AadhaarData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    }

    if (!data.dob || data.dob.trim().length === 0) {
      errors.push('Date of birth is required');
    }

    if (!data.gender || data.gender.trim().length === 0) {
      errors.push('Gender is required');
    }

    if (!data.documentNumber || data.documentNumber.trim().length === 0) {
      errors.push('Aadhaar number is required');
    } else if (!/^\d{12}$/.test(data.documentNumber.replace(/\s/g, ''))) {
      errors.push('Invalid Aadhaar number format');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}