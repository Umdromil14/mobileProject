import { FlatList, Text, VirtualizedList,StyleSheet } from "react-native";
import {
    isValidEmail,
    isValidPassword,
    isValidLastNameOrFirstName,
} from "./utils.jsx";

/**
 * Check if the the value in the label in the form is valid
 * 
 * 
 * 
 * @returns {Promise<Boolean>} - `true` if the form is valid, `false` otherwise
 */
function isValidForm(
    form,setForm
) {
    let isValid = true;
    const error = {
        errorFirstname: "",
        errorLastname: "",
        errorUsername: "",
        errorMail: "",
        errorPassword: "",
    };
    let height = 660;
    const { username, email, password, repeatPassword, firstname, lastname } = form;

    if (firstname && !isValidLastNameOrFirstName(firstname)) {
        error.errorFirstname = "First name must start with a capital letter and contain only letters";
        height += 15;
        isValid = false;
    }

    if (lastname && !isValidLastNameOrFirstName(lastname)) {
        error.errorLastname = "Last name must start with a capital letter and contain only letters";
        height += 15;
        isValid = false;
    }

    if (!username) {
        error.errorUsername = "Username is missing";
        height += 15;
        isValid = false;
    }else if (username.length < 3 || username.length > 20) {
        error.errorUsername = "Username must be between 3 and 20 characters";
        height += 15;
        isValid = false;
    }

    if (!email) {
        error.errorMail = "Email is missing";
        height += 15;
        isValid = false;
    } else if (!isValidEmail(email)) {
        error.errorMail = "Invalid email";
        height += 15;
        isValid = false;
    }

    if (!password) {
        error.errorPassword = "Password is missing";
        height += 15;
        isValid = false;
    } else if (!isValidPassword(password)) {
        error.errorPassword = "• Should be 8-20 characters\n• Should have a lower case letter\n• Should have a upper case letter\n• Should have a number";
        height += 40;
        isValid = false;
    } else if (password !== repeatPassword) {
        error.errorPassword = "Password and repeat password are not the same";
        height += 15;
        isValid = false;
    }
    setForm({...form, ...error, viewStyle: {...form.viewStyle, height: height }});
    return isValid;
}

export { isValidForm };
