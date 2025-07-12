import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import CommonDetails from '../../component/CommonDetails'

export default function FounderProfile() {
  const [commonForm, setCommonForm] = useState<any>({})
  const [founderForm, setFounderForm] = useState({
    companyName: '',
    startupStage: '',
    visionGoals: '',
    industrySector: '',
    registeredPhone: '',
    founderEmail: '',
    registrationNumber: '',
    websiteURL: '',
    foundingYear: '',
    incorporationCertificate: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('commonForm')
    if (saved) {
      setCommonForm(JSON.parse(saved))
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFounderForm({ ...founderForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setFounderForm({ ...founderForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Common:', commonForm)
    console.log('Founder:', founderForm)
    // Save or send to backend later
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Founder Profile Details
      </h1>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl"
        >
          {/* ✅ --- Show common details --- */}
          <CommonDetails commonForm={commonForm} />

          {/* ✅ --- Founder-specific fields --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Startup / Company Name
              </label>
              <input
                name="companyName"
                value={founderForm.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Stages of Startup
              </label>
              <input
                name="startupStage"
                value={founderForm.startupStage}
                onChange={handleChange}
                placeholder="e.g. Idea, Seed, Growth"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Vision & Goals
              </label>
              <textarea
                name="visionGoals"
                value={founderForm.visionGoals}
                onChange={handleChange}
                placeholder="Vision & Goals"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Industry / Sector
              </label>
              <input
                name="industrySector"
                value={founderForm.industrySector}
                onChange={handleChange}
                placeholder="Industry Sector"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Registered Phone No.
              </label>
              <input
                name="registeredPhone"
                value={founderForm.registeredPhone}
                onChange={handleChange}
                placeholder="Registered Phone"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Founder Email
              </label>
              <input
                name="founderEmail"
                type="email"
                value={founderForm.founderEmail}
                onChange={handleChange}
                placeholder="Founder Email"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Startup Registration Number (CIN / LLPIN)
              </label>
              <input
                name="registrationNumber"
                value={founderForm.registrationNumber}
                onChange={handleChange}
                placeholder="Registration Number"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Website URL
              </label>
              <input
                name="websiteURL"
                type="url"
                value={founderForm.websiteURL}
                onChange={handleChange}
                placeholder="https://..."
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Founding Year
              </label>
              <input
                name="foundingYear"
                value={founderForm.foundingYear}
                onChange={handleChange}
                placeholder="Founding Year"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Company Incorporation Certificate
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="incorporationCertificate"
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
    </Layout>
  )
}