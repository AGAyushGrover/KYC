import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { useRouter } from 'next/navigation'

export default function LegalProfessionalProfile() {
  const router = useRouter()
  const [legalForm, setLegalForm] = useState({
    barCouncilNumber: '',
    workEnvironment: '',
    practicingState: '',
    yearsOfExperience: '',
    specialization: [] as string[],
    otherSpecialization: '',
    lawFirmOrIndependent: '',
    barCouncilCertificate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLegalForm({ ...legalForm, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setLegalForm((prev) => {
      const specializations = prev.specialization
      if (checked) {
        return { ...prev, specialization: [...specializations, value] }
      } else {
        return {
          ...prev,
          specialization: specializations.filter((item) => item !== value),
        }
      }
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setLegalForm({ ...legalForm, barCouncilCertificate: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Legal Professional:', legalForm)
    router.push('/FinalForm')
  }

  const specializationOptions = [
    'Corporate',
    'Intellectual Property (IP)',
    'Criminal',
    'Civil',
    'Family',
    'Tax',
    'Other',
  ]

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Legal Professional Profile Details
      </h1>

      <div className="min-h-screen bg-cover bg-center  bg-gradient-to-b from-white to-blue-50">
            <div className="flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
              >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bar Council Registration Number
              </label>
              <input
                name="barCouncilNumber"
                value={legalForm.barCouncilNumber}
                onChange={handleChange}
                placeholder="Enter number"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Work Environment
              </label>
              <input
                name="workEnvironment"
                value={legalForm.workEnvironment}
                onChange={handleChange}
                placeholder="Law firm, court practice etc."
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Practicing State / Jurisdiction
              </label>
              <input
                name="practicingState"
                value={legalForm.practicingState}
                onChange={handleChange}
                placeholder="e.g., Delhi, Maharashtra"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Years of Experience
              </label>
              <input
                name="yearsOfExperience"
                type="number"
                value={legalForm.yearsOfExperience}
                onChange={handleChange}
                placeholder="e.g., 5"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Specialization checkboxes */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                    Specialization
                </label>
                <div className="text-base flex flex-wrap gap-4">
                    {specializationOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-3 text-base">
                        <input
                        type="checkbox"
                        name="specialization"
                        value={option}
                        checked={legalForm.specialization.includes(option)}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5" // larger checkbox
                        />
                        <span>{option}</span>
                    </label>
                    ))}
              </div>
              {legalForm.specialization.includes('Other') && (
                <input
                  type="text"
                  name="otherSpecialization"
                  value={legalForm.otherSpecialization}
                  onChange={handleChange}
                  placeholder="Specify other specialization"
                  className="mt-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            {/* Law firm / Independent */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Law Firm / Independent
              </label>
              <select
                name="lawFirmOrIndependent"
                value={legalForm.lawFirmOrIndependent}
                onChange={handleChange}
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Law Firm">Law Firm</option>
                <option value="Independent">Independent</option>
              </select>
            </div>

            {/* Upload Certificate */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Bar Council Certificate or Gov ID
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="barCouncilCertificate"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6"
          >
            Submit
          </button>
        </form>
      </div>
      </div>
    </Layout>
  )
}