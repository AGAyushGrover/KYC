import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import CommonDetails from '../../component/CommonDetails'

export default function InvestorProfile() {
  const [commonForm, setCommonForm] = useState<any>({})
  const [investorForm, setInvestorForm] = useState({
    professionalBackground: '',
    firmName: '',
    investmentType: '',
    investmentStage: '',
    experience: '',
    pastInvestments: '',
    investmentSize: '',
    investmentFields: '',
    accreditationProof: '',
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
    setInvestorForm({ ...investorForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setInvestorForm({ ...investorForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Common:', commonForm)
    console.log('Investor:', investorForm)
    // Save or send to backend later
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Investor Profile Details
      </h1>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl"
        >
          {/* ✅ Common details */}
          <CommonDetails commonForm={commonForm} />

          {/* ✅ Investor-specific fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Professional Background
              </label>
              <input
                name="professionalBackground"
                value={investorForm.professionalBackground}
                onChange={handleChange}
                placeholder="Your Professional Background"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Firm Name (if any)
              </label>
              <input
                name="firmName"
                value={investorForm.firmName}
                onChange={handleChange}
                placeholder="Firm Name"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Investment Type (Angel, VC, PE, Family Office)
              </label>
              <input
                name="investmentType"
                value={investorForm.investmentType}
                onChange={handleChange}
                placeholder="Investment Type"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Investment Stage Focus (Seed, Series A, Growth)
              </label>
              <input
                name="investmentStage"
                value={investorForm.investmentStage}
                onChange={handleChange}
                placeholder="Investment Stage Focus"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Experience
              </label>
              <input
                name="experience"
                value={investorForm.experience}
                onChange={handleChange}
                placeholder="Years or Details of Experience"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Past Investments (if any)
              </label>
              <textarea
                name="pastInvestments"
                value={investorForm.pastInvestments}
                onChange={handleChange}
                placeholder="Mention any past investments"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Investment Size
              </label>
              <input
                name="investmentSize"
                value={investorForm.investmentSize}
                onChange={handleChange}
                placeholder="Average Investment Size"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Investment Fields
              </label>
              <input
                name="investmentFields"
                value={investorForm.investmentFields}
                onChange={handleChange}
                placeholder="Preferred Sectors/Fields"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Accreditation Proof */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Accreditation Proof / Past Investments Doc. / Registration
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="accreditationProof"
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