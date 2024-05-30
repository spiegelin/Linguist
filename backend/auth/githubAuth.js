import "dotenv/config"
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import findOrCreate from "../models/githubAuthModel.js";

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        //console.log(profile)
        const user = await findOrCreate(profile);

        console.log(user);
        
        done(null, user);
    }
    catch (error) {
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