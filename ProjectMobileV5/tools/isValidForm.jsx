import { FlatList, Text, VirtualizedList,StyleSheet } from "react-native";
import {
    isValidEmail,
    isValidPassword,
    isValidLastNameOrFirstName,
} from "./utils.jsx";

/**
 * Check if the the value in the label in the form is valid
 * 
 * @param {function} func - function to set the error
 * @param {object} errors - object containing the errors
 * @param {function =} errors.setErrorFirstname - function to set the error for the first name
 * @param {function =} errors.setErrorLastname - function to set the error for the last name
 * @param {function} errors.setErrorUsername - function to set the error for the username
 * @param {function} errors.setErrorMail - function to set the error for the email
 * @param {function =} errors.setErrorPassword - function to set the error for the password
 * @param {function =} errors.setViewStyle - function to set the view style
 * @param {string} username - username
 * @param {string} email - email
 * @param {object} viewStyle - view style
 * @param {boolean =} allowedPassword - if password is allowed if `null`, set to `false` by default and password/repeatPassword is not checked
 * @param {string =} password - password
 * @param {string =} repeatPassword - repeat password
 * @param {string =} firstname - first name
 * @param {string =} lastname - last name
 * 
 * @returns {Promise<Boolean>} - `true` if the form is valid, `false` otherwise
 */
async function isValidForm(
    func,
    errors,
    username,
    email,
    viewStyle,
    allowedPassword = false,
    password = undefined,
    repeatPassword = undefined,
    firstname = undefined,
    lastname = undefined,
) {
    let isValid = true;
    let height = viewStyle.height;

    cleaningError(func, errors);

    if (firstname && !isValidLastNameOrFirstName(firstname)) {
        func(errors.setErrorFirstname,{ target: { errorMessage: "First name must start with a capital letter and contain only letters" } });
        height += 15;
        isValid = false;
    }

    if (lastname && !isValidLastNameOrFirstName(lastname)) {
        func(errors.setErrorLastname,{ target: { errorMessage: "Last name must start with a capital letter and contain only letters" } });
        height += 15;
        isValid = false;
    }

    if (!username) {
        func(errors.setErrorUsername,{ target: { errorMessage: "Username is missing" } });
        isValid = false;
    }

    if (allowedPassword) {
        if (!password) {
            func(errors.setErrorPassword,{ target: { errorMessage: "Password is missing" } });
            isValid = false;
        } else if (!isValidPassword(password)) {
            func(errors.setErrorPassword,{ target: { errorMessage: "• Should be 8-20 characters\n• Should have a lower case letter\n• Should have a upper case letter\n• Should have a number" } });
            isValid = false;
            height += 40;
        } else if (password !== repeatPassword) {
            func(errors.setErrorPassword,{target : {errorMessage : "Password are not the same"} } );
            isValid = false;
        }
    }

    if (!email) {
        func(errors.setErrorMail,{ target: { errorMessage: "Email is missing" } });
        isValid = false;
    } else if (!isValidEmail(email)) {
        func(errors.setErrorMail,{ target: { errorMessage: "Invalid email" } });
        isValid = false;
    }

    errors.setViewStyle({...viewStyle,  height: height });
    
    return isValid;
}

function cleaningError (func, errors) {
    if (errors.setErrorFirstname) {
        func(errors.setErrorFirstname,{ target: { errorMessage: undefined } });
    }
    if (errors.setErrorLastname) {
        func(errors.setErrorLastname,{ target: { errorMessage: undefined } });
    }
    if (errors.setErrorUsername) {
        func(errors.setErrorUsername,{ target: { errorMessage: undefined } });
    }
    if (errors.setErrorMail) {
        func(errors.setErrorMail,{ target: { errorMessage: undefined } });
    }
    if (errors.setErrorPassword) {
        func(errors.setErrorPassword,{ target: { errorMessage: undefined } });
    }
    if (errors.setErrorIdentifiant) {
        func(errors.setErrorIdentifiant,{ target: { errorMessage: undefined } });
    }
}

export { isValidForm, cleaningError };
