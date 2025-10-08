// // parsers/drivingLicenseParser.ts
// export interface DrivingLicenseData {
//   type: 'driving_license';
//   name: string;
//   dob: string;
//   gender?: string;
//   documentNumber: string;
//   fatherName?: string;
//   address?: string;
//   bloodGroup?: string;
//   vehicleClass?: string[];
//   validTill?: string;
//   validFrom?: string;
//   issueDate?: string;
//   rtoOffice?: string;
//   licenseType?: string;
//   uri?: string;
//   meta?: any;
// }

// export class DrivingLicenseParser {
//   static parseDrivingLicenseXML(xmlString: string): DrivingLicenseData | null {
//     try {
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
//       // Check for parsing errors
//       const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
//       if (parseError) {
//         throw new Error('XML parsing error: ' + parseError.textContent);
//       }

//       return this.extractDrivingLicenseData(xmlDoc);
//     } catch (error) {
//       console.error('Driving License XML parsing error:', error);
//       return null;
//     }
//   }

//   private static extractDrivingLicenseData(xmlDoc: Document): DrivingLicenseData {
//     const getElementText = (tagName: string): string => {
//       const element = xmlDoc.getElementsByTagName(tagName)[0];
//       return element ? element.textContent?.trim() || '' : '';
//     };

//     const getAttributeValue = (tagName: string, attribute: string): string => {
//       const element = xmlDoc.getElementsByTagName(tagName)[0];
//       return element ? element.getAttribute(attribute) || '' : '';
//     };

//     const getMultipleElementsText = (tagName: string): string[] => {
//       const elements = xmlDoc.getElementsByTagName(tagName);
//       const values: string[] = [];
//       for (let i = 0; i < elements.length; i++) {
//         const text = elements[i].textContent?.trim();
//         if (text) {
//           values.push(text);
//         }
//       }
//       return values;
//     };

//     // Handle different XML structures for Driving License
//     const name = getElementText('name') || 
//                  getElementText('holder_name') ||
//                  getElementText('license_holder_name') ||
//                  getAttributeValue('driving_license', 'name') ||
//                  getAttributeValue('dl', 'name');

//     const dob = getElementText('dob') || 
//                 getElementText('date_of_birth') ||
//                 getElementText('birth_date') ||
//                 getAttributeValue('driving_license', 'dob') ||
//                 getAttributeValue('dl', 'dob');

//     const gender = getElementText('gender') || 
//                    getElementText('sex') ||
//                    getAttributeValue('driving_license', 'gender') ||
//                    getAttributeValue('dl', 'gender');

//     const documentNumber = getElementText('license_number') || 
//                           getElementText('dl_number') ||
//                           getElementText('driving_license_number') ||
//                           getElementText('number') ||
//                           getAttributeValue('driving_license', 'number') ||
//                           getAttributeValue('dl', 'license_number');

//     const fatherName = getElementText('father_name') || 
//                       getElementText('fathers_name') ||
//                       getElementText('guardian_name') ||
//                       getAttributeValue('driving_license', 'father_name') ||
//                       getAttributeValue('dl', 'father_name');

//     const address = getElementText('address') || 
//                    getElementText('permanent_address') ||
//                    this.constructAddress(xmlDoc);

//     const bloodGroup = getElementText('blood_group') || 
//                       getElementText('bg') ||
//                       getAttributeValue('driving_license', 'blood_group') ||
//                       getAttributeValue('dl', 'blood_group');

//     const vehicleClass = getMultipleElementsText('vehicle_class') || 
//                         getMultipleElementsText('class') ||
//                         getMultipleElementsText('cov') ||
//                         this.extractVehicleClasses(xmlDoc);

//     const validTill = getElementText('validity_upto') || 
//                      getElementText('valid_till') ||
//                      getElementText('expiry_date') ||
//                      getElementText('validity') ||
//                      getAttributeValue('driving_license', 'validity_upto');

