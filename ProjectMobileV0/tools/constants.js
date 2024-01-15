const IP = "192.168.1.61";
const PORT = "3001";
const API_VERSION = "v2";
const API_BASE_URL = `http://${IP}:${PORT}`;
const API_URL = `${API_BASE_URL}/${API_VERSION}`;

const HEADER_HEIGHT = 100;
const TAB_NAVIGATOR_HEIGHT = 80;
const LIGHT_GREY = "#1f1f1f";
const DARK_GREY = "#181818";
const GREEN = "#59A52C";
const LOAD_SIZE = 70;
const ERROR_JWT_MESSAGE = "It seems your account has a problem";
const USERNAME = "Username";
const PASSWORD = "Password";
const EMAIL = "Email";
const LASTNAME = "Lastname";
const FIRSTNAME = "Firstname";
const REPEAT_PASSWORD = "Repeat password";
const LOGIN = "Login";
const FIRSTNAME_LASTNAME_ERROR =
    "• must contains at least 2 letters\n• Must start with a capital letter";
const USERNAME_ERRORS = {
    missing: "Username is missing",
    length: "Username must be between 3 and 20 characters",
};
const EMAIL_ERRORS = {
    missing: "Email is missing",
    invalid: "Invalid email",
};
const PASSWORD_ERRORS = {
    missing: "Password is missing",
    invalid:
        "• Should be 8-20 characters\n• Should have a lower case letter\n• Should have a upper case letter\n• Should have a number",
    different: "Password and repeat password are not the same",
};
const UNKNOW_ERROR = "An error occured";

export {
    HEADER_HEIGHT,
    TAB_NAVIGATOR_HEIGHT,
    LIGHT_GREY,
    DARK_GREY,
    GREEN,
    LOAD_SIZE,
    API_BASE_URL,
    API_URL,
    ERROR_JWT_MESSAGE,
    USERNAME,
    PASSWORD,
    EMAIL,
    LASTNAME,
    FIRSTNAME,
    REPEAT_PASSWORD,
    LOGIN,
    FIRSTNAME_LASTNAME_ERROR,
    USERNAME_ERRORS,
    EMAIL_ERRORS,
    PASSWORD_ERRORS,
    UNKNOW_ERROR,
};