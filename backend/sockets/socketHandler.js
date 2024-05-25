
import jwt from 'jsonwebtoken';
import { getUserById, getOrCreateConversation, saveMessage } from '../database/db.js';

const handleSocketConnection = (io) => {
    // Middleware de autenticación JWT para Socket.IO

    //REvisar bien la funcion de cookieJwtAuth por que debería ser esta lógica, nadamas sería modificarla
    const socketJwtAuth = (socket, next) => {
        const token = socket.handshake.auth.token;
        const encodedToken = encodeURIComponent(token);
        console.log("sockethandler")
        console.log("Token: ", token);
        console.log("Encoded Token:", encodedToken);
        if (!token) {
            return next(new Error('Authentication error: Token missing'));
        }

        try {
            console.log("Entro en el try")
            const decoded = jwt.verify(encodedToken, process.env.JWT_SECRET);
            console.log("Decoded: ", decoded);
            socket.user = decoded.user_id; // Almacenar la información del usuario en el objeto de socket
            next();
        } catch (error) {
            return next(new Error('Authentication error: Invalid token'));
        }
    };

    const users = new Map();

    // Manejo de conexiones de Socket.IO
    io.use(socketJwtAuth).on('connection', async (socket) => {

        console.log('A user connected: ' + socket.id);
        users.set(socket.id, socket.user);
        console.log(users);

        const user = await getUserById(socket.user);
        if (!user) {
            return socket.disconnect();
        }

        socket.on('joinConversation', async ({ partnerId }, callback) => {
            const conversation = await getOrCreateConversation(socket.user, partnerId);
            const room = conversation.conversation_name;
            socket.join(room);
            console.log(`User ${socket.user} joined room: ${room}`);
            if (callback) callback({ room });
        });

        socket.on('message', async ({ room, message, partnerId }) => {
            console.log(message)
            console.log(`Mensaje recibido en room ${room}:`, message);
            const conversationId = parseInt(room.split('_')[1], 10);
            await saveMessage(conversationId, socket.user, message); //ver si le mandamos ese json o el puro text
            const recipientSocketId = Array.from(users.keys()).find(key => users.get(key) === partnerId);
            console.log("Sender Socket ID: ", socket.id)
            console.log("Recipient Socket ID: ", recipientSocketId);
            if (recipientSocketId && recipientSocketId !== socket.id) {
            io.to(recipientSocketId).emit("message", message);
            } else {
            console.log("Usuario no encontrado o desconectado");
            }
        });

        // Manejar desconexiones de Socket.IO
        socket.on('disconnect', () => {
            users.delete(socket.id);
            console.log('User disconnected: ' + socket.id);
        });
    });
};

export default handleSocketConnection;
