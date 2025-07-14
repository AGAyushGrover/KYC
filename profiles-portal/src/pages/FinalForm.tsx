import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../component/Layout'
import CommonDetails from '../component/CommonDetails'

export default function FinalForm() {
  const [commonForm, setCommonForm] = useState<any>(null)
  const [profileForm, setProfileForm] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const commonData = localStorage.getItem('commonForm')
    const profileData = localStorage.getItem('profileForm')
    if (commonData) setCommonForm(JSON.parse(commonData))
    if (profileData) setProfileForm(JSON.parse(profileData))
  }, [])

  const handleSubmit = () => {
    alert('✅ Details submitted successfully!')
    router.push('/')
  }

  const handleEdit = () => {
  if (profileForm?.categoryName === 'Student') {
    router.push('/profile/student')
  } else if (profileForm?.categoryName === 'Researcher') {
    router.push('/profile/researcher')
  } else if (profileForm?.categoryName === 'Founder') {
    router.push('/profile/founder')
  } else if (profileForm?.categoryName === 'Technical Expert') {
    router.push('/profile/technical-expert')
  } else if (profileForm?.categoryName === 'Financial Professional') {
    router.push('/profile/financial-professional')
  } else if (profileForm?.categoryName === 'Domain Expert') {
    router.push('/profile/domain-expert')
  } else if (profileForm?.categoryName === 'Marketing and Sales') {
    router.push('/profile/marketing-sales')
  } else if (profileForm?.categoryName === 'Legal Professional') {
    router.push('/profile/legal-professional')
  } else if (profileForm?.categoryName === 'Influencer') {
    router.push('/profile/influencer')
  } else if (profileForm?.categoryName === 'Investor') {
    router.push('/profile/investor')
  } else if (profileForm?.categoryName === 'Mentor') {
    router.push('/profile/mentor')
  } else if (profileForm?.categoryName === 'Gig Worker') {
    router.push('/profile/gig-worker')
  } else if (profileForm?.categoryName === 'Community Leader') {
    router.push('/profile/community-leader')
  } else if (profileForm?.categoryName === 'Incubator') {
    router.push('/profile/incubator')
  } else if (profileForm?.categoryName === 'Government Authority') {
    router.push('/profile/government-authority')
  } else {
    router.push('/')
  }
}

  const formatKey = (key: string) => {
    const withSpaces = key.replace(/([A-Z])/g, ' $1').trim()
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
  }

  if (!commonForm || !profileForm) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl text-gray-600">Loading details...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
     <div
    className="min-h-screen flex justify-center items-center bg-cover bg-center  bg-gradient-to-b from-white to-blue-50"
  >
    <div className="bg-gradient-to-b from-blue-2 to-blue-200 shadow-lg rounded-2xl p-8 w-full max-w-4xl backdrop-blur-md">
          <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
            Review & Confirm Your Details
          </h1>
        
          <CommonDetails commonForm={commonForm} />

          <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-4">
            {profileForm.categoryName} Details
          </h2>

          <div className="space-y-2">
            {Object.entries(profileForm).map(([key, value]: [string, any]) => {
              if (key === 'categoryName') return null

              const label = formatKey(key)

              if (
                typeof value === 'string' &&
                value.startsWith('blob:') &&
                (
                  key.toLowerCase().includes('photo') ||
                  key.toLowerCase().includes('certificate') ||
                  key.toLowerCase().includes('image')
                )
              ) {
                return (
                  <div key={key}>
                    <strong>{label}:</strong>
                    <div className="mt-2">
                      <img
                        src={value}
                        alt={label}
                        className="h-48 w-auto rounded-md border shadow"
                      />
                    </div>
                  </div>
                )
              }

              return (
                <p key={key}>
                  <strong>{label}:</strong> {String(value)}
                </p>
              )
            })}
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={handleEdit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded"
            >
              ✏️ Edit Details
            </button>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}