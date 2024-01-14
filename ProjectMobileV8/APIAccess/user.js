import axios from "axios";
import { getAuthorizationHeader } from "./AxiosInstance";
import { API_URL } from "../tools/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function postUser(user) {
    await axios.post(API_URL + "/user", {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        password: user.password,
    });
}

async function connection (user){
    const response = await axios.post(API_URL + "/user/login",user);
    await AsyncStorage.setItem("token", response.data.token);
    axios.defaults.headers.common["Authorization"] = response.data.token;
}

async function getUser() {
    try {
        const Authorization = await getAuthorizationHeader();
        const response = await axios.get(API_URL + "/user/me", {
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
        const response = await axios.patch(
            API_URL + "/user/",
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
        const response = await axios.delete(API_URL + "/user/", {
            headers: { Authorization: getAuthorizationHeader() },
        });
    } catch (error) {}
}

export { postUser, connection , getUser, updateUser, deleteUser };