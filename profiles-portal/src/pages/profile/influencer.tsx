import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import CommonDetails from '../../component/CommonDetails'
import { useRouter } from 'next/navigation'

export default function InfluencerProfile() {
  const router = useRouter()
  const [commonForm, setCommonForm] = useState<any>({})
  const [influencerForm, setInfluencerForm] = useState({
    socialMediaHandles: '',
    primaryPlatform: '',
    numberOfFollowers: '',
    areaOfInfluence: '',
    pastExperience: '',
    audienceInsights: '',
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
    setInfluencerForm({ ...influencerForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setInfluencerForm({ ...influencerForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Common:', commonForm)
    console.log('Influencer:', influencerForm)
    router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Influencer Profile Details
      </h1>

      <div className="min-h-screen bg-cover bg-center  bg-gradient-to-b from-white to-blue-50">
          <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
            >
                
            {/* ✅ Common details */}
            <CommonDetails commonForm={commonForm} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Social Media Handles */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Social Media Handles (Instagram, YouTube, X, etc.)
              </label>
              <input
                name="socialMediaHandles"
                value={influencerForm.socialMediaHandles}
                onChange={handleChange}
                placeholder="@yourhandle"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Primary Platform */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Primary Platform
              </label>
              <input
                name="primaryPlatform"
                value={influencerForm.primaryPlatform}
                onChange={handleChange}
                placeholder="Instagram, YouTube, etc."
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Number of Followers */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Number of Followers (approx.)
              </label>
              <input
                name="numberOfFollowers"
                type="number"
                value={influencerForm.numberOfFollowers}
                onChange={handleChange}
                placeholder="e.g., 50000"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Area of Influence */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Area of Influence (Lifestyle, EdTech, Finance, etc.)
              </label>
              <input
                name="areaOfInfluence"
                value={influencerForm.areaOfInfluence}
                onChange={handleChange}
                placeholder="Lifestyle, EdTech, Finance, etc."
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Past Experience */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Past Experience / Collaboration
              </label>
              <textarea
                name="pastExperience"
                value={influencerForm.pastExperience}
                onChange={handleChange}
                placeholder="Brands you worked with, campaigns, etc."
                rows={3}
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Audience Insights */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Audience Insights or Screenshot of Stats
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="audienceInsights"
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