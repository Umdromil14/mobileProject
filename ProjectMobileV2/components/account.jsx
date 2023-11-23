import logo from "../images/logo.png";
import { InputWithLabel, ValidateButton } from "../tools/AllForForm";
import { useState } from "react";
import { Image, View, StyleSheet, Pressable, StatusBar, Dimensions, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";

function Account({ navigation }) {
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
            <View style={{ backgroundColor: '#443D3D', flex: 10 }}>
                <StatusBar
                    backgroundColor={'#443D3D'}
                    hidden={false}
                />
                <Image
                    style={globalStyles.tinyLogo}
                    source={logo}
                />
            </View>
            <View style={{ backgroundColor: '#2C2C2C', flex: 70, justifyContent: "space-between" }}>
                <View style={styles.container}>
                    <InputWithLabel
                        label="Username"
                        labelStyle={[globalStyles.textForm, { color: "#59A52C", marginTop: 15 }]}
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <InputWithLabel
                        label="First Name"
                        labelStyle={[globalStyles.textForm, { color: "#59A52C" }]}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <InputWithLabel
                        label="Last Name"
                        labelStyle={[globalStyles.textForm, { color: "#59A52C" }]}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />
                    <InputWithLabel
                        label="Email"
                        labelStyle={[globalStyles.textForm, { color: "#59A52C" }]}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <ValidateButton
                        title="Modify"
                        containerStyle={[styles.buttonContainer, { color: "#59A52C" }]}
                    />
                    <Pressable style={{
                        marginBottom: 20,
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        width: 125,
                        alignSelf: "center"
                    }} onPress={() => { navigation.navigate('Settings') }}>
                        <FontAwesomeIcon icon={faGear} size={30} style={{ color: "#59A52C" }} />
                        <Text style={{ color: "#59A52C", fontSize: 20 }}>Settings</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 100,
        alignSelf: "center"
    },
    buttonContainer: {
        width: 200,
        alignSelf: "center",
        marginBottom: 50,
        marginTop: 15
    }
});

export default Account;