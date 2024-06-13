// Sidebar.jsx
import React, { useContext } from "react";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { ProfileContext } from "../pages/ProfileContext"; // Importa el contexto correcto

import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { MdLogout, MdOutlineNotifications, MdOutlinePerson } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Light } from "../styles/Themes";

import axios from 'axios';

const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;

const linksArray = [
  //  { icon: <AiOutlineHome size={24} />, to: "/Home", id: "home" },
  { icon: <MdOutlinePerson size={24} />, to: "/Profile", id: "profile" },
  { icon: <MdOutlineNotifications size={24} />, to: "/Notifications", id: "notifications" },
  { icon: <RiChat3Line size={24} />, to: "/ChatAppScreen", id: "chat" },
];

const handleLogout = () => {
  try {
    axios.get(`${apiUrl}/logout`, { withCredentials: true });
  } catch (error) {
    console.error(error);
  }
};

const secondarylinksArray = [
  { icon: <AiOutlineSetting size={24} />, to: "/ConfigProfile", id: "config" },
  { icon: <MdLogout onClick={handleLogout} size={24} />, to:"/Landing", id: "logout" },
];

export function Sidebar() {
  const { profileImage } = useContext(ProfileContext); // Obtiene la imagen del contexto

  return (
    <Container>
      <Logocontent>
        {profileImage ? (
          <ProfileImage src={profileImage} alt="Profile" />
        ) : (
          <StyledUserIcon size={32} />
        )}
      </Logocontent>
      <LinksContainer>
        {linksArray.map(({ icon, to }) => (
          <NavLink to={to} className="Link" key={to}>
            {icon}
          </NavLink>
        ))}
      </LinksContainer>
      <SecondaryLinksContainer>
        {secondarylinksArray.map(({ icon, to }) => (
          <NavLink to={to} className="Link" key={to}>
            {icon}
          </NavLink>
        ))}
      </SecondaryLinksContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${Light.body};
  position: sticky;
  top: 0;
  height: 100vh;
  width: 72px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  overflow-y: auto;
`;

const Logocontent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-bottom: 20px;

  .Link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: ${Light.text};
    height: 50px;
    width: 100%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const SecondaryLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  .Link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: ${Light.text};
    height: 50px;
    width: 100%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const StyledUserIcon = styled(FaRegUserCircle)`
  color: #2F5B20;
`;

const ProfileImage = styled.img`
  width: 77px; /* Tamaño de la imagen */
  height: 77px; /* Tamaño de la imagen */
  border-radius: 50%; /* Para hacerla circular */
  object-fit: cover; /* Para que la imagen no se deforme */
`;

export default Sidebar;
