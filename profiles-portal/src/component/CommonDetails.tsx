import Image from 'next/image';

// 1. Define a type for the commonForm prop
interface CommonFormDetails {
  fullName: string;
  dob: string;
  age: number | string;
  email: string;
  phone: string;
  education: string;
  residence: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  currentResidence: string;
  currentCity: string;
  currentState: string;
  currentCountry: string;
  about: string;
  interests: string;
  selectedIds: string[];
  idDetails: { [key: string]: string }; // Or Record<string, string>
  profilePhoto?: string; // Optional because it's checked before use
}

// Use the new type instead of 'any'
export default function CommonDetails({ commonForm }: { commonForm: CommonFormDetails }) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-start">
      <div className="md:w-2/3">
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">
          Common Details
        </h2>
        <div className="space-y-1 text-lg">
          {/* ... (rest of your component's JSX is fine) ... */}
          <p><strong>Full Name:</strong> {commonForm.fullName}</p>
          <p><strong>Date of Birth:</strong> {commonForm.dob}</p>
          <p><strong>Age:</strong> {commonForm.age}</p>
          <p><strong>Email:</strong> {commonForm.email}</p>
          <p><strong>Phone:</strong> {commonForm.phone}</p>
          <p><strong>Educational Background:</strong> {commonForm.education}</p>

          <p className="mt-4 font-semibold text-blue-600">Permanent Address</p>
          <p><strong>Residence:</strong> {commonForm.residence}</p>
          <p><strong>City:</strong> {commonForm.addressCity}</p>
          <p><strong>State:</strong> {commonForm.addressState}</p>
          <p><strong>Country:</strong> {commonForm.addressCountry}</p>

          <p className="mt-4 font-semibold text-blue-600">Current Address</p>
          <p><strong>Residence:</strong> {commonForm.currentResidence}</p>
          <p><strong>City:</strong> {commonForm.currentCity}</p>
          <p><strong>State:</strong> {commonForm.currentState}</p>
          <p><strong>Country:</strong> {commonForm.currentCountry}</p>

          <p className="mt-4"><strong>About:</strong> {commonForm.about}</p>
          <p className="mt-4"><strong>Interests:</strong> {commonForm.interests}</p>

          <p className="mt-4 font-semibold text-blue-600">ID Details</p>
          {commonForm.selectedIds && commonForm.selectedIds.length > 0 ? (
            <ul className="list-disc pl-5">
              {commonForm.selectedIds.map((idType: string) => (
                <li key={idType}>
                  <strong>{idType.charAt(0).toUpperCase() + idType.slice(1)}:</strong> {commonForm.idDetails[idType]}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No IDs selected.</p>
          )}
        </div>
      </div>

      {commonForm.profilePhoto && (
        <div className="md:w-1/3 mt-4 md:mt-0 md:ml-8 flex justify-center">
          {/* 2. Use the Next.js Image component */}
          <Image
            src={commonForm.profilePhoto}
            alt="Profile"
            width={192} // h-48 w-48 in Tailwind is 12rem = 192px
            height={192}
            className="object-cover rounded-full shadow"
          />
        </div>
      )}
    </div>
  )
}