import "dotenv/config"
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import http from 'http';
import { Server as WebSocketServer } from 'socket.io';
import cors from "cors";
import cookieParser from 'cookie-parser';

// Importar rutas
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import addRoute from "./routes/add.js";
import chatsRoute from "./routes/chat.js";
import cookieJwtAuth from "./auth/cookieJwtAuth.js";
import handleSocketConnection from "./sockets/socketHandler.js";

// Server startup
const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});
const PORT = process.env.APP_PORT || 3002;

// Middlewares (server plug-ins)
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

  

// Test endpoint
app.post('/api/health', async (req, res) => {
    res.json({'Status' : 'Server OK'});
});

// Registrar usuario
app.post("/api/register", registerRoute);

// Iniciar sesión
app.post("/api/login", loginRoute);

// Ruta Segura para loggear usuarios con sesión activa
app.post("/api/add", cookieJwtAuth, addRoute);

app.get("/api/chatsExceptUser", chatsRoute); //REvisar por que el middleware del cookieJwtAuth no está funcando

// Manejar conexiones de Socket.IO
handleSocketConnection(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
