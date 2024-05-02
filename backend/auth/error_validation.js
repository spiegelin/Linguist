const inputValidation = (username, email, password, confirm_password) => {
    let errors = [];
    if (!username || !email || !password || !confirm_password) {
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

export default inputValidation;