//LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/loginTheme.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;
//console.log(appPort, baseApiUrl, apiUrl)

export const LoginPage = () => {
  const [isSignInActive, setIsSignInActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSignIn = () => {
    setIsSignInActive(!isSignInActive);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión
    // tambien se puede la lógica de validación de credenciales aquí
    //  ejemplo,  "a@a.com" y la contraseña es "1
    if (email && password) {
      await axios.post(`${apiUrl}/login`, {
        email: email,
        password: password
      }, {
        withCredentials: true,
      
      })
      .then(function (response) {
        console.log(response);
        //console.log("Token:", response.data.token);
        /*
        cookies.set("TOKEN", response.data.token, {
          path: "/",
        });
        */
       console.log("IsLogged: ", response.data.isLogged);
       //console.log("Token", cookies.get("token"))
        if (response.data.isLogged){
          //Esto lo que hace es mandarnos a home, en este momento no "verifica" que este loggeado, solo guarda la cookie en el cliente
          window.location.href = "/home";
        }
        else {
          alert("Credenciales inválidas 1");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      alert("Credenciales inválidas 2");
    }
  };

  return (
    <>
      <div className={`container ${isSignInActive ? "active" : ""}`}>
        <header></header>
        <div className="form-container sign-up">
          <div
            className="logo-container"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "130px",
              height: "130px",
            }}
          >
            <img
              src="/logo.webp"
              alt="Logo"
              className="logo"
              width="100%"
              height="100%"
            />
          </div>
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in" />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Lenguages" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <div
            className="logo"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <img
              src="/logo.webp"
              alt="Logo"
              className="logo"
              width="130px"
              height="auto"
            />
          </div>
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in" />
              </a>
            </div>
            <span>or use your email password</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={toggleSignIn}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" onClick={toggleSignIn}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <script src="../pages/LoginPage/script.jsx"></script>
    </>
  );
};