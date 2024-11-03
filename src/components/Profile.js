// src/components/Profile.js
import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, useUser, useAuth } from '@clerk/clerk-react';
import './Profile.css'; // Import the external CSS file

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleLogout = () => {
    console.log('Logging out...');
    signOut();
    <navigate to="/unirides" />; 
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    const countryCode = phoneNumber.slice(phoneNumber.indexOf(' ') + 1, phoneNumber.indexOf(' ') + 3  );
    const areaCode = phoneNumber.slice(phoneNumber.indexOf(' ') + 3, phoneNumber.indexOf(' ') + 6);
    const restNumber = phoneNumber.slice(phoneNumber.indexOf(' ') + 6);
    const firstPart = restNumber.slice(0, 3);
    const secondPart = restNumber.slice(3);
    return `${countryCode} (${areaCode}) ${firstPart} ${secondPart}`;
  };

  return (
    <>
      <SignedIn>
        <div className="profile">
          <div className="profile-header" id="profile-header">
            <i className="fas fa-user-circle profile-picture" aria-hidden="true"></i>
          </div>
          <div className="profile-details" id="profile-details">
            <div className="profile-info">
              <h2>{"Name: " + user?.fullName}</h2>
              <h2>{"Email ID: " + user?.primaryEmailAddress?.emailAddress}</h2>
              <p className="profile-phone">{formatPhoneNumber(user?.primaryPhoneNumber?.phoneNumber)}</p>
            </div>
            <div className="profile-details-buttons">
              <button type="button" className="btn btn-primary" id="my-groups">My Groups</button>
              <button type="button" className="btn btn-primary" id="edit-profile-btn">Edit Profile</button>
              <button type="button" className="btn btn-primary" id="logout-btn" onClick={handleLogout}>Logout</button>            </div>
            <i className="ri-close-line profile__close" id="profile-close"></i>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Profile;