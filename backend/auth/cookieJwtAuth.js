// Esta función sirve más que nada para sacar el token de la cookie y verificar si es válido
// Si el token es válido, se llama a la función next() para que el servidor siga con la ejecución
// En todo caso, lo que está después de esta función en el endpoint que se ejecuta

// Ejemplo de token en JSON Web Tokens (JWT):
// %3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// -> Hasta el primer punto es el header del token

// eyJ1c2VyX2lkIjo0LCJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmIkMDUkZ1BDNXl1b2IvUTV6aUU2eHdqUjB1dU52TTd0TUhVamtkYVEyZVE2Lmxka3lNdUU1TmI5cnEiLCJpYXQiOjE3MTU3NTUyMzQsImV4cCI6MTcxNTc1ODgzNH0.
// -> En el segundo punto está payload (la información del usuario)

// U_Ztadv3sZBwxym6IX-q9NKFFXeT9giT3BFvG1NfoMM.zfd3qzHegVYksJsxJ3NQOGZocKSZ2qjYjh0AxDYTqr0
// -> En el tercer punto está la firma digital (la encriptación simétrica del token con la llave secreta)

// Lo importante de todo esto es que está códificado en base64, por lo que se puede decodificar con un decoder de base64
// https://www.base64decode.org/

// Más información sobre JWT:
// https://jwt.io/

import jwt from "jsonwebtoken";

const cookieJwtAuth = (req, res, next) => {
    // Se obtiene el token de la cookie (se pone token porque así se definió el nombre en la cookie de login.js)
    //console.log(req);
    //const token = req.cookies.token;
    const token = req.cookies.token;

    try {
        // Se pasa el token y la llave secreta para verificar la firma digital (es un proceso de encriptación simétrica)
        // Si el token es válido, se obtiene el payload del token (en este caso, el id, email, y password del usuario)
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

        console.log("User: ", user);
        next();
    } catch (error) {
        res.clearCookie("token");
        res.json({
            message: "Unauthorized"
        });
    }
};

export default cookieJwtAuth;