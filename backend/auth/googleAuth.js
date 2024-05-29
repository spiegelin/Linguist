import "dotenv/config"
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from "../models/googleAuthModel.js";

passport.use(new GoogleStrategy(
{
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    // Callback function después de que el usuario se autentique
    // done es una función que se ejecuta después de que se haya terminado de procesar la autenticación
    async (accessToken, refreshToken, profile, done) => {
        // Revisar si el usuario ya existe en la base de datos, si no, crearlo
        // En caso de error, se llama a done con el error
        try {
            const user = await findOrCreate(profile);
            console.log(user);
        
            done(null, user);
        } catch (error) {
            done(error);
        }
    })
);

// Serializar al usuario
// Lo cual significa que se guarda el ID del usuario en la sesión
// req.session.passport.user = {id: '...'}
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserializar al usuario
// Lo cual significa que se obtiene el ID del usuario de la sesión
// req.user = {id: '...'}
passport.deserializeUser((user, done) => {
    // Lo que regrese done se guarda en req.user
    done(null, user);
});

