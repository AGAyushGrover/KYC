import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../component/Layout'

export default function CategorySelection() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    { label: 'Student', slug: 'student', icon: '/icons/student.png' },
    { label: 'Researcher', slug: 'researcher', icon: '/icons/researcher.png' },
    { label: 'Founder', slug: 'founder', icon: '/icons/founder.png' },
    { label: 'Technical Expert', slug: 'technical-expert', icon: '/icons/technical.png' },
    { label: 'Financial Professional', slug: 'financial-professional', icon: '/icons/finance.png' },
    { label: 'Domain Expert', slug: 'domain-expert', icon: '/icons/domain.png' },
    { label: 'Marketing and Sales', slug: 'marketing-sales', icon: '/icons/marketing.png' },
    { label: 'Legal Professional', slug: 'legal-professional', icon: '/icons/legal.png' },
    { label: 'Influencer', slug: 'influencer', icon: '/icons/influencer.png' },
    { label: 'Investor', slug: 'investor', icon: '/icons/investor.png' },
    { label: 'Mentor', slug: 'mentor', icon: '/icons/mentor.png' },
    { label: 'Gig Worker', slug: 'gig-worker', icon: '/icons/gig.png' },
    { label: 'Community Leader', slug: 'community-leader', icon: '/icons/community.png' },
    { label: 'Incubator', slug: 'incubator', icon: '/icons/incubator.png' },
    { label: 'Government Authority', slug: 'government-authority', icon: '/icons/government.png' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCategory) {
      localStorage.setItem('selectedCategory', selectedCategory)
      router.push(`/profile/${selectedCategory}`)
    }
  }

  return (
    <Layout>
      <div
    className="min-h-screen bg-cover bg-center flex justify-center items-center px-4"
    style={{ backgroundImage: "url('/bg5.png')" }}
  >
    {/* White content area */}
    <div className="bg-white/90 shadow-lg rounded-2xl w-full max-w-6xl p-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-10 text-center">
        Choose Your Category
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex flex-col items-center cursor-pointer transition duration-200 ${
                selectedCategory === cat.slug ? 'scale-105' : ''
              }`}
            >
              <div
                className={`flex items-center justify-center w-28 h-28 rounded-full border-4 bg-white overflow-hidden ${
                  selectedCategory === cat.slug
                    ? 'border-blue-500'
                    : 'border-gray-300'
                }`}
              >
                <Image
                  src={cat.icon}
                  alt={cat.label}
                  width={80}
                  height={80}
                  className="object-contain w-20 h-20"
                />
              </div>
              <div className="h-1 w-1 bg-blue-500 rounded-full my-2"></div>
              <p className="text-center text-xs md:text-sm font-semibold">
                {cat.label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded disabled:opacity-50"
          disabled={!selectedCategory}
        >
          CONTINUE
        </button>

        <p className="text-xs text-center mt-4">
          YOU AGREE TO OUR{' '}
          <a href="#" className="underline text-blue-600">
            PRIVACY POLICY
          </a>{' '}
          &{' '}
          <a href="#" className="underline text-blue-600">
            TERMS & CONDITIONS
          </a>
        </p>
      </form>
      </div>
      </div>
    </Layout>
  )
}