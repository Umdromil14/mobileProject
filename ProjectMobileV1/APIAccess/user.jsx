import config from "../config";
import axios from "axios";
import { Alert } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { cleaningError } from "../tools/isValidForm";

async function postUser(user, func, errors) {
    await axios
        .post("http://192.168.0.198:3001/user", {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password,
        })
        .then(async (response) => {
            await login(user,undefined,undefined,true);
        })
        .catch((reason) => {
            console.log(reason);
            switch (reason.response.request.status) {
                case 409:
                    func(errors.setErrorMail, {
                        target: { errorMessage: "Email already exist" },
                    });
                    func(errors.setErrorUsername, {
                        target: { errorMessage: "Username already exist" },
                    });
                    break;
                case 500:
                    //faire une alerte
                    break;
                default:
                    console.log("unknown error");
                    break;
            }
        });
}

async function login(
    user,
    func = undefined,
    error = undefined,
    isInRegister = false,
) {
    let isValid = true;
    if (!isInRegister) {
        console.log(user);
        cleaningError(func, error);
        if (!user.identifiant) {
            func(error.setErrorIdentifiant, {
                target: { errorMessage: "Email or username is missing" },
            });
            isValid = false;
        }
        user.email = user.identifiant;
        user.username = user.identifiant;
    }
    if (!user.password) {
        func(error.setErrorPassword, {
            target: { errorMessage: "Password is missing" },
        });
        isValid = false;
    }

    if (isValid) {
        await axios
            .post("http://192.168.0.198:3001/user/login", {
                email: user.email ? user.email : undefined,
                username: user.username ? user.username : undefined,
                password: user.password,
            })
            .then((response) => {
                console.log(response.data.token);
            })
            .catch((reason) => {
                switch (reason.response.request.status) {
                    case 400:
                        func(error.setErrorPassword, {
                            target: { errorMessage: "Password is not valid" },
                        });
                        break;
                    case 404:
                        func(error.setErrorMail, {
                            target: {
                                errorMessage: "Email or username is not valid",
                            },
                        });
                        func(error.setErrorUsername, {
                            target: {
                                errorMessage: "Email or username is not valid",
                            },
                        });
                        break;
                    case 500:
                        //faire une alerte
                        break;
                    default:
                        console.log("unknown error");
                        break;
                }
            });
    }
}

export { postUser, login };
