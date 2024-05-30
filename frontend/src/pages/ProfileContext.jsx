// ProfileContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const ProfileContext = createContext(); // Cambiado el nombre de la constante

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState("");

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
