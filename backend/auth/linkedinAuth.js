import "dotenv/config"
import passport from 'passport';
import LinkedInStrategy from 'passport-linkedin-oauth2';
import findOrCreate from "../models/oAuthModel.js";

passport.use(new LinkedInStrategy(
{
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile'],
}, 
  async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await findOrCreate(profile, "linkedin");
            //console.log(user);

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

