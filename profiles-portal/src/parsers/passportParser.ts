// parsers/passportParser.ts
export interface PassportData {
  type: 'passport';
  name: string;
  dob: string;
  gender?: string;
  documentNumber: string;
  fatherName?: string;
  motherName?: string;
  nationality?: string;
  placeOfBirth?: string;
  address?: string;
  validTill?: string;
  issueDate?: string;
  issuePlace?: string;
  uri?: string;
  meta?: any;
}

export class PassportParser {
  static parsePassportXML(xmlString: string): PassportData | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
      if (parseError) {
        throw new Error('XML parsing error: ' + parseError.textContent);
      }

      return this.extractPassportData(xmlDoc);
    } catch (error) {
      console.error('Passport XML parsing error:', error);
      return null;
    }
  }

  private static extractPassportData(xmlDoc: Document): PassportData {
    const getElementText = (tagName: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.textContent?.trim() || '' : '';
    };

    const getAttributeValue = (tagName: string, attribute: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.getAttribute(attribute) || '' : '';
    };

    // Handle different XML structures for Passport
    const name = getElementText('name') || 
                 getElementText('holder_name') ||
                 getElementText('given_name') + ' ' + getElementText('surname') ||
                 getAttributeValue('passport', 'name') ||
                 getAttributeValue('holder', 'name');

    const dob = getElementText('dob') || 
                getElementText('date_of_birth') ||
                getAttributeValue('passport', 'dob') ||
                getAttributeValue('holder', 'dob');

    const gender = getElementText('gender') || 
                   getElementText('sex') ||
                   getAttributeValue('passport', 'gender') ||
                   getAttributeValue('holder', 'gender');

    const documentNumber = getElementText('passport_number') || 
                          getElementText('passport_no') ||
                          getElementText('document_number') ||
                          getAttributeValue('passport', 'number') ||
                          getAttributeValue('passport', 'passport_number');

    const fatherName = getElementText('father_name') || 
                      getElementText('fathers_name') ||
                      getAttributeValue('passport', 'father_name') ||
                      getAttributeValue('holder', 'father_name');

    const motherName = getElementText('mother_name') || 
                      getElementText('mothers_name') ||
                      getAttributeValue('passport', 'mother_name') ||
                      getAttributeValue('holder', 'mother_name');

    const nationality = getElementText('nationality') || 
                       getElementText('country_code') ||
                       getAttributeValue('passport', 'nationality') ||
                       getAttributeValue('holder', 'nationality');

    const placeOfBirth = getElementText('place_of_birth') || 
                        getElementText('pob') ||
                        getAttributeValue('passport', 'place_of_birth') ||
                        getAttributeValue('holder', 'place_of_birth');

    const address = getElementText('address') || 
                   getElementText('permanent_address') ||
                   this.constructAddress(xmlDoc);

    const validTill = getElementText('validity') || 
                     getElementText('valid_till') ||
                     getElementText('expiry_date') ||
                     getElementText('date_of_expiry') ||
                     getAttributeValue('passport', 'validity');

    const issueDate = getElementText('issue_date') || 
                     getElementText('issued_date') ||
                     getElementText('date_of_issue') ||
                     getAttributeValue('passport', 'issue_date');

    const issuePlace = getElementText('issue_place') || 
                      getElementText('place_of_issue') ||
                      getElementText('issuing_authority') ||
                      getAttributeValue('passport', 'issue_place');

    const uri = getElementText('uri') || 
               xmlDoc.querySelector('document')?.getAttribute('uri') ||
               xmlDoc.documentElement.getAttribute('uri');

    return {
      type: 'passport',
      name: name.trim(),
      dob,
      gender,
      documentNumber,
      fatherName,
      motherName,
      nationality,
      placeOfBirth,
      address,
      validTill,
      issueDate,
      issuePlace,
      
      meta: this.extractMeta(xmlDoc)
    };
  }

  private static constructAddress(xmlDoc: Document): string {
    const addressParts = [
      'house_no', 'street', 'locality', 'city', 'district', 'state', 'pincode'
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

    // Extract photo and signature data
    const photo = xmlDoc.getElementsByTagName('photo')[0];
    if (photo) {
      meta.photo = photo.textContent?.trim();
    }

    const signature = xmlDoc.getElementsByTagName('signature')[0];
    if (signature) {
      meta.signature = signature.textContent?.trim();
    }

    return meta;
  }

  static validatePassportData(data: PassportData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    }

    if (!data.dob || data.dob.trim().length === 0) {
      errors.push('Date of birth is required');
    }

    if (!data.documentNumber || data.documentNumber.trim().length === 0) {
      errors.push('Passport number is required');
    } else if (!/^[A-Z]{1}[0-9]{7}$/.test(data.documentNumber.replace(/\s/g, ''))) {
      errors.push('Invalid passport number format (should be like A1234567)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}