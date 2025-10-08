import { useState } from 'react'
import Layout from '../../component/Layout'
import { useRouter } from 'next/navigation'

export default function ResearcherProfile() {
  const router = useRouter()
  const [researcherForm, setResearcherForm] = useState({
    institution: '',
    fieldOfResearch: '',
    designation: '',
    researchID: '',
    proof: '',
    achievements: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResearcherForm({ ...researcherForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setResearcherForm({ ...researcherForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Researcher:', researcherForm)
    router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Researcher Profile Details
      </h1>

      <div className="min-h-screen bg-cover bg-center  bg-gradient-to-b from-white to-blue-50">
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
            >

          {/* --- Researcher-specific fields --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Institution */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Institution / Research Organization
              </label>
              <input
                name="institution"
                value={researcherForm.institution}
                onChange={handleChange}
                placeholder="Institution"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Field of Research */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Field of Research / Specialization
              </label>
              <input
                name="fieldOfResearch"
                value={researcherForm.fieldOfResearch}
                onChange={handleChange}
                placeholder="Field of Research"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Designation
              </label>
              <input
                name="designation"
                value={researcherForm.designation}
                onChange={handleChange}
                placeholder="e.g., Research Scholar, Postdoc"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Research ID */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Research ID (ORCID)
              </label>
              <input
                name="researchID"
                value={researcherForm.researchID}
                onChange={handleChange}
                placeholder="Research ID"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Proof */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Proof (Recent Publication, Certificate, ID Card)
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="proof"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            {/* Achievements */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Achievements
              </label>
              <textarea
                name="achievements"
                value={researcherForm.achievements}
                onChange={handleChange}
                placeholder="Achievements"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
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