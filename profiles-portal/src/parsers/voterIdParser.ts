// // parsers/voterIdParser.ts
// export interface VoterIdData {
//   type: 'voter_id';
//   name: string;
//   dob: string;
//   gender?: string;
//   documentNumber: string;
//   fatherName?: string;
//   motherName?: string;
//   husbandName?: string;
//   address?: string;
//   assemblyConstituency?: string;
//   parliamentaryConstituency?: string;
//   partNumber?: string;
//   slNumber?: string;
//   issueDate?: string;
//   uri?: string;
//   meta?: any;
// }

// export class VoterIdParser {
//   static parseVoterIdXML(xmlString: string): VoterIdData | null {
//     try {
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
//       // Check for parsing errors
//       const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
//       if (parseError) {
//         throw new Error('XML parsing error: ' + parseError.textContent);
//       }

//       return this.extractVoterIdData(xmlDoc);
//     } catch (error) {
//       console.error('Voter ID XML parsing error:', error);
//       return null;
//     }
//   }

//   private static extractVoterIdData(xmlDoc: Document): VoterIdData {
//     const getElementText = (tagName: string): string => {
//       const element = xmlDoc.getElementsByTagName(tagName)[0];
//       return element ? element.textContent?.trim() || '' : '';
//     };

//     const getAttributeValue = (tagName: string, attribute: string): string => {
//       const element = xmlDoc.getElementsByTagName(tagName)[0];
//       return element ? element.getAttribute(attribute) || '' : '';
//     };

//     // Handle different XML structures for Voter ID
//     const name = getElementText('name') || 
//                  getElementText('voter_name') ||
//                  getElementText('holder_name') ||
//                  getAttributeValue('voter_id', 'name') ||
//                  getAttributeValue('voter', 'name');

//     const dob = getElementText('dob') || 
//                 getElementText('date_of_birth') ||
//                 getElementText('age') ||
//                 getAttributeValue('voter_id', 'dob') ||
//                 getAttributeValue('voter', 'dob');

//     const gender = getElementText('gender') || 
//                    getElementText('sex') ||
//                    getAttributeValue('voter_id', 'gender') ||
//                    getAttributeValue('voter', 'gender');

//     const documentNumber = getElementText('voter_id_number') || 
//                           getElementText('epic_number') ||
//                           getElementText('voter_number') ||
//                           getElementText('card_number') ||
//                           getAttributeValue('voter_id', 'number') ||
//                           getAttributeValue('voter_id', 'epic_number');

//     const fatherName = getElementText('father_name') || 
//                       getElementText('fathers_name') ||
//                       getElementText('rln_name') ||
//                       getAttributeValue('voter_id', 'father_name') ||
//                       getAttributeValue('voter', 'father_name');

//     const motherName = getElementText('mother_name') || 
//                       getElementText('mothers_name') ||
//                       getAttributeValue('voter_id', 'mother_name') ||
//                       getAttributeValue('voter', 'mother_name');

//     const husbandName = getElementText('husband_name') || 
//                        getElementText('husbands_name') ||
//                        getAttributeValue('voter_id', 'husband_name') ||
//                        getAttributeValue('voter', 'husband_name');

//     const address = getElementText('address') || 
//                    getElementText('permanent_address') ||
//                    this.constructAddress(xmlDoc);

//     const assemblyConstituency = getElementText('assembly_constituency') || 
//                                 getElementText('ac_name') ||
//                                 getElementText('constituency') ||
//                                 getAttributeValue('voter_id', 'assembly_constituency');

//     const parliamentaryConstituency = getElementText('parliamentary_constituency') || 
//                                      getElementText('pc_name') ||
//                                      getAttributeValue('voter_id', 'parliamentary_constituency');

//     const partNumber = getElementText('part_number') || 
//                       getElementText('part_no') ||
//                       getAttributeValue('voter_id', 'part_number');

//     const slNumber = getElementText('sl_number') || 
//                     getElementText('serial_number') ||
//                     getElementText('sl_no') ||
//                     getAttributeValue('voter_id', 'sl_number');

//     const issueDate = getElementText('issue_date') || 
//                      getElementText('issued_date') ||
//                      getAttributeValue('voter_id', 'issue_date');

//     const uri = getElementText('uri') || 
//                xmlDoc.querySelector('document')?.getAttribute('uri') ||
//                xmlDoc.documentElement.getAttribute('uri');

//     return {
//       type: 'voter_id',
//       name,
//       dob,
//       gender,
//       documentNumber,
//       fatherName,
//       motherName,
//       husbandName,
//       address,
//       assemblyConstituency,
//       parliamentaryConstituency,
//       partNumber,
//       slNumber,
//       issueDate,
     
//       meta: this.extractMeta(xmlDoc)
//     };
//   }

//   private static constructAddress(xmlDoc: Document): string {
//     const addressParts = [
//       'house_no', 'street', 'locality', 'village', 'mandal', 'district', 'state', 'pincode'
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

//   static validateVoterIdData(data: VoterIdData): { isValid: boolean; errors: string[] } {
//     const errors: string[] = [];

//     if (!data.name || data.name.trim().length === 0) {
//       errors.push('Name is required');
//     }

//     if (!data.dob || data.dob.trim().length === 0) {
//       errors.push('Date of birth is required');
//     }

//     if (!data.documentNumber || data.documentNumber.trim().length === 0) {
//       errors.push('Voter ID number is required');
//     } else if (!/^[A-Z]{3}[0-9]{7}$/.test(data.documentNumber.replace(/\s/g, ''))) {
//       errors.push('Invalid Voter ID number format (should be like ABC1234567)');
//     }

//     return {
//       isValid: errors.length === 0,
//       errors
//     };
//   }
// }