
import jwt from 'jsonwebtoken';

const handleSocketConnection = (io) => {
    // Middleware de autenticación JWT para Socket.IO

    //REvisar bien la funcion de cookieJwtAuth por que debería ser esta lógica, nadamas sería modificarla
    const socketJwtAuth = (socket, next) => {
        const token = socket.handshake.headers.auth;
        console.log("sockethandler")
        console.log("Token: ", token);
        if (!token) {
            return next(new Error('Authentication error: Token missing'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded.user_id; // Almacenar la información del usuario en el objeto de socket
            next();
        } catch (error) {
            return next(new Error('Authentication error: Invalid token'));
        }
    };

    // Manejo de conexiones de Socket.IO
    io.use(socketJwtAuth).on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);
        console.log('User info:', socket.user); // Acceder a la información del usuario

        // Manejar eventos de Socket.IO
        socket.on('message', (message) => {
            console.log('Mensaje recibido:', message);
            // Lógica específica del evento...
            // Por ejemplo, aquí podrías guardar el mensaje en la base de datos relacionándolo con el usuario
            // O enviar una respuesta personalizada al usuario, etc.
        });

        // Manejar desconexiones de Socket.IO
        socket.on('disconnect', () => {
            console.log('User disconnected: ' + socket.id);
        });
    });
};

export default handleSocketConnection;
