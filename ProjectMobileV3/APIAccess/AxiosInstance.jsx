import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APIURL = "http://192.168.137.239:3001";

async function getToken() {
    try {
        console.log("getToken");
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        return token;
    } catch (error) {
        console.log(error.message);
        //! voir quoi faire haha
    }    
}

async function getAuthorizationHeader() {
    //console.log("string");
    return `Bearer ${await getToken()}`;
}

const axiosInstance = axios.create({
    APIURL,
    headers: { Authorization: getAuthorizationHeader() }
});

export { APIURL, getAuthorizationHeader, axiosInstance };