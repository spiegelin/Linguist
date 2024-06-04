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
  { icon: <AiOutlineHome size={24} />, to: "/Home", id: "home" },
  { icon: <MdOutlineNotifications size={24} />, to: "/Notifications", id: "notifications" },
  { icon: <MdOutlinePerson size={24} />, to: "/Profile", id: "profile" },
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
  { icon: <MdLogout onClick={handleLogout} size={24} />, to:"/login", id: "logout" },
];

export function Sidebar() {
  const { profileImage } = useContext(ProfileContext); // Obtiene la imagen del contexto

  return (
    <Container>
      <div className="Logocontent">
        {profileImage ? (
          <ProfileImage src={profileImage} alt="Profile" />
        ) : (
          <StyledUserIcon size={32} />
        )}
      </div>
      <div className="LinksContainer">
        {linksArray.map(({ icon, to }) => (
          <NavLink to={to} className="Link" key={to}>
            {icon}
          </NavLink>
        ))}
      </div>
      <div className="SecondaryLinksContainer"> {/* Nuevo contenedor */}
        {secondarylinksArray.map(({ icon, to }) => (
          <NavLink to={to} className="Link" key={to}>
            {icon}
          </NavLink>
        ))}
      </div>
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

  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }

  .LinksContainer {
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
  }

  .SecondaryLinksContainer { /* Estilos para el nuevo contenedor */
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
  }
`;

// Aplica color verde al ícono de usuario
const StyledUserIcon = styled(FaRegUserCircle)`
  color: #2F5B20;
`;

const ProfileImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export default Sidebar;
