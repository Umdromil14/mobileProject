import config from "../config";
import axios from "axios";
import { Alert } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { cleaningError } from "../tools/isValidForm";
import { APIURL, getAuthorizationHeader, axiosInstance } from "./AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
//! vérifier AxiosInstance

async function postUser(user, func, errors) {
    try {
        await axios.post(APIURL + "/user", {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password,
        });
        const response = await login(user, undefined, undefined, true);
    } catch (reason) {
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
                <Alert
                    title="Error"
                    message="An error has occured"
                    confirmText="Ok"
                />;
                break;
            default:
                console.log("unknown error");
                break;
        }
    }
}

async function login(
    user,
    func = undefined,
    error = undefined,
    isInRegister = false
) {
    let isValid = true;
    if (!isInRegister) {
        cleaningError(func, error);
        if (!user.email && !user.username) {
            isValid = false;
            func(error.setErrorIdentifiant, {
                target: {
                    errorMessage: "Username or email is missing",
                },
            });
        }
        if (!user.password) {
            isValid = false;
            func(error.setErrorPassword, {
                target: { errorMessage: "Password is missing" },
            });
        }
    }
    if (isValid) {
        try {
            const response = await axios.post(APIURL + "/user/login", {
                login : user.email ? user.email : user.username,
                password: user.password,
            });
            await AsyncStorage.setItem("token", response.data.token);
            axiosInstance.defaults.headers.common["Authorization"] =
                response.data.token;
        } catch (reason) {
            throw reason;
            //.catch((reason) => {
            console.log(APIURL);
            console.log(reason.response.request.status);
            switch (reason.response.request.status) {
                case 400:
                    func(error.setErrorPassword, {
                        target: { errorMessage: "Password is not valid" },
                    });
                    break;
                //! error 401
                //! message commun username et password
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
        }
    }
}

async function getUser() {
    try {
        const Authorization = await getAuthorizationHeader();
        const response = await axiosInstance.get(APIURL + "/user/me", {
            headers: { Authorization: Authorization },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        //! à faire quand getToken API sera fait
    }
}

async function updateUser(updateValues) {
    try {
        const Authorization = await getAuthorizationHeader();
        const response = await axiosInstance.patch(
            APIURL + "/user/",
            updateValues,
            { headers: { Authorization: Authorization } }
        );

        return response.data;

    } catch (error) {
        //! à pas oublier et demander à cyril comment ça fonctionne
    }
}

async function deleteUser() {
    try {
        const response = await axiosInstance.delete(APIURL + "/user/", {
            headers: { Authorization: getAuthorizationHeader() },
        });
    } catch (error) {}
}

export { postUser, login, getUser, updateUser, deleteUser };
