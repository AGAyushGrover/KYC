import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import CommonDetails from '../../component/CommonDetails'
import { useRouter } from 'next/navigation'

export default function MentorProfile() {
  const router = useRouter()
  const [commonForm, setCommonForm] = useState<any>({})
  const [mentorForm, setMentorForm] = useState({
    mentorshipAreas: '',
    yearsOfExperience: '',
    pastMentorshipExperience: '',
    resume: '',
    educationCertificate: '',
    testimonials: '',
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
    setMentorForm({ ...mentorForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setMentorForm({ ...mentorForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Common:', commonForm)
    console.log('Mentor:', mentorForm)
    router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Mentor Profile Details
      </h1>

      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg5.png')" }}>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
            >
          {/* ✅ Common details */}
          <CommonDetails commonForm={commonForm} />

          {/* ✅ Mentor-specific fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Areas of Mentorship (e.g., Fundraising, GTM, Scaling)
              </label>
              <input
                name="mentorshipAreas"
                value={mentorForm.mentorshipAreas}
                onChange={handleChange}
                placeholder="Areas of Mentorship"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Years of Experience
              </label>
              <input
                name="yearsOfExperience"
                value={mentorForm.yearsOfExperience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Past Mentorship Experience (programs, incubators)
              </label>
              <textarea
                name="pastMentorshipExperience"
                value={mentorForm.pastMentorshipExperience}
                onChange={handleChange}
                placeholder="Describe past mentorship experience"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* Upload Resume */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Resume or Profile Summary
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

            {/* Upload Highest Education Certificate */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Highest Education Certificate / Past Experiences Certificate
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="educationCertificate"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            {/* Testimonials */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Testimonials / References
              </label>
              <textarea
                name="testimonials"
                value={mentorForm.testimonials}
                onChange={handleChange}
                placeholder="Provide any testimonials or references"
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
