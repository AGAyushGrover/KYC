import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import CommonDetails from '../../component/CommonDetails'
import { useRouter } from 'next/navigation'

export default function GovernmentAuthorityProfile() {
  const router = useRouter()
  const [commonForm, setCommonForm] = useState<any>({})
  const [govForm, setGovForm] = useState({
    departmentName: '',
    designation: '',
    governmentID: '',
    officeAddress: '',
    contactDetails: '',
    authorizationLetter: '',
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
    setGovForm({ ...govForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setGovForm({ ...govForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Common:', commonForm)
    console.log('Government Authority:', govForm)
   router.push('/FinalForm')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Government Authority Profile Details
      </h1>

      {/* ✅ Government Authority-specific Form */}
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg5.png')" }}>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-8 w-full max-w-3xl border border-gray-200"
        >

            <CommonDetails commonForm={commonForm} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department / Authority Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Department / Authority Name
              </label>
              <input
                name="departmentName"
                value={govForm.departmentName}
                onChange={handleChange}
                placeholder="Department / Authority Name"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Designation / Role */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Designation / Role
              </label>
              <input
                name="designation"
                value={govForm.designation}
                onChange={handleChange}
                placeholder="Designation / Role"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Official Government ID / Employee ID */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Official Government ID / Employee ID
              </label>
              <input
                name="governmentID"
                value={govForm.governmentID}
                onChange={handleChange}
                placeholder="Gov ID / Employee ID"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Office Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Office Address
              </label>
              <textarea
                name="officeAddress"
                value={govForm.officeAddress}
                onChange={handleChange}
                placeholder="Full Office Address"
                rows={2}
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Contact Details */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact Details
              </label>
              <input
                name="contactDetails"
                value={govForm.contactDetails}
                onChange={handleChange}
                placeholder="Official Contact Number / Email"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Authorization Letter */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Official Authorization Letter / Gov. ID
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="authorizationLetter"
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