import logo from "../images/logo.png";
import {InputWithLabel,ValidateButton} from "../tools/AllForForm";
import { useRef, useState,useEffect } from "react";
import {Image,View,StyleSheet, Pressable, StatusBar, Dimensions, Text} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock,faUser,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";

function Account({ navigation }){
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <View
            style={{
                flexDirection: 'column',
                height: Dimensions.get('window').height
            }}
        >
            <View style={{backgroundColor: '#443D3D', flex: 10}}>
                <StatusBar
                    backgroundColor={'#443D3D'}
                    hidden={false}
                />
                <Image
                    style={styles.tinyLogo}
                    source={logo}
                />
            </View>
            <View style={{backgroundColor: '#2C2C2C', flex: 70}}>
                <View style={styles.container}>
                    <InputWithLabel
                        label= "Username"
                        labelStyle={styles.labelStyle}
                        placeholder= "Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <InputWithLabel
                        label="First Name"
                        labelStyle={styles.labelStyle}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <InputWithLabel
                        label="Last Name"
                        labelStyle={styles.labelStyle}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />
                    <InputWithLabel
                        label="Email"
                        labelStyle={styles.labelStyle}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Pressable>
                        <FontAwesomeIcon icon={faLock} size={24} />
                        <Text>Settings</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 125,
        height: 125,
        alignSelf: "center"
    },
    container: {
        width: Dimensions.get("window").width - 100,
        alignSelf: "center"
    },
    labelStyle: {
        paddingTop: 12,
        paddingLeft: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: "#59A52C"
    }
});
export default Account;