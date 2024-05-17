//LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/loginTheme.css";

export const LoginPage = ({ onLogin }) => {
  const [isSignInActive, setIsSignInActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSignIn = () => {
    setIsSignInActive(!isSignInActive);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión
    // tambien se puede la lógica de validación de credenciales aquí
    //  ejemplo,  "a@a.com" y la contraseña es "1
    if (email && password) {
      axios.post('http://localhost:3002/api/login', {
        email: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
        if (response.data.message === "Login successful") {
          //Cambiar esta logica en un futuro a rutas protegidas, igual la validacion de el responsedatamessage
          window.location.href = "/Home";
        } else {
          alert("Credenciales inválidas");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      alert("Credenciales inválidas");
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
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="Lenguages" placeholder="lenguages" />
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