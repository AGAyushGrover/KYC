import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { useRouter } from 'next/navigation'

export default function FinancialProfessionalProfile() {
  const router = useRouter()
  const [financialForm, setFinancialForm] = useState({
    currentFirm: '',
    role: '',
    licenseNumber: '',
    yearsOfExperience: '',
    professionalCertificate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFinancialForm({ ...financialForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setFinancialForm({ ...financialForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Financial Professional:', financialForm)
    router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Financial Professional Profile Details
      </h1>

      {/* ✅ Financial Professional-specific Form */}
      <div className="min-h-screen bg-cover bg-center  bg-gradient-to-b from-white to-blue-50" >
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Firm / Independent */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Firm / Independent
              </label>
              <input
                name="currentFirm"
                value={financialForm.currentFirm}
                onChange={handleChange}
                placeholder="Name of firm or write Independent"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role (e.g., CA, CFA, Financial Analyst, Auditor)
              </label>
              <input
                name="role"
                value={financialForm.role}
                onChange={handleChange}
                placeholder="e.g., CA, CFA, Analyst"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* License or Registration Number */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                License or Registration Number (if applicable)
              </label>
              <input
                name="licenseNumber"
                value={financialForm.licenseNumber}
                onChange={handleChange}
                placeholder="License or Registration Number"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Years of Experience
              </label>
              <input
                name="yearsOfExperience"
                type="number"
                value={financialForm.yearsOfExperience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Professional Certificate */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Professional Certificate (e.g., ICAI membership) / Current ID
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="professionalCertificate"
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