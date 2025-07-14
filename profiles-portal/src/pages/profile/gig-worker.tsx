import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import CommonDetails from '../../component/CommonDetails'
import { useRouter } from 'next/navigation'

export default function GigWorkerProfile() {
  const router = useRouter()
  const [commonForm, setCommonForm] = useState<any>({})
  const [gigForm, setGigForm] = useState({
    primarySkill: '',
    serviceOffered: '',
    yearsOfExperience: '',
    portfolioURL: '',
    proofOfWork: '',
    pastClientReference: '',
    workingPlatforms: '',
    governmentID: '',
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
    setGigForm({ ...gigForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setGigForm({ ...gigForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Common:', commonForm)
    console.log('Gig Worker:', gigForm)
    router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Gig Worker Profile Details
      </h1>

      {/* ✅ Gig Worker-specific Form */}
      <div className="min-h-screen bg-cover bg-center  bg-gradient-to-b from-white to-blue-50">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
        >
            <CommonDetails commonForm={commonForm} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary Skill */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Primary Skill
              </label>
              <input
                name="primarySkill"
                value={gigForm.primarySkill}
                onChange={handleChange}
                placeholder="Your main skill"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Service Offered */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Service Offered
              </label>
              <input
                name="serviceOffered"
                value={gigForm.serviceOffered}
                onChange={handleChange}
                placeholder="e.g., Graphic Design, Content Writing"
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
                value={gigForm.yearsOfExperience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Portfolio URL */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Portfolio URL (optional)
              </label>
              <input
                name="portfolioURL"
                type="url"
                value={gigForm.portfolioURL}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Proof of Work */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Proof of Work
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="proofOfWork"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            {/* Past Client Reference */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Past Client Reference
              </label>
              <textarea
                name="pastClientReference"
                value={gigForm.pastClientReference}
                onChange={handleChange}
                placeholder="Add reference or description"
                rows={3}
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Working Platforms */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Working Platforms
              </label>
              <input
                name="workingPlatforms"
                value={gigForm.workingPlatforms}
                onChange={handleChange}
                placeholder="Upwork, Fiverr, Freelancer.com, etc."
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Government ID */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Government ID
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