// sidebar.jsx

import React from "react";
import styled from "styled-components";
import logo from "../assets/react.svg";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { MdLogout, MdOutlineNotifications, MdOutlinePerson } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Light } from "../styles/Themes";

const linksArray = [
  { icon: <AiOutlineHome />, to: "/", id: "home" },
  { icon: <MdOutlineNotifications />, to: "/Notifications", id: "notifications" },
  { icon: <MdOutlinePerson />, to: "/Profile", id: "Profile" },
  { icon: <RiChat3Line />, to: "/ChatAppScreen", id: "Chat" },
];

const secondarylinksArray = [
  { icon: <AiOutlineSetting />, to: "/ConfigProfile", id: "ConfigProfile" },
  { icon: <MdLogout />, to: "/null", id: "logout" },
];

export function Sidebar() {
  return (
    <Container>
      <div className="Logocontent">
        <div className="imgcontent">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      {linksArray.map(({ icon, to, id }) => (
        <div className={`LinkContainer ${id}`} key={to}>
          <NavLink to={to} className="Links">
            <div className="Linkicon">{icon}</div>
          </NavLink>
        </div>
      ))}
      <div className="Filler" />
      {secondarylinksArray.map(({ icon, to, id }) => (
        <div className={`LinkContainer ${id}`} key={to}>
          <NavLink to={to} className="Links">
            <div className="Linkicon">{icon}</div>
          </NavLink>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${Light.body}; // Usando el color de fondo del tema
  position: sticky;
  padding-top: 20px;
  width: 72px;
  transition: width 0.3s ease;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  overflow: hidden;
  
  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }
  .LinkContainer {
    margin: 8px 0;
    padding: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${Light.text};
      height: 50px;
      .Linkicon {
        padding: 8px;
        display: flex;
        svg {
          font-size: 25px;
        }
      }
    }
  }
  
  .Filler {
    flex-grow: 1;
  }
`;
