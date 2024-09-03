import React, { useState, useRef } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import Modal from "./Modal";

interface Profile {
  fullName: string;
  title: string;
  slogan: string;
  email: string;
  birthday: string;
  country: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
}

interface EditProfileFormProps {
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  profile,
  onSave,
}) => {
  const [tempProfile, setTempProfile] = useState(profile);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modalOpen, setModalOpen] = useState<{
    type: "terms" | "success" | null;
  }>({ type: null });

  const refs = {
    fullName: useRef<HTMLInputElement>(null),
    title: useRef<HTMLInputElement>(null),
    slogan: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    birthday: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
    state: useRef<HTMLInputElement>(null),
    postalCode: useRef<HTMLInputElement>(null),
    phoneNumber: useRef<HTMLInputElement>(null),
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(refs).forEach((key) => {
      const value = refs[key as keyof typeof refs].current?.value.trim();
      if (!value) {
        newErrors[key] = "This field is required.";
      }
    });

    if (tempProfile.email && !tempProfile.email.includes("@")) {
      newErrors.email = "Invalid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateInputs()) {
      if (!termsAgreed) {
        setModalOpen({ type: "terms" });
        return;
      }
      onSave(tempProfile);
      setModalOpen({ type: "success" });
    }

    setTermsAgreed(false);
  };

  const handleCloseModal = () => {
    setModalOpen({ type: null });
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50">
      <h3 className="mb-4 text-xl font-bold text-gray-800">Update Profile</h3>
      <form>
        {Object.keys(refs).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={key === "birthday" ? "date" : "text"}
              name={key}
              value={tempProfile[key as keyof Profile]}
              onChange={handleProfileChange}
              ref={refs[key as keyof typeof refs]}
              className={`w-full px-3 py-2 border rounded ${
                errors[key] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[key] && (
              <p className="text-sm text-red-500">{errors[key]}</p>
            )}
          </div>
        ))}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            checked={termsAgreed}
            onChange={() => setTermsAgreed(!termsAgreed)}
            className="hidden"
          />
          <label htmlFor="terms" className="flex items-center text-gray-700">
            {termsAgreed ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaRegCircle className="text-gray-500" />
            )}
            <span className="ml-2">I agree to the terms and conditions</span>
          </label>
        </div>
        <button
          type="button"
          className="w-full px-4 py-2 text-white transition bg-gray-600 rounded hover:bg-gray-700"
          onClick={handleSave}
        >
          Save
        </button>
      </form>

      <Modal
        isOpen={modalOpen.type === "terms"}
        onClose={handleCloseModal}
        title="Terms Agreement"
        message="You must agree to the terms and conditions before saving."
      />
      <Modal
        isOpen={modalOpen.type === "success"}
        onClose={handleCloseModal}
        title="Update Successful"
        message="Your profile has been updated successfully."
      />
    </div>
  );
};

export default EditProfileForm;
