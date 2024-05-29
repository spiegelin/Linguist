import jwt from "jsonwebtoken";
import express from 'express';
import passport from 'passport';


const router = express.Router();

// Ruta para autenticación con Google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email', 'openid']})
);

// Ruta para manejar la redirección de Google después de autenticar al usuario en la ruta anterior
router.get('/google/callback', passport.authenticate('google', { 
    session: true, }), (req, res) => {
    // Se obtiene el usuario autenticado
    const user = req.user;
        
    // Se genera un token con la información del usuario
    const token = jwt.sign({user_id: user.id, google_id: user.google_id}, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    console.log("Token del login: ", token);

    // Se envía el token en una cookie
    res.cookie("token", token, {
        httpOnly: false,
        sameSite: true,
        //signed: true,
        secure: true,
        maxAge: 3600000
    });

    // Se envía la información del usuario
    res.send({
        req: user,
        isLogged: true
    });
});

export default router;