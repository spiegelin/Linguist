// ProfileContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;

export const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    // Cargar la imagen de perfil cuando se monta el contexto
    axios.get(`${apiUrl}/users/profile-image`, { withCredentials: true })
      .then(response => {
        const imageBase64 = response.data.imageBase64;
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        setProfileImage(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching profile image:', error);
      });
  }, []);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
