import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import CommonDetails from '../../component/CommonDetails'
export default function StudentProfile() {
  const [commonForm, setCommonForm] = useState<any>({})
  const [studentForm, setStudentForm] = useState({
    institutionName: '',
    enrollmentNumber: '',
    courseName: '',
    studentEmail: '',
    specialisation: '',
    yearOfStudy: '',
    studentIDCard: '',
    achievements: '',
    resume: '',
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
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setStudentForm({ ...studentForm, [e.target.name]: fileURL })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Common:', commonForm)
    console.log('Student:', studentForm)
    // Save or send to backend later
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Student Profile Details
      </h1>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl"
        >
          {/* --- Show common details --- */}
          <CommonDetails commonForm={commonForm} />
  

          {/* --- Student-specific fields --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Institution Name
              </label>
              <input
                name="institutionName"
                value={studentForm.institutionName}
                onChange={handleChange}
                placeholder="Institution Name"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enrollment Number / Student ID
              </label>
              <input
                name="enrollmentNumber"
                value={studentForm.enrollmentNumber}
                onChange={handleChange}
                placeholder="Enrollment Number"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Course / Program Name
              </label>
              <input
                name="courseName"
                value={studentForm.courseName}
                onChange={handleChange}
                placeholder="Course Name"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email ID
              </label>
              <input
                name="studentEmail"
                type="email"
                value={studentForm.studentEmail}
                onChange={handleChange}
                placeholder="Student Email"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Specialisation
              </label>
              <input
                name="specialisation"
                value={studentForm.specialisation}
                onChange={handleChange}
                placeholder="Specialisation"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Year of Study / Graduation Year
              </label>
              <input
                name="yearOfStudy"
                value={studentForm.yearOfStudy}
                onChange={handleChange}
                placeholder="Year of Study"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Student ID or Bonafide */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Student ID Card or Bonafide Certificate
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                name="studentIDCard"
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
                value={studentForm.achievements}
                onChange={handleChange}
                placeholder="Achievements"
                className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* Resume Optional */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Resume (Optional)
              </label>
              <input
                type="file"
                accept="application/pdf"
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
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}