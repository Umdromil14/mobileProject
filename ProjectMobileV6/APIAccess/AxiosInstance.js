import AsyncStorage from "@react-native-async-storage/async-storage";

const APIURL = "http://192.168.137.174:3001";

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

export { APIURL, getAuthorizationHeader, getToken };