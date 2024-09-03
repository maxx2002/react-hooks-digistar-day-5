import {
  FaFacebook,
  FaTwitter,
  FaBlogger,
  FaGoogle,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

interface ProfileInfoProps {
  profile: {
    fullName: string;
    title: string;
    slogan: string;
    email: string;
    birthday: string;
    country: string;
    state: string;
    postalCode: string;
    phoneNumber: string;
  };
  links: {
    facebook: string;
    twitter: string;
    blogger: string;
    google: string;
    linkedin: string;
    website: string;
  };
  onEditProfile: () => void;
  onEditLinks: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  links,
  onEditProfile,
  onEditLinks,
}) => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50">
      <img
        src="/images/john-doe.jpg"
        alt="Profile"
        className="w-32 h-32 mx-auto mb-4 rounded-full"
      />
      <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">
        {profile.fullName}
      </h2>
      <p className="mb-2 text-center text-gray-600">{profile.title}</p>
      <p className="mb-4 italic text-center text-gray-500">
        "{profile.slogan}"
      </p>

      <div className="flex my-6">
        <div className="flex flex-col items-center justify-center flex-1 px-4 border-r border-gray-300">
          <h3 className="text-2xl font-bold text-black">86</h3>
          <p className="text-gray-600">Posts</p>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 px-4 border-r border-gray-300">
          <h3 className="text-2xl font-bold text-black">1,1k</h3>
          <p className="text-gray-600">Messages</p>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <h3 className="text-2xl font-bold text-black">4,5k</h3>
          <p className="text-gray-600">Members</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center text-gray-800">
          <FaEnvelope className="mr-2 text-gray-600" size={20} />
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
        </div>
        <div className="flex items-center text-gray-800">
          <FaBirthdayCake className="mr-2 text-gray-600" size={20} />
          <p>
            <strong>Birthday:</strong> {profile.birthday}
          </p>
        </div>
        <div className="flex items-center text-gray-800">
          <FaGlobe className="mr-2 text-gray-600" size={20} />
          <p>
            <strong>Country:</strong> {profile.country}
          </p>
        </div>
        <div className="flex items-center text-gray-800">
          <FaMapMarkerAlt className="mr-2 text-gray-600" size={20} />
          <p>
            <strong>State:</strong> {profile.state}
          </p>
        </div>
        <div className="flex items-center text-gray-800">
          <MdAlternateEmail className="mr-2 text-gray-600" size={20} />
          <p>
            <strong>Postal Code:</strong> {profile.postalCode}
          </p>
        </div>
        <div className="flex items-center text-gray-800">
          <FaPhoneAlt className="mr-2 text-gray-600" size={20} />
          <p>
            <strong>Phone Number:</strong> {profile.phoneNumber}
          </p>
        </div>
      </div>

      <div className="flex justify-center my-8 space-x-4">
        {links.facebook && (
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 transition hover:text-blue-800"
          >
            <FaFacebook size={28} />
          </a>
        )}
        {links.twitter && (
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 transition hover:text-blue-600"
          >
            <FaTwitter size={28} />
          </a>
        )}
        {links.blogger && (
          <a
            href={links.blogger}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 transition hover:text-orange-800"
          >
            <FaBlogger size={28} />
          </a>
        )}
        {links.google && (
          <a
            href={links.google}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 transition hover:text-red-800"
          >
            <FaGoogle size={28} />
          </a>
        )}
        {links.linkedin && (
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 transition hover:text-blue-900"
          >
            <FaLinkedin size={28} />
          </a>
        )}
        {links.website && (
          <a
            href={links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 transition hover:text-green-800"
          >
            <FaGlobe size={28} />
          </a>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onEditProfile}
          className="w-full px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
        >
          Edit Profile
        </button>
        <button
          onClick={onEditLinks}
          className="w-full px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
        >
          Edit Links
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
