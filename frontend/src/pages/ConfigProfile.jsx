//ConfigProfile.jsx
import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { ProfileContext } from "../pages/ProfileContext"; // Importa el contexto
import MainLayout from '../components/MainLayout';
import "../styles/configProfile.css";
import axios from "axios";
const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;

const languageOptions = () => (
  <>
    <option value="English">English</option>
    <option value="Spanish">Spanish</option>
    <option value="French">French</option>
    <option value="German">German</option>
    <option value="Portuguese">Portuguese</option>
    <option value="Italian">Italian</option> 
    <option value="Chinese">Chinese</option> 
    <option value="Japanese">Japanese</option>
    <option value="Korean">Korean</option> 
    <option value="Hindi">Hindi</option>
    <option value="Russian">Russian</option> 
    <option value="Arabic">Arabic</option> 
    <option value="Swedish">Swedish</option>
    <option value="Norwegian">Norwegian</option> 
    <option value="Hebrew">Hebrew</option> 
    <option value="Finnish">Finnish</option> 
  </>
);

export function ConfigProfile() {
  const { setProfileImage } = useContext(ProfileContext); // Obtiene la función para actualizar la imagen del contexto
  const placeholder = '/public/placeholder.jpg';
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [currentView, setCurrentView] = useState("profile");

  // Estados para cambiar los campos del formulario predefinidos que vienen del backend
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  // Estado para el valor del input cuando el usuario escribe algo que quiere cambiar
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputCountry, setInputCountry] = useState('');
  const [inputContactNumber, setInputContactNumber] = useState('');
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState('');
  const [selectedFirstLanguage, setSelectedFirstLanguage] = useState('');
  const [selectedSecondLanguage, setSelectedSecondLanguage] = useState('');
  const [selectedThirdLanguage, setSelectedThirdLanguage] = useState('');

  useEffect(() => {
    // Obtiene la información del perfil del usuario desde el backend
    axios.get(`${apiUrl}/users/edit-profile`, {
      withCredentials: true,
    })
      .then((response) => {
        setFirstName(response.data.first_name);
        setInputFirstName(response.data.first_name);

        setLastName(response.data.last_name);
        setInputLastName(response.data.last_name);

        setEmail(response.data.email);

        setCountry(response.data.country);
        setInputCountry(response.data.country);

        setContactNumber(response.data.contact_num);
        setInputContactNumber(response.data.contact_num);

        setSelectedNativeLanguage(response.data.native_language);
        setSelectedFirstLanguage(response.data.language1);
        setSelectedSecondLanguage(response.data.language2);
        setSelectedThirdLanguage(response.data.language3);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [apiUrl]);

  const handleButtonClick = (firstName, lastName, country, contactNumber, native_language, firstLanguage, secondLanguage, thirdLanguage) => {
    //e.preventDefault(); //Por alguna razón previene que el required se ejecute 
    axios.post(`${apiUrl}/users/edit-profile`, {
      first_name: firstName,
      last_name: lastName,
      country: country,
      contact_num: contactNumber,
      newLanguages: [native_language, firstLanguage, secondLanguage, thirdLanguage]
    }, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target.result.split(',')[1]; // Elimina el encabezado data:image/...;base64,
        console.log('Image base64 length:', imageBase64.length); // Añade este log para depuración
        // Envía la imagen al backend
        axios.post(`${apiUrl}/users/upload-profile-image`, {
          imageBase64
        }, {
          withCredentials: true
        }).then((response) => {
          console.log(response.data.message);
          setImage(e.target.result); // Actualiza la imagen en el estado
        }).catch((error) => {
          console.error('Error uploading profile image:', error);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Obtén la imagen de perfil desde el backend
    axios.get(`${apiUrl}/users/profile-image`, {
      withCredentials: true
    })
      .then(response => {
        const imageBase64 = response.data.imageBase64;
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        setImage(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching profile image:', error);
      });
  }, []);

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
                <form onReset={handleReset} onSubmit={() => {handleButtonClick(firstName, lastName, country, contactNumber, selectedNativeLanguage, selectedFirstLanguage, selectedSecondLanguage, selectedThirdLanguage)}}>
                  <div className="divContiene">
                    <div className="user-img">
                      <img src={image || placeholder} alt="Profile" id="photo" onError={(e) => { e.target.src = placeholder; }}/>
                      <input type="file" id="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }}/>
                      <button type="button" onClick={() => fileInputRef.current.click()} id="uploadbtn"><i className="fa-solid fa-camera"></i></button>
                    </div>
                    <div className="namess">
                      <label htmlFor="firstName">First Name:</label>
                      <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={inputFirstName} required />
                      <br />
                      <label htmlFor="lastName">Last Name:</label>
                      <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={inputLastName} required />
                      <br />
                    </div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder={email} disabled />
                    <br />
                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder={inputCountry} required />
                    <br />            
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder={inputContactNumber} required />
                    <br />
                    <div className="languages">
                    <label htmlFor="nativeLanguage">Native language:</label>
                      <select name="nativeLanguage" id="nativeLanguage" value={selectedNativeLanguage} onChange={(e) => setSelectedNativeLanguage(e.target.value)} required>
                        {languageOptions()}
                      </select>
                      <br />
                      <label htmlFor="firstLanguage">First language:</label>
                      <select name="firstLanguage" id="firstLanguage" value={selectedFirstLanguage} onChange={(e) => setSelectedFirstLanguage(e.target.value)} required>
                        {languageOptions()}
                      </select>
                      <br />
                      <label htmlFor="secondLanguage">Second language:</label>
                      <select name="secondLanguage" id="secondLanguage" value={selectedSecondLanguage} onChange={(e) => setSelectedSecondLanguage(e.target.value)} required>
                        {languageOptions()}
                      </select>
                      <br />
                      <label htmlFor="thirdLanguage">Third language:</label>
                      <select name="thirdLanguage" id="thirdLanguage" value={selectedThirdLanguage} onChange={(e) => setSelectedThirdLanguage(e.target.value)} required>
                        {languageOptions()}
                      </select>
                      <br />
                    </div>
              
                    <br />
                  </div>
                  <button className="boton" type="submit" >Save</button>
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