//     const validFrom = getElementText('validity_from') || 
//                      getElementText('valid_from') ||
//                      getElementText('effective_date') ||
//                      getAttributeValue('driving_license', 'validity_from');

//     const issueDate = getElementText('issue_date') || 
//                      getElementText('issued_date') ||
//                      getElementText('doi') ||
//                      getAttributeValue('driving_license', 'issue_date');

//     const rtoOffice = getElementText('rto_office') || 
//                      getElementText('rto') ||
//                      getElementText('issuing_authority') ||
//                      getElementText('office') ||
//                      getAttributeValue('driving_license', 'rto_office');

//     const licenseType = getElementText('license_type') || 
//                        getElementText('type') ||
//                        getElementText('category') ||
//                        getAttributeValue('driving_license', 'license_type');

//     const uri = getElementText('uri') || 
//                xmlDoc.querySelector('document')?.getAttribute('uri') ||
//                xmlDoc.documentElement.getAttribute('uri');

//     return {
//       type: 'driving_license',
//       name,
//       dob,
//       gender,
//       documentNumber,
//       fatherName,
//       address,
//       bloodGroup,
//       vehicleClass,
//       validTill,
//       validFrom,
//       issueDate,
//       rtoOffice,
//       licenseType,
      
//       meta: this.extractMeta(xmlDoc)
//     };
//   }

//   private static constructAddress(xmlDoc: Document): string {
//     const addressParts = [
//       'house_no', 'street', 'locality', 'city', 'district', 'state', 'pincode'
//     ];

//     let address = '';
//     addressParts.forEach(part => {
//       const element = xmlDoc.getElementsByTagName(part)[0];
//       if (element && element.textContent?.trim()) {
//         address += element.textContent.trim() + ', ';
//       }
//     });

//     // Remove trailing comma and space
//     return address.replace(/, $/, '');
//   }

//   private static extractVehicleClasses(xmlDoc: Document): string[] {
//     const classes: string[] = [];
    
//     // Look for various vehicle class patterns
//     const classPatterns = ['class', 'vehicle_class', 'cov', 'category'];
    
//     classPatterns.forEach(pattern => {
//       const elements = xmlDoc.getElementsByTagName(pattern);
//       for (let i = 0; i < elements.length; i++) {
//         const classText = elements[i].textContent?.trim();
//         if (classText && !classes.includes(classText)) {
//           classes.push(classText);
//         }
//       }
//     });

//     // Check for comma-separated classes in a single element
//     if (classes.length === 1 && classes[0].includes(',')) {
//       return classes[0].split(',').map(c => c.trim());
//     }

//     return classes;
//   }

//   private static extractMeta(xmlDoc: Document): any {
//     const meta: any = {};
    
//     // Extract from meta tags
//     const metaElements = xmlDoc.getElementsByTagName('meta');
//     for (let i = 0; i < metaElements.length; i++) {
//       const metaElement = metaElements[i];
//       Array.from(metaElement.attributes).forEach(attr => {
//         meta[attr.name] = attr.value;
//       });
//     }

//     // Extract additional attributes from root element
//     const rootElement = xmlDoc.documentElement;
//     if (rootElement) {
//       Array.from(rootElement.attributes).forEach(attr => {
//         meta[attr.name] = attr.value;
//       });
//     }

//     // Extract photo and signature data
//     const photo = xmlDoc.getElementsByTagName('photo')[0];
//     if (photo) {
//       meta.photo = photo.textContent?.trim();
//     }

//     const signature = xmlDoc.getElementsByTagName('signature')[0];
//     if (signature) {
//       meta.signature = signature.textContent?.trim();
//     }

//     return meta;
//   }

//   static validateDrivingLicenseData(data: DrivingLicenseData): { isValid: boolean; errors: string[] } {
//     const errors: string[] = [];

//     if (!data.name || data.name.trim().length === 0) {
//       errors.push('Name is required');
//     }

//     if (!data.dob || data.dob.trim().length === 0) {
//       errors.push('Date of birth is required');
//     }

