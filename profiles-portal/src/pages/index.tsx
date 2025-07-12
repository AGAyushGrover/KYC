import { useState } from 'react'
import Layout from '../component/Layout'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    profilePhoto: '',
    education: '',
    residence: '',
    addressCity: '',
    addressState: '',
    addressCountry: '',
    currentCity: '',
    currentState: '',
    currentCountry: '',
    about: '',
    interests: '',
  })

const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle photo file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const photoURL = URL.createObjectURL(file)
      setForm({ ...form, profilePhoto: photoURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  localStorage.setItem('commonForm', JSON.stringify(form))
  router.push('/category')
}

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Let us know about you!
      </h1>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Age
              </label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email ID
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Profile Photo Upload */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {form.profilePhoto && (
                <img
                  src={form.profilePhoto}
                  alt="Preview"
                  className="mt-4 h-32 w-32 object-cover rounded-full border"
                />
              )}
            </div>

            {/* Education */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Educational Background
              </label>
              <input
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="Enter education"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* --- Permanent Address Section --- */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Permanent Address
              </h2>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Residence
              </label>
              <input
                name="residence"
                value={form.residence}
                onChange={handleChange}
                placeholder="Residence"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                name="addressCity"
                value={form.addressCity}
                onChange={handleChange}
                placeholder="City"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input
                name="addressState"
                value={form.addressState}
                onChange={handleChange}
                placeholder="State"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country
              </label>
              <input
                name="addressCountry"
                value={form.addressCountry}
                onChange={handleChange}
                placeholder="Country"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* --- Current Address Section --- */}
            <div className="md:col-span-2 mt-4">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Current Address
              </h2>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                name="currentCity"
                value={form.currentCity}
                onChange={handleChange}
                placeholder="Current city"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input
                name="currentState"
                value={form.currentState}
                onChange={handleChange}
                placeholder="Current state"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country
              </label>
              <input
                name="currentCountry"
                value={form.currentCountry}
                onChange={handleChange}
                placeholder="Current country"
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
                value={form.about}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* Interests */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Interests
              </label>
              <input
                name="interests"
                value={form.interests}
                onChange={handleChange}
                placeholder="Your interests"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6"
          >
            Continue
          </button>
        </form>
      </div>
    </Layout>
  )
}