import AsyncStorage from "@react-native-async-storage/async-storage";

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

export { getAuthorizationHeader, getToken };
