import axios from "axios";
import { getAuthorizationHeader } from "./AxiosInstance";
import { API_URL } from "../tools/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * Create a new user
 *
 * @param {object} user user object
 * @param {string} user.firstname first name of the user
 * @param {string} user.lastname last name of the user
 * @param {string} user.username username of the user
 * @param {string} user.email email of the user
 * @param {string} user.password password of the user
 * 
 * @throws {Error} if the request failed
 *
 * @returns {Promise<void>}
 */
async function postUser(user) {
    await axios.post(API_URL + "/user", {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        password: user.password,
    });
}

/**
 * Connect the user and save the token
 *
 * @param {object} user user object
 * @param {string} user.login login of the user
 * @param {string} user.password password of the user
 * 
 * @throws {Error} if the request failed
 *
 * @returns {Promise<void>}
 */
async function connection(user) {
    const response = (await axios.post(API_URL + "/user/login", user)).data.token;
    await AsyncStorage.setItem("token", response);
    axios.defaults.headers.common["Authorization"] = response;
}

/**
 * Get the user associated with the token
 * 
 * @throws {Error} if the request failed
 * @returns {Promise<object>} user object
 */ 
async function getUser() {
    const Authorization = await getAuthorizationHeader();
    return (
        await axios.get(API_URL + "/user/me", {
            headers: { Authorization: Authorization },
        })
    ).data;
}

/**
 * Update the user associated with the token
 * 
 * @param {object} updatedValues updated values of the user
 * @param {string=} updatedValues.firstname first name of the user
 * @param {string=} updatedValues.lastname last name of the user
 * @param {string=} updatedValues.username username of the user
 * @param {string=} updatedValues.email email of the user 
 * 
 * @throws {Error} if the request failed
 * 
 * @returns {Promise<void>}
 */
async function updateUser(updatedValues) {
    await axios.patch(API_URL + "/user/", updatedValues, {
        headers: { Authorization: await getAuthorizationHeader() },
    });
}

/**
 * Delete the user associated with the token
 * 
 * @throws {Error} if the request failed
 * 
 * @returns {Promise<void>}
 */
async function deleteUser() {
    await axios.delete(API_URL + "/user/", {
        headers: { Authorization: await getAuthorizationHeader() },
    });
}

export { postUser, connection, getUser, updateUser, deleteUser };
