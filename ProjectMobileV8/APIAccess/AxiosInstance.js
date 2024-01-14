import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "http://192.168.163.242:3001";
const API_BASE_URL = "http://192.168.129.8:3001"
const API_URL = `${API_BASE_URL}/v2`;
// const API_URL = "http://192.168.137.1:3001";

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
    return `Bearer ${await getToken()}`;
}

export { API_URL, API_BASE_URL, getAuthorizationHeader, getToken };