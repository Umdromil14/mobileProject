function isValidEmail(email) {
    return /^[a-zA-Z0-9_.À-ú+-]+@[a-zA-ZÀ-ú0-9]+\.[a-zA-Z]+$/.test(email)
}

export {isValidEmail};