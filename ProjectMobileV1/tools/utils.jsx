function isValidEmail(email) {
    return /^[a-zA-Z0-9_.À-ú+-]+@[a-zA-ZÀ-ú0-9]+\.[a-zA-Z]+$/.test(email)
}

function isValidPassword(password) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]*).{8,}$/.test(password);
}

function isValidLastNameOrFirstName(name) {
    return /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/.test(name);
}
export {isValidEmail, isValidPassword, isValidLastNameOrFirstName};