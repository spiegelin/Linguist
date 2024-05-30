import "dotenv/config"
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import findOrCreate from "../models/facebookAuthModel.js";

// https://developers.facebook.com/apps/2043470932704098/settings/basic/
passport.use(new FacebookStrategy(
    {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails', 'name']
    },
  async (accessToken, refreshToken, profile, done) => {
    try {
        // Revisar si el usuario ya existe en la base de datos, si no, crearlo
        //console.log(profile)
        const user = await findOrCreate(profile);

        console.log(user);
        
        done(null, user);
    } catch (error) {
        // En caso de error, se llama a done con el error
        done(error);
    }
    
  }
));


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