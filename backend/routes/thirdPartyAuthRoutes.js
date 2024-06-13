//thirdPartyAuthRoutes
import jwt from "jsonwebtoken";
import express from 'express';
import passport from 'passport';
import e from "express";


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
    //console.log("Token del login: ", token);

    // Se envía el token en una cookie
    res.cookie("token", token, {
        httpOnly: false,
        sameSite: true,
        //signed: true,
        secure: true,
        maxAge: 3600000
    });

    // Se envía al usuario a la página de Profile
    if (user.isNew) {
        res.redirect(process.env.FRONTEND_URL + "/ConfigProfile");
    } else {
        res.redirect(process.env.FRONTEND_URL + "/Profile");
    }
});

// Ruta para autenticación con Facebook
router.get('/facebook', passport.authenticate('facebook', { 
    scope: ['email', 'public_profile']})
);

router.get('/facebook/callback', passport.authenticate('facebook', {
    session: true, }), (req, res) => {
    // Se obtiene el usuario autenticado
    const user = req.user;
    
    
    // Se genera un token con la información del usuario
    const token = jwt.sign({user_id: user.id, facebook_id: user.facebook_id}, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    //console.log("Token del login: ", token);

    // Se envía el token en una cookie
    res.cookie("token", token, {
        httpOnly: false,
        sameSite: true,
        //signed: true,
        secure: true,
        maxAge: 3600000
    });

    // Se envía al usuario a la página de Profile
    res.redirect(process.env.FRONTEND_URL + "/Profile");
});

// Ruta para autenticación con GitHub
router.get('/github', passport.authenticate('github', { 
    scope: ['user:email']})
);

router.get('/github/callback', passport.authenticate('github', {
    session: true, }), (req, res) => {
    // Se obtiene el usuario autenticado
    const user = req.user;
    
    
    // Se genera un token con la información del usuario
    const token = jwt.sign({user_id: user.id, facebook_id: user.github_id}, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    //console.log("Token del login: ", token);

    // Se envía el token en una cookie
    res.cookie("token", token, {
        httpOnly: false,
        sameSite: true,
        //signed: true,
        secure: true,
        maxAge: 3600000
    });
    
    // Se envía al usuario a la página de Home
    res.redirect(process.env.FRONTEND_URL + "/Profile");
});


export default router;