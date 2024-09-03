import React, { useState } from "react";
import Modal from "./Modal"; // Make sure the Modal component is correctly imported

interface Links {
  facebook: string;
  twitter: string;
  blogger: string;
  google: string;
  linkedin: string;
  website: string;
}

interface EditLinksFormProps {
  links: Links;
  onSave: (updatedLinks: Links) => void;
}

const urlRegex =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/\S*)?$/;

const EditLinksForm: React.FC<EditLinksFormProps> = ({ links, onSave }) => {
  const [tempLinks, setTempLinks] = useState(links);
  const [errors, setErrors] = useState<{ [key in keyof Links]?: string }>({});
  const [modalOpen, setModalOpen] = useState<{
    type: "success" | "error" | null;
  }>({ type: null });

  const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempLinks({ ...tempLinks, [name as keyof Links]: value });
  };

  const validateLinks = () => {
    const newErrors: { [key in keyof Links]?: string } = {};
    (Object.keys(tempLinks) as Array<keyof Links>).forEach((key) => {
      const value = tempLinks[key];
      if (value && !urlRegex.test(value)) {
        newErrors[key] = "Invalid URL format";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateLinks()) {
      onSave(tempLinks);
      setModalOpen({ type: "success" });
    }
  };

  const handleCloseModal = () => {
    setModalOpen({ type: null });
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50">
      <h3 className="mb-4 text-xl font-bold text-gray-800">Update Links</h3>
      <form>
        {Object.keys(tempLinks).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-gray-700 capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={tempLinks[key as keyof Links]}
              onChange={handleLinksChange}
              className={`w-full px-3 py-2 border rounded ${
                errors[key as keyof Links]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors[key as keyof Links] && (
              <p className="text-sm text-red-500">
                {errors[key as keyof Links]}
              </p>
            )}
          </div>
        ))}
        <button
          type="button"
          className="w-full px-4 py-2 text-white transition bg-gray-600 rounded hover:bg-gray-700"
          onClick={handleSave}
        >
          Save
        </button>
      </form>

      <Modal
        isOpen={modalOpen.type === "success"}
        onClose={handleCloseModal}
        title="Update Successful"
        message="Your links have been updated successfully."
      />
    </div>
  );
};

export default EditLinksForm;
