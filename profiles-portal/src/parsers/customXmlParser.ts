// parsers/customXmlParser.ts
export interface CustomXMLData {
  type: 'custom';
  documentType?: string;
  name: string;
  dob: string;
  gender?: string;
  documentNumber?: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  customFields?: { [key: string]: any };
  uri?: string;
  meta?: any;
}

export interface CustomParsingConfig {
  documentType: string;
  rootElement: string;
  fieldMappings: {
    name: string[];
    dob: string[];
    gender: string[];
    documentNumber: string[];
    fatherName?: string[];
    motherName?: string[];
    address?: string[];
    [key: string]: string[] | undefined;
  };
  customFields?: string[];
}

export class CustomXMLParser {
  static parseCustomXML(xmlString: string, config: CustomParsingConfig): CustomXMLData | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
      if (parseError) {
        throw new Error('XML parsing error: ' + parseError.textContent);
      }

      return this.extractCustomData(xmlDoc, config);
    } catch (error) {
      console.error('Custom XML parsing error:', error);
      return null;
    }
  }

  private static extractCustomData(xmlDoc: Document, config: CustomParsingConfig): CustomXMLData {
    const getElementText = (tagName: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.textContent?.trim() || '' : '';
    };

    const getAttributeValue = (tagName: string, attribute: string): string => {
      const element = xmlDoc.getElementsByTagName(tagName)[0];
      return element ? element.getAttribute(attribute) || '' : '';
    };

    const getValueFromMappings = (mappings: string[]): string => {
      for (const mapping of mappings) {
        // Check if mapping is for element text
        if (!mapping.includes('@')) {
          const value = getElementText(mapping);
          if (value) return value;
        } else {
          // Handle attribute mappings (format: "tagName@attributeName")
          const [tagName, attributeName] = mapping.split('@');
          const value = getAttributeValue(tagName, attributeName);
          if (value) return value;
        }
      }
      return '';
    };

    // Extract standard fields using mappings
    const name = getValueFromMappings(config.fieldMappings.name);
    const dob = getValueFromMappings(config.fieldMappings.dob);
    const gender = getValueFromMappings(config.fieldMappings.gender);
    const documentNumber = getValueFromMappings(config.fieldMappings.documentNumber);
    const fatherName = config.fieldMappings.fatherName ? getValueFromMappings(config.fieldMappings.fatherName) : '';
    const motherName = config.fieldMappings.motherName ? getValueFromMappings(config.fieldMappings.motherName) : '';
    const address = config.fieldMappings.address ? getValueFromMappings(config.fieldMappings.address) : '';

    // Extract custom fields
    const customFields: { [key: string]: any } = {};
    if (config.customFields) {
      config.customFields.forEach(fieldName => {
        const mappings = config.fieldMappings[fieldName];
        if (mappings) {
          customFields[fieldName] = getValueFromMappings(mappings);
        }
      });
    }

    const uri = getElementText('uri') || 
               xmlDoc.querySelector('document')?.getAttribute('uri') ||
               xmlDoc.documentElement.getAttribute('uri');

    return {
      type: 'custom',
      documentType: config.documentType,
      name,
      dob,
      gender,
      documentNumber,
      fatherName,
      motherName,
      address,
      customFields,
    
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

    return meta;
  }

  static validateCustomXMLData(data: CustomXMLData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    }

    if (!data.dob || data.dob.trim().length === 0) {
      errors.push('Date of birth is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Helper method to create configurations for common document types
  static createStandardConfigs(): { [key: string]: CustomParsingConfig } {
    return {
      aadhaar: {
        documentType: 'aadhaar',
        rootElement: 'aadhaar',
        fieldMappings: {
          name: ['name', 'poi@name', 'PrintLetterBarcodeData@name'],
          dob: ['dob', 'yob', 'poi@dob', 'poi@yob'],
          gender: ['gender', 'poi@gender'],
          documentNumber: ['uid', 'uid@uid', 'PrintLetterBarcodeData@uid'],
          fatherName: ['father_name', 'co', 'poi@father_name', 'poi@co'],
          address: ['address', 'poa@address']
        },
        customFields: ['photo', 'signature']
      },
      pan: {
        documentType: 'pan',
        rootElement: 'pan',
        fieldMappings: {
          name: ['name', 'holder_name', 'PAN@name'],
          dob: ['dob', 'date_of_birth', 'PAN@dob'],
          gender: ['gender', 'PAN@gender'],
          documentNumber: ['pan_number', 'pan', 'PAN@number'],
          fatherName: ['father_name', 'PAN@father_name']
        },
        customFields: ['validTill', 'issueDate']
      },
      passport: {
        documentType: 'passport',
        rootElement: 'passport',
        fieldMappings: {
          name: ['name', 'holder_name', 'passport@name'],
          dob: ['dob', 'date_of_birth', 'passport@dob'],
          gender: ['gender', 'sex', 'passport@gender'],
          documentNumber: ['passport_number', 'passport_no', 'passport@number'],
          fatherName: ['father_name', 'passport@father_name'],
          motherName: ['mother_name', 'passport@mother_name']
        },
        customFields: ['nationality', 'placeOfBirth', 'validTill', 'issueDate', 'issuePlace']
      },
      voter_id: {
        documentType: 'voter_id',
        rootElement: 'voter_id',
        fieldMappings: {
          name: ['name', 'voter_name', 'voter_id@name'],
          dob: ['dob', 'date_of_birth', 'voter_id@dob'],
          gender: ['gender', 'sex', 'voter_id@gender'],
          documentNumber: ['voter_id_number', 'epic_number', 'voter_id@number'],
          fatherName: ['father_name', 'rln_name', 'voter_id@father_name']
        },
        customFields: ['assemblyConstituency', 'parliamentaryConstituency', 'partNumber', 'slNumber']
      },
      driving_license: {
        documentType: 'driving_license',
        rootElement: 'driving_license',
        fieldMappings: {
          name: ['name', 'holder_name', 'driving_license@name'],
          dob: ['dob', 'date_of_birth', 'driving_license@dob'],
          gender: ['gender', 'sex', 'driving_license@gender'],
          documentNumber: ['license_number', 'dl_number', 'driving_license@number'],
          fatherName: ['father_name', 'driving_license@father_name'],
          address: ['address', 'permanent_address']
        },
        customFields: ['bloodGroup', 'vehicleClass', 'validTill', 'validFrom', 'issueDate', 'rtoOffice']
      }
    };
  }

  // Method to auto-detect document type and parse accordingly
  static parseWithAutoDetection(xmlString: string): CustomXMLData | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      const rootTag = xmlDoc.documentElement.nodeName.toLowerCase();
      const configs = this.createStandardConfigs();
      
      // Try to find matching configuration
      for (const [docType, config] of Object.entries(configs)) {
        if (rootTag === config.rootElement || rootTag.includes(docType)) {
          return this.parseCustomXML(xmlString, config);
        }
      }
      
      // If no standard config found, create a generic one
      const genericConfig: CustomParsingConfig = {
        documentType: 'unknown',
        rootElement: rootTag,
        fieldMappings: {
          name: ['name', 'holder_name', 'person_name'],
          dob: ['dob', 'date_of_birth', 'birth_date'],
          gender: ['gender', 'sex'],
          documentNumber: ['number', 'document_number', 'id', 'reference_number']
        }
      };
      
      return this.parseCustomXML(xmlString, genericConfig);
    } catch (error) {
      console.error('Auto-detection parsing error:', error);
      return null;
    }
  }
}