//     if (!data.documentNumber || data.documentNumber.trim().length === 0) {
//       errors.push('Driving license number is required');
//     } else if (!/^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/.test(data.documentNumber.replace(/\s/g, ''))) {
//       errors.push('Invalid driving license number format (should be like HR0619850034761)');
//     }

//     // Additional validations
//     if (data.dob && !this.isValidDate(data.dob)) {
//       errors.push('Invalid date of birth format');
//     }

//     if (data.validTill && !this.isValidDate(data.validTill)) {
//       errors.push('Invalid validity end date format');
//     }

//     if (data.validFrom && !this.isValidDate(data.validFrom)) {
//       errors.push('Invalid validity start date format');
//     }

//     if (data.issueDate && !this.isValidDate(data.issueDate)) {
//       errors.push('Invalid issue date format');
//     }

//     return {
//       isValid: errors.length === 0,
//       errors
//     };
//   }

//   private static isValidDate(dateString: string): boolean {
//     // Check various date formats commonly used in Indian documents
//     const dateFormats = [
//       /^\d{2}\/\d{2}\/\d{4}$/,  // DD/MM/YYYY
//       /^\d{2}-\d{2}-\d{4}$/,    // DD-MM-YYYY
//       /^\d{4}-\d{2}-\d{2}$/,    // YYYY-MM-DD
//       /^\d{2}\/\d{2}\/\d{2}$/,  // DD/MM/YY
//       /^\d{2}-\d{2}-\d{2}$/     // DD-MM-YY
//     ];

//     return dateFormats.some(format => format.test(dateString));
//   }

//   // Additional utility methods for enhanced functionality
//   static formatDrivingLicenseNumber(dlNumber: string): string {
//     // Format DL number in standard format: XX00 00000000000
//     const cleaned = dlNumber.replace(/\s/g, '');
//     if (cleaned.length === 15) {
//       return `${cleaned.substring(0, 4)} ${cleaned.substring(4)}`;
//     }
//     return dlNumber;
//   }

//   static parseDrivingLicenseJSON(jsonString: string): DrivingLicenseData | null {
//     try {
//       const jsonData = JSON.parse(jsonString);
//       return this.mapJSONToDrivingLicenseData(jsonData);
//     } catch (error) {
//       console.error('Driving License JSON parsing error:', error);
//       return null;
//     }
//   }

//   private static mapJSONToDrivingLicenseData(jsonData: any): DrivingLicenseData {
//     return {
//       type: 'driving_license',
//       name: jsonData.name || jsonData.holder_name || jsonData.license_holder_name || '',
//       dob: jsonData.dob || jsonData.date_of_birth || jsonData.birth_date || '',
//       gender: jsonData.gender || jsonData.sex || '',
//       documentNumber: jsonData.license_number || jsonData.dl_number || jsonData.driving_license_number || jsonData.number || '',
//       fatherName: jsonData.father_name || jsonData.fathers_name || jsonData.guardian_name || '',
//       address: jsonData.address || jsonData.permanent_address || '',
//       bloodGroup: jsonData.blood_group || jsonData.bg || '',
//       vehicleClass: Array.isArray(jsonData.vehicle_class) ? jsonData.vehicle_class : 
//                    jsonData.vehicle_class ? [jsonData.vehicle_class] : 
//                    jsonData.class ? (Array.isArray(jsonData.class) ? jsonData.class : [jsonData.class]) : [],
//       validTill: jsonData.validity_upto || jsonData.valid_till || jsonData.expiry_date || jsonData.validity || '',
//       validFrom: jsonData.validity_from || jsonData.valid_from || jsonData.effective_date || '',
//       issueDate: jsonData.issue_date || jsonData.issued_date || jsonData.doi || '',
//       rtoOffice: jsonData.rto_office || jsonData.rto || jsonData.issuing_authority || jsonData.office || '',
//       licenseType: jsonData.license_type || jsonData.type || jsonData.category || '',
//       uri: jsonData.uri || '',
//       meta: jsonData.meta || {}
//     };
//   }
// }