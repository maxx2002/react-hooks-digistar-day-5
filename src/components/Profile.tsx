import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import EditProfileForm from "./EditProfileForm";
import EditLinksForm from "./EditLinksForm";

const Profile: React.FC = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isEditLinksOpen, setIsEditLinksOpen] = useState<boolean>(false);

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    title: "Software Engineer",
    slogan: "Code with Passion",
    email: "john.doe@example.com",
    birthday: "1990-01-01",
    country: "United States",
    state: "California",
    postalCode: "12345",
    phoneNumber: "+1 234 567 8901",
  });

  const [links, setLinks] = useState({
    facebook: "",
    twitter: "",
    blogger: "",
    google: "",
    linkedin: "",
    website: "",
  });

  const toggleEditProfile = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
  };

  const toggleEditLinks = () => {
    setIsEditLinksOpen(!isEditLinksOpen);
  };

  const handleSaveProfile = (updatedProfile: typeof profile) => {
    setProfile(updatedProfile);
  };

  const handleSaveLinks = (updatedLinks: typeof links) => {
    setLinks(updatedLinks);
  };

  return (
    <div className="p-8 bg-white rounded-xl">
      <div className="grid grid-cols-3 gap-6">
        <ProfileInfo
          profile={profile}
          links={links}
          onEditProfile={toggleEditProfile}
          onEditLinks={toggleEditLinks}
        />
        {isEditProfileOpen && (
          <EditProfileForm profile={profile} onSave={handleSaveProfile} />
        )}
        {isEditLinksOpen && (
          <EditLinksForm links={links} onSave={handleSaveLinks} />
        )}
      </div>
    </div>
  );
};

export default Profile;
