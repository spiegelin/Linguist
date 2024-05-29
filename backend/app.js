import "dotenv/config"
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import http from 'http';
import { Server as WebSocketServer } from 'socket.io';
import cors from "cors";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './auth/googleAuth.js';
import session from 'express-session';

// Importar rutas
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import addRoute from "./routes/add.js";
import chatsRoute from "./routes/chat.js";
import cookieJwtAuth from "./auth/cookieJwtAuth.js";
import handleSocketConnection from "./sockets/socketHandler.js";
import googleAuth from "./routes/googleAuth.js";

// Server startup
const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});
const PORT = process.env.APP_PORT || 3002;

// Middlewares (server plug-ins)
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: 'GET, POST',
        credentials: true
    })
);

// Por qué usar express-session
// TL;DR: express-session es más seguro, flexible, y está built para manejar sesiones en passport
// Por otro lado, sirve casi que para lo mismo que cookie-parser, pero con más funcionalidades
// En Express-session las sesiones almacenan datos en el servidor, mientras que el cliente solo almacena una 
// identificación de la sesión (ID de sesión) en una cookie.
// req.cookies almacena datos en el cliente, sin manejo automático del estado del usuario en el servidor.
app.use(
    // Saca la cookie de la memoria y la guarda en req.session
    session({
        secret: process.env.COOKIE_SECRET,
        // secure es para que la cookie solo se envíe en conexiones HTTPS
        // sameSite es para que la cookie no se envíe en requests de terceros
        cookie: {
            secure: false,
            sameSite: 'none',
        },
        // resave es para que la sesión se guarde en cada request
        resave: false,
        // saveUninitialized es para que no se guarde la sesión que se inicialice
        saveUninitialized: false
    })
);


app.use(passport.initialize());
app.use(passport.session());
  

// Test endpoint
app.post('/api/health', async (req, res) => {
    res.json({'Status' : 'Server OK'});
});

app.get('/api/health', async (req, res) => {
    res.json({'Status' : 'Server OK'});
});

// Registrar usuario
app.post("/api/register", registerRoute);

// Iniciar sesión
app.post("/api/login", loginRoute);

// Ruta Segura para loggear usuarios con sesión activa
app.post("/api/add", cookieJwtAuth, addRoute);

app.get("/api/chatsExceptUser", chatsRoute); //REvisar por que el middleware del cookieJwtAuth no está funcando

// Ruta para autenticación con Google
app.get('/api/auth/google', passport.authenticate('google', { 
    scope: 'profile'})
);

// Ruta para manejar la redirección de Google después de autenticar al usuario en la ruta anterior
app.get('/api/auth/google/callback', passport.authenticate('google', { 
    session: true, }), 
    googleAuth
);

// Manejar conexiones de Socket.IO
handleSocketConnection(io);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
