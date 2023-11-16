import logo from "../images/logo.png";
import {InputWithLabel,ValidateButton} from "../tools/AllForForm";
import { useRef, useState,useEffect } from "react";
import {Image,View,StyleSheet, Pressable, StatusBar, Dimensions, Text} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";
import { Screens } from "../tools/BottomNav";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Games from "./games";

const Tab = createBottomTabNavigator();

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
            <Games/>
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
            <View style={{backgroundColor: '#2C2C2C', flex: 70, justifyContent:"space-between"}}>
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
                    <ValidateButton
                        title = "Modify"
                        containerStyle={styles.buttonContainer}
                    />
                    <Pressable style={{
                        marginBottom: 20, 
                        flexDirection: 'row', 
                        justifyContent: "space-between", 
                        width: 125, 
                        alignSelf: "center"
                    }}>
                        <FontAwesomeIcon icon={faGear} size={30} style={{color: "#59A52C"}}/>
                        <Text style={{color: "#59A52C", fontSize: 20}}>Settings</Text>
                    </Pressable>
                </View>
            </View>
            <Tab.Navigator tabBar={<Screens/>}/>
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
    },
    buttonContainer: {
        width: 200,
        alignSelf: "center",
        marginBottom: 50,
        marginTop: 15
    }
});

export default Account;