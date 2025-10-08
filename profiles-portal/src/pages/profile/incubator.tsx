import { useState } from 'react'
import Layout from '../../component/Layout'
import { useRouter } from 'next/navigation'

export default function IncubatorProfile() {
  const router = useRouter()
  const [incubatorForm, setIncubatorForm] = useState({
    incubatorName: '',
    institutionType: '',
    registrationNumber: '',
    yearsOfOperation: '',
    startupsIncubated: '',
    portfolio: '',
    registrationCertificate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIncubatorForm({ ...incubatorForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setIncubatorForm({ ...incubatorForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Incubator:', incubatorForm)
    router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Incubator / Accelerator Profile Details
      </h1>

      <div className="min-h-screen bg-cover bg-center  bg-gradient-to-b from-white to-blue-50">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
        >

          {/* ✅ Incubator-specific fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Incubator / Accelerator Name
              </label>
              <input
                name="incubatorName"
                value={incubatorForm.incubatorName}
                onChange={handleChange}
                placeholder="Incubator Name"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Institution Type
              </label>
              <input
                name="institutionType"
                value={incubatorForm.institutionType}
                onChange={handleChange}
                placeholder="Institution Type"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Registration Number
              </label>
              <input
                name="registrationNumber"
                value={incubatorForm.registrationNumber}
                onChange={handleChange}
                placeholder="Registration Number"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Years of Operation
              </label>
              <input
                name="yearsOfOperation"
                value={incubatorForm.yearsOfOperation}
                onChange={handleChange}
                placeholder="Years of Operation"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Number of Startups Incubated
              </label>
              <input
                name="startupsIncubated"
                value={incubatorForm.startupsIncubated}
                onChange={handleChange}
                placeholder="Number of Startups"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Portfolio
              </label>
              <textarea
                name="portfolio"
                value={incubatorForm.portfolio}
                onChange={handleChange}
                placeholder="Brief about your portfolio"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Registration Certificate
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="registrationCertificate"
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
