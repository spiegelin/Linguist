import bcrypt from "bcrypt";
import { inputValidationRegister } from "../auth/error_validation.js";
import { addUser, checkEmail } from "../models/registerModel.js";

const registerRoute = async (req, res) => {
    let { first_name, last_name, country, contact_num, email, password, confirm_password } = req.body;

        // Validation
        let errors = inputValidationRegister(first_name, last_name, country, contact_num, email, password, confirm_password);

        // If there are errors, return them
        if (errors.length > 0) {
            res.json({
                errors: errors
            });
        } else {
            // Validation passed
            // Hash password with promises, so it doesn't get stored
            await bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    console.log(err);
                }
                // Se guarda el hash en la base de datos, junto con el username y email
                console.log(hash);

                // Checar si el email ya está en uso
                const emailExists = await checkEmail(email);
                
                if (emailExists) {
                    res.json({
                        message: "Email already in use"
                    });
                    return "Email already in use";
                } else if (emailExists === null) {
                    res.json({
                        message: "Error checking email"
                    });
                    return;
                }

                // Revisar si el usuario fue añadido
                const userAdded = await addUser(first_name, last_name, country, contact_num, email, hash);
                if (!userAdded) {
                    res.json({
                        message: "Error adding user"
                    });
                    return;
                }

                // Si todo sale bien se regresa un mensaje de éxito
                res.json({
                    message: "User registered"
                });
            });
        }   
}

export default registerRoute;