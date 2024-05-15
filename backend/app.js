import "dotenv/config"
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import http from 'http';
import { Server as WebSocketServer } from 'socket.io';
//import cors from "cors";
import cookieParser from 'cookie-parser';

// Importar rutas
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import addRoute from "./routes/add.js";
import cookieJwtAuth from "./auth/cookieJwtAuth.js";

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
//app.use(cors());

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

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    
    // Manejar el evento de recibir un mensaje del cliente
    socket.on('message', message => {
        console.log('Mensaje recibido:', message);

        // Reenviar el mensaje a todos los clientes conectados
        io.emit('message', message);
    });

    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
