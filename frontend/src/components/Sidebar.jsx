// Sidebar.jsx
import React from "react";
import styled from "styled-components";
import logo from "../assets/react.svg";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { MdLogout, MdOutlineNotifications, MdOutlinePerson } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Light } from "../styles/Themes";

const linksArray = [
  { icon: <AiOutlineHome size={24} />, to: "/", id: "home" },
  { icon: <MdOutlineNotifications size={24} />, to: "/Notifications", id: "notifications" },
  { icon: <MdOutlinePerson size={24} />, to: "/Profile", id: "profile" },
  { icon: <RiChat3Line size={24} />, to: "/ChatAppScreen", id: "chat" },
];

const secondarylinksArray = [
  { icon: <AiOutlineSetting size={24} />, to: "/ConfigProfile", id: "config" },
  { icon: <MdLogout size={24} />, to: "/null", id: "logout" },
];

export function Sidebar() {
  return (
    <Container>
      <div className="Logocontent">
        <img src={logo} alt="Logo" />
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
