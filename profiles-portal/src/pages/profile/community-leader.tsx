import { useState } from 'react'
import Layout from '../../component/Layout'
import { useRouter } from 'next/navigation'


export default function CommunityLeaderProfile() {
  const router = useRouter()
  const [communityForm, setCommunityForm] = useState({
    categoryName: 'Community Leader',
    communityName: '',
    role: '',
    communityType: '',
    about: '',
    communitySize: '',
    contributions: '',
    primaryPlatform: '',
    registrationCertificate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommunityForm({ ...communityForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setCommunityForm({ ...communityForm, [e.target.name]: fileURL })
    }
  }

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  localStorage.setItem('profileForm', JSON.stringify(communityForm))
  router.push('/FinalForm')
}

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center ">
        Community Leader Profile Details
      </h1>
      <div className="min-h-screen bg-center bg-gradient-to-b from-white to-blue-50" >
      {/* ✅ Community Leader-specific Form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Community Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Community Name
              </label>
              <input
                name="communityName"
                value={communityForm.communityName}
                onChange={handleChange}
                placeholder="Community Name"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role (Founder, Moderator, etc.)
              </label>
              <input
                name="role"
                value={communityForm.role}
                onChange={handleChange}
                placeholder="Role"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type of Community / Domain */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Type of Community / Domain
              </label>
              <input
                name="communityType"
                value={communityForm.communityType}
                onChange={handleChange}
                placeholder="Domain"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                About
              </label>
              <textarea
                name="about"
                value={communityForm.about}
                onChange={handleChange}
                placeholder="Describe the community"
                rows={3}
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Community Size */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Community Size
              </label>
              <input
                name="communitySize"
                value={communityForm.communitySize}
                onChange={handleChange}
                placeholder="Number of members"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Works / Contributions */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Works / Contributions
              </label>
              <textarea
                name="contributions"
                value={communityForm.contributions}
                onChange={handleChange}
                placeholder="Describe major works or contributions"
                rows={3}
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Primary Platform */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Primary Platform (Discord, Slack, WhatsApp, local chapter)
              </label>
              <input
                name="primaryPlatform"
                value={communityForm.primaryPlatform}
                onChange={handleChange}
                placeholder="Discord, Slack, WhatsApp..."
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Registration Certificate */}
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