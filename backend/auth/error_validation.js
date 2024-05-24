const inputValidationRegister = (first_name, last_name, country, contact_num, email, password, confirm_password) => {
    let errors = [];
    if (!first_name || !last_name || !country || !contact_num || !email || !password || !confirm_password) {
        errors.push({message : "Please enter all fields"});
    }

    if (password.length < 6) {
        errors.push({message : "Password should be at least 6 characters"});
    }

    if (password != confirm_password) {
        errors.push({message : "Passwords do not match"});
    }

    return errors;
}


const inputValidationLogin = (email, password) => {
    let errors = [];
    if (!email || !password) {
        errors.push({message : "Please enter all fields"});
    }

    if (password.length < 6) {
        errors.push({message : "Password should be at least 6 characters"});
    }

    return errors;
}

export {inputValidationRegister, inputValidationLogin};