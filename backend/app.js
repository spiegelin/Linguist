import "dotenv/config"
import express from "express";
import bodyParser from "body-parser";
import http from 'http';
import { Server as WebSocketServer } from 'socket.io';

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
//app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.post("/api/test", (req, res) => {
    res.json({
        greeting: "Hello World!"
    });
});

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
