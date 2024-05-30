//ConfigProfile.jsx
import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { ProfileContext } from "../pages/ProfileContext"; // Importa el contexto
import MainLayout from '../components/MainLayout';
import "../styles/configProfile.css";

const languageOptions = () => (
  <>
    <option value="english">English</option>
    <option value="spanish">Spanish</option>
    <option value="french">French</option>
    <option value="german">German</option>
    <option value="portuguese">Portuguese</option>
    <option value="italian">Italian</option>
    <option value="chinese">Chinese</option>
    <option value="japanese">Japanese</option>
    <option value="korean">Korean</option>
    <option value="hindi">Hindi</option>
    <option value="russian">Russian</option>
    <option value="arabic">Arabic</option>
    <option value="swedish">Swedish</option>
    <option value="norwegian">Norwegian</option>
    <option value="hebrew">Hebrew</option>
    <option value="finnish">Finnish</option>
  </>
);

export function ConfigProfile() {
  const { setProfileImage } = useContext(ProfileContext); // Obtiene la función para actualizar la imagen del contexto
  const placeholder = '/public/placeholder.jpg';
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [currentView, setCurrentView] = useState("profile");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    // Actualiza el contexto con la imagen seleccionada
    setProfileImage(image);
  };

  const handleReset = () => {
    console.log("Form reset");
  };

  return (
    <MainLayout>
      <Container className="fondo">
        <div>
          <div className="column-left">
            <h1>Settings</h1>
            <ul>
              <li><button className="boton" onClick={() => setCurrentView("profile")}>Edit Profile</button></li>
              <li><button className="boton" onClick={() => setCurrentView("security")}>Security</button></li>
            </ul>
          </div>
          <div className="column-center"/>
          <div className="column-right">
            {currentView === "profile" ? (
              <div>
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <div className="divContiene">
                    <div className="user-img">
                      <img src={image || placeholder} alt="Profile" id="photo" onError={(e) => { e.target.src = placeholder; }}/>
                      <input type="file" id="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }}/>
                      <button type="button" onClick={() => fileInputRef.current.click()} id="uploadbtn"><i className="fa-solid fa-camera"></i></button>
                    </div>
                    <div className="namess">
                      <label htmlFor="firstName">First Name:</label>
                      <input type="text" id="firstName" name="firstName" required />
                      <br />
                      <label htmlFor="lastName">Last Name:</label>
                      <input type="text" id="lastName" name="lastName" required />
                      <br />
                    </div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <br />
                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" name="country" required />
                    <br />            
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input type="text" id="contactNumber" name="contactNumber" required />
                    <br />
                    <div className="languages">
                      <label htmlFor="firstLanguage">First language:</label>
                      <select name="firstLanguage" id="firstLanguage" required>
                        {languageOptions()}
                      </select>
                      <br />
                      <label htmlFor="secondLanguage">Second language:</label>
                      <select name="secondLanguage" id="secondLanguage" required>
                        {languageOptions()}
                      </select>
                      <br />
                      <label htmlFor="thirdLanguage">Third language:</label>
                      <select name="thirdLanguage" id="thirdLanguage" required>
                        {languageOptions()}
                      </select>
                      <br />
                    </div>
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" min="10" max="120" required />
                    <br />
                  </div>
                  <button className="boton" type="submit">Save</button>
                  <button className="boton" type="reset">Reset</button>
                </form>
              </div>
            ) : (
              <div className="divContiene">
                <h1>Security</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input type="password" id="currentPassword" name="currentPassword" required />
                  <br />
                  <label htmlFor="newPassword">New Password:</label>
                  <input type="password" id="newPassword" name="newPassword" required />
                  <br />
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" required />
                  <br />
                  <button className="boton" type="submit">Save</button>
                  <button className="boton" type="reset">Reset</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}



const Container = styled.div`
  height: 100vh;
`;

export default ConfigProfile;
