import { useState } from 'react'
import Layout from '../component/Layout'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
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
    selectedIds: [], // Array to store selected ID types
    idDetails: {
      aadhar: '',
      drivingLicense: '',
      passport: '',
      voterIdCard: '',
      panCard: ''
    }
  })

  const router = useRouter()

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

  // Handle ID selection
  const handleIdSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
    setForm({ ...form, selectedIds: selectedOptions })
  }

  // Handle ID details input
  const handleIdDetailsChange = (idType: string, value: string) => {
    setForm({
      ...form,
      idDetails: {
        ...form.idDetails,
        [idType]: value
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('commonForm', JSON.stringify(form))
    router.push('/category')
  }

  // ID options configuration
  const idOptions = [
    { value: 'aadhar', label: 'Aadhar Card', placeholder: 'Enter 12-digit Aadhar number' },
    { value: 'drivingLicense', label: 'Driving License', placeholder: 'Enter driving license number' },
    { value: 'passport', label: 'Passport', placeholder: 'Enter passport number' },
    { value: 'voterIdCard', label: 'Voter ID Card', placeholder: 'Enter voter ID number' },
    { value: 'panCard', label: 'PAN Card', placeholder: 'Enter PAN number' }
  ]

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Let us know about you!
      </h1>
        <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(#ffffff, #e0f7ff)" }}
>


      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
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

            {/* Date of Birth */}
            <div>
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

            {/* Age */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Age
              </label>
              <input
                name="age"
                type="number"
                value={form.age}
                placeholder="Age will be auto-calculated"
                readOnly
                className="shadow border rounded w-full py-3 px-4 text-gray-700 bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Date of Birth */}
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

            {/* Profile Photo Upload */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
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
                Select ID Documents (Hold Ctrl/Cmd to select multiple)
              </label>
              <select
                multiple
                value={form.selectedIds}
                onChange={handleIdSelection}
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              >
                {idOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic ID Input Boxes */}
            {form.selectedIds.map((idType) => {
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
            })}

            {/* Education */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Educational Background
              </label>
              <input
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="Enter education"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* --- Current Address Section --- */}
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
                placeholder="Current City"
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
                placeholder="Current State"
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
                placeholder="Current Country"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          
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

            {/* ID Type */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select ID Type
              </label>
              <select
                name="idType"
                value={form.idType}
                onChange={handleChange}
                className="shadow border rounded w-full py-3 px-4 text-gray-1200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select ID --</option>
                <option value="Aadhar">Aadhar Card</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>

            {/* ID Number - show only if ID Type is selected */}
            {form.idType && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {form.idType} Number
                </label>
                <input
                  name="idNumber"
                  value={form.idNumber}
                  onChange={handleChange}
                  placeholder={`Enter ${form.idType} Number`}
                  className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            {/* About & Interests */}
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
    </Layout>
  )
}