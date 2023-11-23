import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APIURL = "http://192.168.1.42:3001";

async function getToken() {
    try {
        const token = await AsyncStorage.getItem("token");
        return token;
    } catch (error) {
        console.error('message:'+error.message);
        //! voir quoi faire haha
    }    
}

async function getAuthorizationHeader() {
    const token = `Bearer ${await getToken()}`;
    return token;
}

const axiosInstance = axios.create({
    APIURL,
    headers: { Authorization: getAuthorizationHeader() }
});

export { APIURL, getAuthorizationHeader, axiosInstance, getToken };