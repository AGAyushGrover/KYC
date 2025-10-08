import { useState } from 'react'
import Layout from '../../component/Layout'
import { useRouter } from 'next/navigation'

export default function MarketingProfile() {
  const router = useRouter()
  const [marketingForm, setMarketingForm] = useState({
    professionalBackground: '',
    currentCompany: '',
    currentRole: '',
    areaOfFocus: '',
    yearsOfExperience: '',
    keyClients: '',
    portfolio: '',
    governmentID: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMarketingForm({ ...marketingForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setMarketingForm({ ...marketingForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Marketing:', marketingForm)
    router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Marketing & Sales Professional Profile
      </h1>

      <div className="min-h-screen bg-cover bg-center  bg-gradient-to-b from-white to-blue-50">
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
            >

          {/* ✅ Marketing-specific fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Professional Background
              </label>
              <input
                name="professionalBackground"
                value={marketingForm.professionalBackground}
                onChange={handleChange}
                placeholder="Describe your professional background"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Company / Agency
              </label>
              <input
                name="currentCompany"
                value={marketingForm.currentCompany}
                onChange={handleChange}
                placeholder="Company or Agency"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Role
              </label>
              <input
                name="currentRole"
                value={marketingForm.currentRole}
                onChange={handleChange}
                placeholder="Current Role"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Area of Focus (e.g., Digital Marketing, B2B Sales)
              </label>
              <input
                name="areaOfFocus"
                value={marketingForm.areaOfFocus}
                onChange={handleChange}
                placeholder="Area of Focus"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Years of Experience
              </label>
              <input
                name="yearsOfExperience"
                value={marketingForm.yearsOfExperience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Key Clients or Campaigns (optional)
              </label>
              <textarea
                name="keyClients"
                value={marketingForm.keyClients}
                onChange={handleChange}
                placeholder="Key Clients or Campaigns"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* Upload Portfolio */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Portfolio / Case Studies
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="portfolio"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            {/* Government or Company ID */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Government ID / Company ID
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="governmentID"
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