import {
    isValidEmail,
    isValidPassword,
    isValidLastNameOrFirstName,
} from "./utils";

import {
    USERNAME_ERRORS,
    FIRSTNAME_LASTNAME_ERROR,
    PASSWORD_ERRORS,
    EMAIL_ERRORS,
    LASTNAME_ERROR,
} from "./constants";

/**
 * Check if the the value in the label in the form is valid
 *
 * @param {Object} form - The form
 * @param {string} form.username - The username
 * @param {string} form.email - The email
 * @param {string} form.password - The password
 * @param {string} form.repeatPassword - The repeated password
 * @param {string} form.firstname - The firstname
 * @param {string} form.lastname - The lastname
 * @param {Object} form.errorFirstname - The error of the firstname
 * @param {Object} form.errorLastname - The error of the lastname
 * @param {Object} form.errorUsername - The error of the username
 * @param {Object} form.errorMail - The error of the email
 * @param {Object} form.errorPassword - The error of the password
 * @param {Function} setForm - The function to set the form 
 * @param {Boolean} modifyAccount - If the form is for modify account, default is `false`
 * 
 * @returns {Boolean} - `true` if the form is valid, `false` otherwise
 */
function isValidForm(form, setForm, modifyAccount = false) {
    let isValid = true;
    const error = {
        errorFirstname: "",
        errorLastname: "",
        errorUsername: "",
        errorMail: "",
        errorPassword: "",
    };
    const { username, email, password, repeatPassword, firstname, lastname } =
        form;

    if (firstname && !isValidLastNameOrFirstName(firstname)) {
        error.errorFirstname = FIRSTNAME_LASTNAME_ERROR;
        isValid = false;
    }

    if (lastname && !isValidLastNameOrFirstName(lastname)) {
        error.errorLastname = FIRSTNAME_LASTNAME_ERROR;
        isValid = false;
    }

    if (!username) {
        error.errorUsername = USERNAME_ERRORS.missing;
        isValid = false;
    } else if (username.length < 3 || username.length > 20) {
        error.errorUsername = USERNAME_ERRORS.length;
        isValid = false;
    }

    if (!email) {
        error.errorMail = EMAIL_ERRORS.missing;
        isValid = false;
    } else if (!isValidEmail(email)) {
        error.errorMail = EMAIL_ERRORS.invalid;
        isValid = false;
    }

    if (!modifyAccount) {
        if (!password) {
            error.errorPassword = PASSWORD_ERRORS.missing;
            isValid = false;
        } else if (!isValidPassword(password)) {
            error.errorPassword = PASSWORD_ERRORS.invalid;
            isValid = false;
        } else if (password !== repeatPassword) {
            error.errorPassword = PASSWORD_ERRORS.different;
            isValid = false;
        }
    }
    setForm({ ...form, ...error });
    return isValid;
}

export { isValidForm };