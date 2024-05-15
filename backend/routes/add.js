// Básicamente esto nos redirige a la pantalla inicial del chat porque en teoría el token de sesión sigue activo
const addRoute = async (req, res) => {
    res.json({
        message: "Session active - Redirecting to chat..."
    });
};

export default addRoute;