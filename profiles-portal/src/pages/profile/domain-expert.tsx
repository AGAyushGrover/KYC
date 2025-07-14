// pages/profile/domain-expert.tsx
import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import CommonDetails from '../../component/CommonDetails'
import { useRouter } from 'next/navigation'

export default function DomainExpertProfile() {
  const router = useRouter()
  const [commonForm, setCommonForm] = useState<any>({})
  const [domainForm, setDomainForm] = useState({
    primaryDomain: '',
    yearsOfExperience: '',
    pastProjects: '',
    currentCompany: '',
    currentRole: '',
    portfolioURL: '',
    resume: '',
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
    setDomainForm({ ...domainForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setDomainForm({ ...domainForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Common:', commonForm)
    console.log('Domain Expert:', domainForm)
    router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Domain Expert Profile Details
      </h1>
      <div className="min-h-screen bg-cover bg-center  bg-gradient-to-b from-white to-blue-50" >
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
        >
            <CommonDetails commonForm={commonForm} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary Domain */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Primary Domain / Specialization (e.g., AI, Blockchain, IoT)
              </label>
              <input
                name="primaryDomain"
                value={domainForm.primaryDomain}
                onChange={handleChange}
                placeholder="e.g., AI, Blockchain, IoT"
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
                value={domainForm.yearsOfExperience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Past Projects */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Past Projects Details
              </label>
              <textarea
                name="pastProjects"
                value={domainForm.pastProjects}
                onChange={handleChange}
                placeholder="Describe your key projects"
                rows={3}
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Current Company */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Company / Freelance / Consultancy
              </label>
              <input
                name="currentCompany"
                value={domainForm.currentCompany}
                onChange={handleChange}
                placeholder="Company / Freelance / Consultancy"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Current Role */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Role
              </label>
              <input
                name="currentRole"
                value={domainForm.currentRole}
                onChange={handleChange}
                placeholder="Current Role"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Portfolio URL */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Portfolio URL (GitHub, Behance, personal site)
              </label>
              <input
                name="portfolioURL"
                type="url"
                value={domainForm.portfolioURL}
                onChange={handleChange}
                placeholder="https://"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Resume Upload */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Resume / Certificates
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="resume"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
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