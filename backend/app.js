import "dotenv/config"
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import http from 'http';
import { Server as WebSocketServer } from 'socket.io';
import bcrypt from "bcrypt";
import inputValidation from "./auth/error_validation.js";
import addUser from "./database/db.js";

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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.post('/api/health', async (req, res) => {
    res.json({'Status' : 'Server OK'});
});

// Registrar usuario
app.post("/api/register", async (req, res) => {
    let { username, email, password, confirm_password } = req.body;

    // Validation
    let errors = inputValidation(username, email, password, confirm_password);

    // If there are errors, return them
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        // Validation passed
        // Hash password with promises, so it doesn't get stored
        await bcrypt.hash(password, 5, (err, hash) => {
            if (err) {
                console.log(err);
            }
            // Se guarda el hash en la base de datos, junto con el username y email
            console.log(hash);
            addUser(username, email, hash);
        });

        res.json({
            username: username,
            email: email
        });
    }   
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
