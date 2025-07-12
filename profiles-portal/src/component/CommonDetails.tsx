// components/CommonDetails.tsx

export default function CommonDetails({ commonForm }: { commonForm: any }) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-start">
      <div className="md:w-2/3">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Common Details
        </h2>
        <div className="space-y-1">
          <p><strong>Full Name:</strong> {commonForm.fullName}</p>
          <p><strong>Age:</strong> {commonForm.age}</p>
          <p><strong>Email:</strong> {commonForm.email}</p>
          <p><strong>Phone:</strong> {commonForm.phone}</p>
          <p><strong>Educational Background:</strong> {commonForm.education}</p>

          <p className="mt-4 font-semibold text-blue-600">Permanent Address</p>
          <p><strong>City:</strong> {commonForm.addressCity}</p>
          <p><strong>State:</strong> {commonForm.addressState}</p>
          <p><strong>Country:</strong> {commonForm.addressCountry}</p>

          <p className="mt-4 font-semibold text-blue-600">Current Address</p>
          <p><strong>City:</strong> {commonForm.currentCity}</p>
          <p><strong>State:</strong> {commonForm.currentState}</p>
          <p><strong>Country:</strong> {commonForm.currentCountry}</p>

          <p className="mt-4"><strong>About:</strong> {commonForm.about}</p>
          <p className="mt-4"><strong>Interests:</strong> {commonForm.interests}</p>
        </div>
      </div>

      {commonForm.profilePhoto && (
        <div className="md:w-1/3 mt-4 md:mt-0 md:ml-8 flex justify-center">
          <img
            src={commonForm.profilePhoto}
            alt="Profile"
            className="h-48 w-48 object-cover rounded-full shadow"
          />
        </div>
      )}
    </div>
  )
}