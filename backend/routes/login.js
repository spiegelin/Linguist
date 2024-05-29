import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import getUser  from '../models/loginModel.js';
import { inputValidationLogin } from '../auth/error_validation.js';

const loginRoute = async (req, res) => {
    // Se obtienen los datos del body del request (del payload)
    const { email, password } = req.body;

    // Validation
    let errors = inputValidationLogin(email, password);

    // Si hay errores los regresa
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        // Validation passed
        // Revisar si el usuario existe en la base de datos
        let user = await getUser(email);
        console.log(user);
        if (!user) {
            res.json({
                message: "User not found"
            });
            return;
        }

        // Se compara el password con el hash de la base de datos
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.log(err);
            }

            // Si el resultado es falso, se envía un mensaje de error
            if (!result) {
                res.json({
                    message: "Login failed"
                });
            } 

            // Creación del Token JWT
            // Si el resultado es verdadero, se firma el token con el secreto
            // El secreto es tu llave privada para la firma digital
            // El token expira en 1 hora
            // SE crea el token con el payload del usuario (que es un objeto con el id, email y password)
            // express-sessions
            const token = jwt.sign({user_id: user.id, email: user.email, password: user.password}, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });
            console.log("Token del login: ", token);

            // Se crea la cookie en el response header para decirle al browser que la guarde en su cache
            // Esto sirve para que el browser pueda recordar la sesión del usuario y la mande en requests futuros
            // value (lo que sale en la cookie) es el jwt token
            res.cookie("token", token, {
                httpOnly: false,
                sameSite: true,
                //signed: true,
                secure: true,
                maxAge: 3600000
            });
            return res.send({
                message: 'Cookie has been set',
                isLogged: true
            });
        });
    }
};

export default loginRoute;