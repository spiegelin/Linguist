//Profile.jsx
import React, { useState, useContext } from "react";
import styled from "styled-components";
import MainLayout from '../components/MainLayout';
import { FaUserCircle } from "react-icons/fa"; // Importa el ícono FaUserCircle
import { ProfileContext } from "./ProfileContext"; // Importa el contexto correcto
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { profileImage } = useContext(ProfileContext); // Obtén la imagen de perfil del contexto
  const [firstName, setFirstName] = useState("Marcela");
  const [lastName, setLastName] = useState("De la Rosa");
  const [firstLanguage, setFirstLanguage] = useState("English");
  const [secondLanguage, setSecondLanguage] = useState("Spanish");
  const [thirdLanguage, setThirdLanguage] = useState("French");
  const navigate = useNavigate();
  const toLanguagePage = () => {
    navigate("/Lenguaje_Page");
  };
  const toNotifPage = () => {
    navigate("/Notifications");
  };

  return (
    <MainLayout>
      <Container className="fondo">
        <div>
          <button id="notif" onClick={toNotifPage}>
            <svg width="35" height="35" viewBox="0 0 49 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.5197 51.7124C27.7757 51.7124 30.4396 49.3328 30.4396 46.4245H18.5997C18.5997 49.3328 21.2637 51.7124 24.5197 51.7124ZM42.2795 35.8489V22.6293C42.2795 14.5125 37.4548 7.7176 28.9597 5.91974V4.12188C28.9597 1.92743 26.9765 0.156006 24.5197 0.156006C22.0629 0.156006 20.0797 1.92743 20.0797 4.12188V5.91974C11.6142 7.7176 6.75985 14.486 6.75985 22.6293V35.8489L0.839905 41.1367V43.7806H48.1995V41.1367L42.2795 35.8489ZM36.3596 38.4928H12.6798V22.6293C12.6798 16.0724 17.1494 10.7317 24.5197 10.7317C31.89 10.7317 36.3596 16.0724 36.3596 22.6293V38.4928Z" fill="#595355"/>
            </svg>
          </button>
          <div className="nami">
            <h1 className="profile">{firstName}{" "}{lastName}</h1>
            <div className="pic">
              {profileImage ? (
                <ProfileImage src={profileImage} alt="Profile" />
              ) : (
                <FaUserCircle size={120} color="#970E59" /> 
              )}
            </div>
            <h3 className="trelanguages">{firstLanguage}</h3>
            <h3 className="trelanguages">{secondLanguage}</h3>
            <h3 className="trelanguages">{thirdLanguage}</h3>
          </div>
          <div className="mylearning">
            <div className="left">
              <h2 className="learning">My Learning</h2>
            </div>
            <div className="right">
            <button className="iconit" onClick={toLanguagePage}>
  <svg width="300" height="500" viewBox="0 0 408 408" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M76.5 304.271H102V331.932H51V55.322H25.5V359.593H102V387.254H0V27.661H51V0H127.5C139.188 0 150.41 1.94492 161.168 5.83475C171.926 9.72458 181.953 15.5593 191.25 23.339C200.414 15.5593 210.375 9.72458 221.133 5.83475C231.891 1.94492 243.18 0 255 0H331.5V27.661H382.5V204.648L357 192.114V55.322H331.5V179.581L306 166.831V27.661H255C245.57 27.661 236.539 29.3898 227.906 32.8475C219.273 36.3051 211.305 41.4195 204 48.1907V179.581L178.5 192.114V48.1907C171.328 41.5636 163.426 36.5212 154.793 33.0636C146.16 29.6059 137.062 27.8051 127.5 27.661H76.5V304.271ZM357 359.377L267.75 408L178.5 359.377C178.5 354.191 178.566 348.716 178.699 342.953C178.832 337.191 179.363 331.356 180.293 325.449C181.223 319.542 182.551 313.996 184.277 308.809C186.004 303.623 188.395 298.797 191.449 294.331L153 275.314V401.085H127.5V262.78L267.75 193.627L408 262.78L344.051 294.331L345.645 296.708C348.434 301.174 350.559 306 352.02 311.186C353.48 316.373 354.609 321.631 355.406 326.962C356.203 332.292 356.668 337.767 356.801 343.386C356.934 349.004 357 354.335 357 359.377ZM267.75 223.881L189.059 262.78L267.75 301.678L346.441 262.78L267.75 223.881ZM267.75 377.097L331.5 342.305C331.367 338.559 331.102 335.174 330.703 332.148C330.305 329.123 329.574 326.169 328.512 323.288C327.449 320.407 326.387 317.597 325.324 314.86C324.262 312.123 322.734 309.097 320.742 305.784L267.75 331.932L214.758 305.784C212.766 309.242 211.172 312.339 209.977 315.076C208.781 317.814 207.719 320.551 206.789 323.288C205.859 326.025 205.262 328.907 204.996 331.932C204.73 334.958 204.465 338.487 204.199 342.521L267.75 377.097Z" fill="#7C1515"></path>
  </svg>
</button>
            </div>
          </div>
          <div className="loguit">
            <img src= "/logot.png" alt="logo" className="logo"/>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 20px; // Añadir algo de padding para la separación del contenido

  
`;

const ProfileImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export default Profile;