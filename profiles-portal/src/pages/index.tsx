import { useState } from 'react'
import Layout from '../component/Layout'
// import { useRouter } from 'next/navigation'
// import { AadhaarComparison, ComparisonResult } from '../types/aadhaarComparison'
// import { AadhaarParser } from '../parsers/aadhaarParser'

export default function Home() {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    dob: '',
    email: '',
    phone: '',
    profilePhoto: '',
    education: '',
    residence: '',
    addressCity: '',
    addressState: '',
    addressCountry: '',
    currentResidence: '',
    currentCity: '',
    currentState: '',
    currentCountry: '',
    about: '',
    interests: '',
    selectedIds: [] as string[],
    idDetails: {
      aadhar: '',
      drivingLicense: '',
      passport: '',
      voterIdCard: '',
      panCard: ''
    }
  })

  // New state for Aadhaar verification
  // const [aadhaarXml, setAadhaarXml] = useState<string>('')
  // const [parsedAadhaarData, setParsedAadhaarData] = useState<any>(null)
  // const [verificationResult, setVerificationResult] = useState<ComparisonResult | null>(null)
  // const [isVerifying, setIsVerifying] = useState(false)
  // const [xmlProcessing, setXmlProcessing] = useState(false)

  // const router = useRouter()

  const calculateAge = (dob: string) => {
    if (!dob) return ''
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age.toString()
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'dob') {
      const calculatedAge = calculateAge(value)
      setForm({ ...form, dob: value, age: calculatedAge })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const photoURL = URL.createObjectURL(file)
      setForm({ ...form, profilePhoto: photoURL })
    }
  }

  const handleIdSelection = (idValue: string) => {
    if (form.selectedIds.includes(idValue)) {
      setForm({
        ...form,
        selectedIds: form.selectedIds.filter((id) => id !== idValue),
      })
    } else {
      setForm({
        ...form,
        selectedIds: [...form.selectedIds, idValue],
      })
    }
  }

  // const handleIdDetailsChange = (idType: string, value: string) => {
  //   setForm({
  //     ...form,
  //     idDetails: {
  //       ...form.idDetails,
  //       [idType]: value
  //     }
  //   })
  // }

  // Updated function to handle Aadhaar XML upload and automatic parsing
  // const handleAadhaarXmlUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0]
  //     setXmlProcessing(true)
      
  //     try {
  //       const reader = new FileReader()
  //       reader.onload = async (event) => {
  //         const xmlContent = event.target?.result as string
  //         setAadhaarXml(xmlContent)
          
  //         // Automatically parse the XML and extract data
  //         const parsedData = AadhaarParser.parseAadhaarXML(xmlContent)
          
  //         if (parsedData) {
  //           setParsedAadhaarData(parsedData)
            
  //           // Auto-fill form fields with parsed data
  //           setForm(prevForm => ({
  //             ...prevForm,
  //             fullName: parsedData.name || prevForm.fullName,
  //             dob: parsedData.dob || prevForm.dob,
  //             age: parsedData.dob ? calculateAge(parsedData.dob) : prevForm.age,
  //             idDetails: {
  //               ...prevForm.idDetails,
  //               aadhar: parsedData.documentNumber || prevForm.idDetails.aadhar
  //             },
  //             // Auto-fill address if available
  //             residence: parsedData.address || prevForm.residence,
  //             addressCity: parsedData.city || prevForm.addressCity,
  //             addressState: parsedData.state || prevForm.addressState,
  //             addressCountry: parsedData.country || prevForm.addressCountry
  //           }))
            
  //           // Automatically select Aadhaar if not already selected
  //           if (!prevForm.selectedIds.includes('aadhar')) {
  //             setForm(prevForm => ({
  //               ...prevForm,
  //               selectedIds: [...prevForm.selectedIds, 'aadhar']
  //             }))
  //           }
            
  //           alert('Aadhaar XML processed successfully! Form fields have been auto-filled.')
  //         } else {
  //           alert('Failed to parse Aadhaar XML. Please check the file format.')
  //         }
  //       }
        
  //       reader.onerror = () => {
  //         alert('Error reading the XML file. Please try again.')
  //       }
        
  //       reader.readAsText(file)
  //     } catch (error) {
  //       console.error('Error processing XML file:', error)
  //       alert('Error processing XML file. Please try again.')
  //     } finally {
  //       setXmlProcessing(false)
  //     }
  //   }
  // }

  // Updated function to handle Aadhaar verification using parsed data
  // const handleAadhaarVerification = async () => {
  //   if (!parsedAadhaarData) {
  //     alert('Please upload and process an Aadhaar XML file first')
  //     return
  //   }

  //   if (!form.selectedIds.includes('aadhar')) {
  //     alert('Please select Aadhaar card from ID documents')
  //     return
  //   }

  //   setIsVerifying(true)
    
  //   try {
  //     const result = AadhaarComparison.compareWithParsedData(form, parsedAadhaarData)
  //     setVerificationResult(result)
      
  //     if (result.isMatch) {
  //       alert(`Aadhaar verification successful! Confidence: ${result.confidence}%`)
  //     } else {
  //       alert(`Aadhaar verification failed. Mismatched fields: ${result.misMatchedFields.join(', ')}`)
  //     }
  //   } catch (error) {
  //     console.error('Verification error:', error)
  //     alert('Verification failed due to an error')
  //   } finally {
  //     setIsVerifying(false)
  //   }
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
    
  //   // Optional: Require Aadhaar verification before submission
  //   if (form.selectedIds.includes('aadhar') && !verificationResult?.isMatch) {
  //     const proceed = confirm('Aadhaar verification is not complete. Do you want to proceed anyway?')
  //     if (!proceed) return
  //   }

  //   localStorage.setItem('commonForm', JSON.stringify(form))
    
  //   // Also save verification result if available
  //   if (verificationResult) {
  //     localStorage.setItem('aadhaarVerification', JSON.stringify(verificationResult))
  //   }
    
  //   // Save parsed Aadhaar data if available
  //   if (parsedAadhaarData) {
  //     localStorage.setItem('parsedAadhaarData', JSON.stringify(parsedAadhaarData))
  //   }
    
  //   router.push('/category')
  // }

  const idOptions = [
    { value: 'aadhar', label: 'Aadhar Card', placeholder: 'Enter 12-digit Aadhar number' },
    { value: 'drivingLicense', label: 'Driving License', placeholder: 'Enter driving license number' },
    { value: 'passport', label: 'Passport', placeholder: 'Enter passport number' },
    { value: 'voterIdCard', label: 'Voter ID Card', placeholder: 'Enter voter ID number' },
    { value: 'panCard', label: 'PAN Card', placeholder: 'Enter PAN number' }
  ]

  return (
    <Layout>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Left Side: Logo + Name */}
        <div className="w-200 h-160 flex flex-col items-center justify-center ">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-90 h-90"
          />
          <h1 className="text-2xl text-blue font-mono">Connecting the World</h1>
        </div>

        {/* Right Side: Form Box */}
        <div className="w-200 h-160 bg-gradient-to-b from-white to-blue-50 flex flex-col">
          <h1 className="text-3xl font-bold text-blue-600 mb-4 p-6">
            Let us know about you!
          </h1>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <form
              // onSubmit={handleSubmit}
              className="bg-gradient-to-b shadow-md rounded px-8 pt-6 pb-8 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* DOB */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Birth
                  </label>
                  <input
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email ID
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Profile Photo */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Upload Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {form.profilePhoto && (
                    <img
                      src={form.profilePhoto}
                      alt="Preview"
                      className="mt-4 h-32 w-32 object-cover rounded-full border"
                    />
                  )}
                </div>

                {/* ID Selection */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select ID Documents
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {idOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={form.selectedIds.includes(option.value)}
                          onChange={() => handleIdSelection(option.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-800">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dynamic ID Inputs */}
                {/* {form.selectedIds.map((idType) => {
                  const idOption = idOptions.find(option => option.value === idType)
                  return (
                    <div key={idType} className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        {idOption?.label} Number
                      </label>
                      <input
                        type="text"
                        value={form.idDetails[idType as keyof typeof form.idDetails]}
                        onChange={(e) => handleIdDetailsChange(idType, e.target.value)}
                        placeholder={idOption?.placeholder}
                        className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )
                })} */}

                {/* Aadhaar XML Upload and Verification */}
                {/* {form.selectedIds.includes('aadhar') && (
                  <div className="md:col-span-2">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Aadhaar Verification
                      </h3>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Upload Aadhaar XML File
                        </label>
                        <input
                          type="file"
                          accept=".xml"
                          onChange={handleAadhaarXmlUpload}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {xmlProcessing && (
                          <div className="mt-2 text-sm text-blue-600">
                            Processing XML file and auto-filling form...
                          </div>
                        )}
                      </div> */}

                      {/* Display parsed data info */}
                      {/* {parsedAadhaarData && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
                          <div className="text-sm text-green-800 font-medium">
                            ✓ XML Processed Successfully
                          </div>
                          <div className="text-xs text-green-600 mt-1">
                            Name: {parsedAadhaarData.name} | DOB: {parsedAadhaarData.dob} | Document: {parsedAadhaarData.documentNumber}
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleAadhaarVerification}
                        disabled={!parsedAadhaarData || isVerifying}
                        className={`px-4 py-2 rounded font-medium ${
                          !parsedAadhaarData || isVerifying
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isVerifying ? 'Verifying...' : 'Verify Aadhaar Data'}
                      </button> */}

                      {/* Verification Result Display */}
                      {/* {verificationResult && (
                        <div className={`mt-4 p-3 rounded ${
                          verificationResult.isMatch 
                            ? 'bg-green-100 border border-green-300' 
                            : 'bg-red-100 border border-red-300'
                        }`}>
                          <div className={`font-medium ${
                            verificationResult.isMatch ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {verificationResult.isMatch ? '✓ Verification Successful' : '✗ Verification Failed'}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Confidence: {verificationResult.confidence}%
                          </div>
                          {verificationResult.matchedFields.length > 0 && (
                            <div className="text-sm text-green-600 mt-1">
                              Matched: {verificationResult.matchedFields.join(', ')}
                            </div>
                          )}
                          {verificationResult.misMatchedFields.length > 0 && (
                            <div className="text-sm text-red-600 mt-1">
                              Mismatched: {verificationResult.misMatchedFields.join(', ')}
                            </div>
                          )}
                          {verificationResult.errors.length > 0 && (
                            <div className="text-sm text-red-600 mt-1">
                              Errors: {verificationResult.errors.join(', ')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )} */}

                {/* Education */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Educational Background
                  </label>
                  <textarea
                    name="education"
                    value={form.education}
                    onChange={handleChange}
                    placeholder="Enter education"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                {/* Permanent Address */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    Permanent Address
                  </h2>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Residence
                  </label>
                  <input
                    name="residence"
                    value={form.residence}
                    onChange={handleChange}
                    placeholder="Residence"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    City
                  </label>
                  <input
                    name="addressCity"
                    value={form.addressCity}
                    onChange={handleChange}
                    placeholder="City"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    State
                  </label>
                  <input
                    name="addressState"
                    value={form.addressState}
                    onChange={handleChange}
                    placeholder="State"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country
                  </label>
                  <input
                    name="addressCountry"
                    value={form.addressCountry}
                    onChange={handleChange}
                    placeholder="Country"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Current Address */}
                <div className="md:col-span-2 mt-4">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    Current Address
                  </h2>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Residence
                  </label>
                  <input
                    name="currentResidence"
                    value={form.currentResidence}
                    onChange={handleChange}
                    placeholder="Current Residence"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    City
                  </label>
                  <input
                    name="currentCity"
                    value={form.currentCity}
                    onChange={handleChange}
                    placeholder="Current city"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    State
                  </label>
                  <input
                    name="currentState"
                    value={form.currentState}
                    onChange={handleChange}
                    placeholder="Current state"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country
                  </label>
                  <input
                    name="currentCountry"
                    value={form.currentCountry}
                    onChange={handleChange}
                    placeholder="Current country"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* About */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={form.about}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                {/* Interests */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Interests
                  </label>
                  <input
                    name="interests"
                    value={form.interests}
                    onChange={handleChange}
                    placeholder="Your interests"
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}