//LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/loginTheme.css";
const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;
//console.log(appPort, baseApiUrl, apiUrl)

export const LoginPage = () => {
  const [isSignInActive, setIsSignInActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

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
          window.location.href = "/Home";
        }
        else {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (email && password && confirm_password) {
      await axios.post(`${apiUrl}/register`, {
        email: email,
        password: password,
        confirm_password: confirm_password
      }, {
        withCredentials: true,
      
      })
      .then((response) => {
        console.log(response);
        if (response.data.isRegistered){
          window.location.href = "/ConfigProfile";
        }
        else {
          alert("Credenciales inválidas");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      alert("Credenciales inválidas");
    }
  };

  // Función para redirigir a la autenticación de Google
  const googleAuthLogin = (e) => {
    e.preventDefault();
    window.location.href = `${apiUrl}/auth/google`;
  };

  // Función para redirigir a la autenticación de Facebook
  const facebookAuthLogin = (e) => {
    e.preventDefault();
    window.location.href = `${apiUrl}/auth/facebook`;
  };

  // Función para redirigir a la autenticación de Github
  const githubAuthLogin = (e) => {
    e.preventDefault();
    window.location.href = `${apiUrl}/auth/github`;
  };

  // Función para redirigir a la autenticación de Linkedin
  const linkedinAuthLogin = (e) => {
    e.preventDefault();
    window.location.href = `${apiUrl}/auth/linkedin`;
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
              src="/logo.ico"
              alt="Logo"
              className="logo"
              width="100%"
              height="100%"
            />
          </div>
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="" onClick={googleAuthLogin} className="icon">
                <i className="fa-brands fa-google-plus-g" />
              </a>
              <a href="" onClick={facebookAuthLogin} className="icon">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="" onClick={githubAuthLogin} className="icon">
                <i className="fa-brands fa-github" />
              </a>
              <a href="" onClick={linkedinAuthLogin} className="icon">
                <i className="fa-brands fa-linkedin-in" />
              </a>
            </div>
            <span>or use your email for registration</span>
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <div
            className="logo"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <img
              src="/logo.ico"
              alt="Logo"
              className="logo"
              width="130px"
              height="auto"
            />
          </div>
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="" onClick={googleAuthLogin} className="icon">
                <i className="fa-brands fa-google-plus-g" />
              </a>
              <a href="" onClick={facebookAuthLogin} className="icon">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="" onClick={githubAuthLogin} className="icon">
                <i className="fa-brands fa-github" />
              </a>
              <a href="" onClick={linkedinAuthLogin} className="icon">
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