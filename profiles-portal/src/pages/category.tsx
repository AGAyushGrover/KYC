// // pages/category.tsx
// import { useState } from 'react'
// import { useRouter } from 'next/router'
// import Layout from '../component/Layout'

// export default function CategorySelection() {
//   const router = useRouter()
//   const [selectedCategory, setSelectedCategory] = useState('')

//   const categories = [
//     { label: 'Student', slug: 'student' },
//     { label: 'Mentor', slug: 'mentor' },
//     { label: 'Incubator', slug: 'incubator' },
//     { label: 'Researcher', slug: 'researcher' },
//     { label: 'Founder', slug: 'founder' },
//     { label: 'Investor', slug: 'investor' },
//     { label: 'Gig Worker', slug: 'gig-worker' },
//     { label: 'Influencer', slug: 'influencer' },
//     { label: 'Domain Expert', slug: 'domain-expert' },
//     { label: 'Technical Expert', slug: 'technical-expert' },
//     { label: 'Marketing and Sales', slug: 'marketing-sales' },
//     { label: 'Financial Professional', slug: 'financial-professional' },
//     { label: 'Legal Professional', slug: 'legal-professional' },
//     { label: 'Government Authority', slug: 'government-authority' },
//     { label: 'Community Leader', slug: 'community-leader' },
//   ]

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log('Selected Category:', selectedCategory)
//     if (selectedCategory) {
//       // Save to localStorage
//       localStorage.setItem('selectedCategory', selectedCategory)
//       router.push(`/profile/${selectedCategory}`)
//     }
//   }

//   return (
//     <Layout>
//       <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
//         Select Your Profile Category
//       </h1>

//       <div className="flex justify-center">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {categories.map((cat) => (
//               <label
//                 key={cat.slug}
//                 className={`border rounded p-4 cursor-pointer flex items-center ${
//                   selectedCategory === cat.slug
//                     ? 'border-blue-600 bg-blue-50'
//                     : 'border-gray-300'
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="category"
//                   value={cat.slug}
//                   checked={selectedCategory === cat.slug}
//                   onChange={() => setSelectedCategory(cat.slug)}
//                   className="mr-2"
//                 />
//                 {cat.label}
//               </label>
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6"
//             disabled={!selectedCategory}
//           >
//             Continue
//           </button>
//         </form>
//       </div>
//     </Layout>
//   )
// }
// import { useState } from 'react'
// import { useRouter } from 'next/router'
// import Image from 'next/image'
// import Layout from '../component/Layout'

// export default function CategorySelection() {
//   const router = useRouter()
//   const [selectedCategory, setSelectedCategory] = useState('')

//   const categories = [
//     { label: 'Student', slug: 'student', icon: '/icons/student.png' },
//     { label: 'Researcher', slug: 'researcher', icon: '/icons/researcher.png' },
//     { label: 'Founder', slug: 'founder', icon: '/icons/founder.png' },
//     { label: 'Technical Expert', slug: 'technical-expert', icon: '/icons/technical.png' },
//     { label: 'Financial Professional', slug: 'financial-professional', icon: '/icons/finance.png' },
//     { label: 'Domain Expert', slug: 'domain-expert', icon: '/icons/domain.png' },
//     { label: 'Marketing and Sales', slug: 'marketing-sales', icon: '/icons/marketing.png' },
//     { label: 'Legal Professional', slug: 'legal-professional', icon: '/icons/legal.png' },
//     { label: 'Influencer', slug: 'influencer', icon: '/icons/influencer.png' },
//     { label: 'Investor', slug: 'investor', icon: '/icons/investor.png' },
//     { label: 'Mentor', slug: 'mentor', icon: '/icons/mentor.png' },
//     { label: 'Gig Worker', slug: 'gig-worker', icon: '/icons/gig.png' },
//     { label: 'Community Leader', slug: 'community-leader', icon: '/icons/community.png' },
//     { label: 'Incubator', slug: 'incubator', icon: '/icons/incubator.png' },
//     { label: 'Government Authority', slug: 'government-authority', icon: '/icons/government.png' },
//   ]

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (selectedCategory) {
//       localStorage.setItem('selectedCategory', selectedCategory)
//       router.push(`/profile/${selectedCategory}`)
//     }
//   }

//   return (
//     <Layout>
//       <h1 className="text-3xl font-bold text-blue-600 mb-10 text-center">
//         Choose Your Category
//       </h1>

//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
//           {categories.map((cat) => (
//             <div
//               key={cat.slug}
//               onClick={() => setSelectedCategory(cat.slug)}
//               className={`flex flex-col items-center cursor-pointer transition duration-200 ${
//                 selectedCategory === cat.slug ? 'scale-105' : ''
//               }`}
//             >
//               <div
//                 className={`rounded-full p-4 border-4 ${
//                   selectedCategory === cat.slug
//                     ? 'border-blue-500'
//                     : 'border-gray-300'
//                 }`}
//               >
//                 <Image
//                   src={cat.icon}
//                   alt={cat.label}
//                   width={80}
//                   height={80}
//                   className="rounded-full"
//                 />
//               </div>
//               <div className="h-1 w-1 bg-blue-500 rounded-full my-2"></div>
//               <p className="text-center text-sm md:text-base font-medium">
//                 {cat.label.toUpperCase()}
//               </p>
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded disabled:opacity-50"
//           disabled={!selectedCategory}
//         >
//           CONTINUE
//         </button>

//         <p className="text-xs text-center mt-4">
//           YOU AGREE TO OUR{' '}
//           <a href="#" className="underline text-blue-600">
//             PRIVACY POLICY
//           </a>{' '}
//           &{' '}
//           <a href="#" className="underline text-blue-600">
//             TERMS & CONDITIONS
//           </a>
//         </p>
//       </form>
//     </Layout>
//   )
// }

// pages/category.tsx
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
    </Layout>
  )
}